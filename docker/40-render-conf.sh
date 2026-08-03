#!/bin/sh
# Renders nginx's site config at container start.
#
# Why this exists instead of a static conf file:
#  * Railway (and most PaaS) inject the listen port as $PORT.
#  * A static `proxy_pass http://api:4000` makes nginx resolve "api" at STARTUP
#    and abort with `host not found in upstream` when the API isn't on the same
#    network — which is exactly what crash-loops the container on Railway.
#    Using a variable in proxy_pass defers DNS to request time, so the site
#    stays up even while the API is down or not deployed yet.
#
# Env:
#   PORT          listen port                       (default 80)
#   API_UPSTREAM  backend origin for /api requests  (e.g. api:4000,
#                 https://semicon-api.up.railway.app). Unset → /api returns a
#                 clean 502 JSON instead of taking the whole site down.
set -eu

PORT="${PORT:-80}"
API_UPSTREAM="${API_UPSTREAM:-}"

# Use the platform's own DNS server so both Docker-internal names
# (api, *.railway.internal) and public names resolve.
RESOLVER="$(awk '/^nameserver/ { print $2; exit }' /etc/resolv.conf 2>/dev/null || true)"
[ -n "$RESOLVER" ] || RESOLVER="1.1.1.1"
# nginx needs IPv6 literals bracketed.
case "$RESOLVER" in *:*) RESOLVER="[$RESOLVER]" ;; esac

if [ -n "$API_UPSTREAM" ]; then
  case "$API_UPSTREAM" in
    http://*|https://*) API_ORIGIN="$API_UPSTREAM" ;;
    *)                  API_ORIGIN="http://$API_UPSTREAM" ;;
  esac
  API_BLOCK=$(cat <<BLOCK
  location /api/ {
    resolver ${RESOLVER} valid=30s ipv6=on;
    resolver_timeout 5s;
    # Variable upstream => resolved per request, not at startup.
    set \$api_origin "${API_ORIGIN}";
    proxy_pass \$api_origin\$request_uri;
    proxy_ssl_server_name on;
    proxy_http_version 1.1;
    proxy_set_header Host \$proxy_host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_connect_timeout 10s;
    proxy_read_timeout 60s;
  }
BLOCK
)
  echo "40-render-conf.sh: /api -> ${API_ORIGIN} (resolver ${RESOLVER})"
else
  API_BLOCK=$(cat <<'BLOCK'
  # No API_UPSTREAM configured — fail this route cleanly instead of 404ing
  # into the SPA shell (which would look like a broken page).
  location /api/ {
    default_type application/json;
    return 502 '{"error":{"code":"API_NOT_CONFIGURED","message":"Set the API_UPSTREAM env var to the backend origin."}}';
  }
BLOCK
)
  echo "40-render-conf.sh: no API_UPSTREAM set — /api will return 502"
fi

cat > /etc/nginx/conf.d/default.conf <<CONF
server {
  listen ${PORT};
  listen [::]:${PORT};
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  # Gzip
  gzip on;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;
  gzip_min_length 1024;

  # Long-cache fingerprinted assets
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files \$uri =404;
  }

${API_BLOCK}

  # SPA fallback
  location / {
    try_files \$uri \$uri/ /index.html;
  }
}
CONF

echo "40-render-conf.sh: listening on ${PORT}"
