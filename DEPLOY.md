# Deploying the web app

The container renders its nginx config at start-up from env vars, so the same
image runs locally (compose) and on Railway/Render/Fly without edits.

| Env var        | Required | What it does |
|----------------|----------|--------------|
| `PORT`         | no (auto) | Port nginx listens on. Railway injects this. Defaults to `80`. |
| `API_UPSTREAM` | no        | Backend origin for `/api` requests — `api:4000`, `semicon-api.railway.internal:4000`, or `https://your-api.up.railway.app`. If unset, `/api` returns a clear 502 and the rest of the site still works. |

## Railway

1. **Web service** → point it at this repo. Railway builds the Dockerfile.
2. Add variable `API_UPSTREAM` once the API is deployed (see below).
   Do **not** set `PORT` — Railway provides it.
3. Deploy. The site is live immediately; only `/api` calls need the backend.

### The API + database (needed for domains / modules / testcase data)

The public marketing pages render without the API, but the curriculum pages
read live data, so deploy these too:

1. **Postgres** — add Railway's Postgres plugin. Copy its `DATABASE_URL`.
2. **API service** — deploy the `server/` folder (separate service or repo).
   Set at minimum:
   - `DATABASE_URL` (from step 1)
   - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
   - `WEB_ORIGIN` = the web service's public URL (CORS)
   - `EASEBUZZ_KEY` / `EASEBUZZ_SALT` / `EASEBUZZ_ENV` when payments go live
     (leave blank for simulated dev-mode captures)
3. Run once against the deployed DB:
   ```bash
   npx prisma migrate deploy
   npm run db:seed          # loads the full catalog
   ```
4. Back on the **web** service, set `API_UPSTREAM` to the API's origin and redeploy.

## Why nginx used to crash

`proxy_pass http://api:4000` made nginx resolve the hostname `api` **at start-up**.
That name only exists on the compose network, so on Railway nginx aborted with
`host not found in upstream "api"` and the container crash-looped.

The generated config now uses a variable in `proxy_pass` (resolved per request,
via the platform's own DNS), so an API that is missing, renamed, or temporarily
down degrades `/api` to a 502 instead of taking the whole site offline.

## Local

```bash
docker compose up -d --build web    # http://localhost:8080
```
Compose sets `API_UPSTREAM=api:4000` for you.
