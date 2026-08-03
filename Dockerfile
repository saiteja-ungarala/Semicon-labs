# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm install --no-audit --no-fund
COPY . .
# Optional: bake a direct API origin into the bundle instead of proxying via nginx.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---- Runtime stage (static nginx) ----
FROM nginx:1.27-alpine AS runtime
# The site config is rendered at container start (see the script) so the listen
# port and the API upstream come from env — required on Railway/Render/Fly,
# and it keeps nginx from crash-looping when the API host doesn't resolve.
COPY docker/40-render-conf.sh /docker-entrypoint.d/40-render-conf.sh
RUN chmod +x /docker-entrypoint.d/40-render-conf.sh && rm -f /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
ENV PORT=80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
