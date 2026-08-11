# Semicon Labs — developer handover

For the team taking over **form submission** and **payment integration**.

> **Please do not ask for a "build zip".** The build output (`web/dist`) is
> minified, bundled JavaScript with no source in it. You cannot add a form
> handler or a payment gateway to it. Everything below is source.

---

## 1. What you receive

| Part | Repository | Notes |
|---|---|---|
| Frontend | `saiteja-ungarala/Semicon-labs` | React 19 + Vite + TypeScript + Tailwind. Deployed on Vercel. |
| Backend | `saiteja-ungarala/Semicon-labs-backend` | Node + Express + Prisma. Deployed on Railway. |
| Database | *(inside the backend repo)* | PostgreSQL. Schema in `prisma/schema.prisma`, migrations in `prisma/migrations`, seed data in `prisma/catalog.json`. |

Either clone the repositories (preferred — you get history and can raise PRs) or
use the source archives supplied alongside this file. The archives contain
tracked files only: **no `node_modules`, no `dist`, and no `.env`.**

---

## 2. Running it locally

### Backend

```bash
cd server
npm install
cp .env.example .env          # then fill in the values (see §5)
npx prisma migrate deploy     # creates the schema
npm run db:seed               # loads the catalog (3 domains, 18 skills, 68 modules, 727 scenarios)
npm run dev                   # http://localhost:4000
```

You need a PostgreSQL instance. Any will do — a local install, Docker, or a
hosted one. `docker-compose.yml` at the repo root starts one on port 5433.

### Frontend

```bash
cd web
npm install
npm run dev                   # http://localhost:5173
```

In development the frontend calls the API directly. In production, Vercel
rewrites `/api/*` to Railway (see `web/vercel.json`) so the browser makes
same-origin requests and no CORS is involved. **Leave `VITE_API_URL` unset on
Vercel** — setting it bypasses the rewrite and reintroduces CORS.

Useful commands: `npm run build` (what Vercel runs), `npx tsc -b` (types),
`npx eslint src` (lint).

---

## 3. The four forms — current state

Three of these are **not yet wired to a backend**. They validate correctly and
show success states, but the submitted data is only written to the browser
console. These are your integration points.

| # | Form | File | What happens today | What it needs |
|---|---|---|---|---|
| 1 | **₹99 pre-book** (dialog) | `web/src/components/marketing/PreBookDialog.tsx` | Saves `{name, contact, email, source}` to `sessionStorage` under key **`sl-prebook`**, then navigates to `/checkout?plan=individual-launch`. | Persist the lead, then take over the payment step. |
| 2 | **Corporate enquiry** | `web/src/components/marketing/CorporateEnquiryForm.tsx` | `console.info('Corporate enquiry:', data)` — nothing is stored. | An endpoint to receive it (name, email, contact, organization, requirement, source). |
| 3 | **Contact** | `web/src/features/pages/ContactPage.tsx` | `console.info('Contact submission:', data)` — nothing is stored. | An endpoint to receive it. |
| 4 | **Register** | `web/src/features/auth/RegisterPage.tsx` | **Works** — posts to `POST /api/v1/auth/register`. | See the caveat below. |

### Register caveat — please read

The password field was removed from the signup form at the client's request,
but `POST /auth/register` still requires one, so the page currently generates a
random password and the member is expected to set their own later via the
forgot-password flow.

The form also collects a **contact number** and a multi-select **"how did you
get to know about us?"**. The register endpoint accepts neither, so those two
values are written to `sessionStorage` under **`sl-signup-meta`** and are *not*
persisted anywhere. To capture them properly, add the columns to the `User`
model and extend the register payload.

---

## 4. Payment — what already exists

The payment vertical is **scaffolded but not live**. Do not start from scratch;
read these first:

- `server/src/services/easebuzz.ts` — Easebuzz integration. Builds the
  initiate-link request and the forward hash, and verifies the reverse hash on
  the response. Test base `https://testpay.easebuzz.in`, production
  `https://pay.easebuzz.in`.
- `server/src/services/order.service.ts` — `createCheckout()` creates the order
  and returns the Easebuzz access key; `verifyAndFulfill()` checks the reverse
  hash, the status, and the amount, then in one transaction creates the
  Order + Payment + Purchase + Invoice records.
- `server/src/routes/checkout.routes.ts` — the checkout endpoints.
- `server/src/routes/webhook.routes.ts` — `POST /api/v1/webhooks/easebuzz`,
  idempotent.
- `web/src/features/checkout/CheckoutPage.tsx` and
  `web/src/features/checkout/easebuzz.ts` — the browser side.

**Important:** with `EASEBUZZ_KEY` / `EASEBUZZ_SALT` empty, the code runs in a
simulated DEV payment mode (captures without contacting the gateway). Supplying
real credentials switches it to the live flow. Nothing has been tested against
a real Easebuzz account — treat that as your first task.

The `PaymentGateway` enum in `prisma/schema.prisma` is `EASEBUZZ | RAZORPAY |
STRIPE` and defaults to `EASEBUZZ`.

---

## 5. Environment variables

Never commit `.env`. `server/.env.example` lists every key; the ones that matter:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string. |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | **Minimum 32 characters** — the app refuses to boot otherwise. |
| `WEB_ORIGIN` | Comma-separated CORS allowlist. **Required.** A request from an origin not on this list gets a 403. Include every local dev port you use. |
| `APP_URL` | Public site URL, used in emails and payment callbacks. |
| `EASEBUZZ_KEY`, `EASEBUZZ_SALT`, `EASEBUZZ_ENV` | Gateway credentials. Leave blank for DEV payment mode. |
| `SKIP_SEED` | Set to `1` to stop the deploy reseeding the database. |

On Railway the container start command is:

```
npx prisma migrate deploy && { [ "$SKIP_SEED" = "1" ] || node dist-seed/seed.js; } && node dist/server.js
```

so migrations and the seed run automatically on every deploy.

---

## 6. Database

- **Schema:** `server/prisma/schema.prisma`
- **Migrations:** `server/prisma/migrations/` — apply with `npx prisma migrate deploy`
- **Content:** `server/prisma/catalog.json`, generated from the client's
  spreadsheets by `server/scripts/import-catalog.ts`. The seeder
  (`prisma/seed.ts`) is **idempotent** — it upserts by `externalId`/`slug`, so
  re-running it updates rather than duplicating.

Hierarchy: **Domain → Skill → Module → Challenge** (a Challenge is what the UI
calls a "real world scenario").

To take a copy of live data instead of seeding: `pg_dump` from Railway.

---

## 7. Known gaps

1. The three forms above do not persist anything.
2. Payment is untested against a real Easebuzz account.
3. Contact number and attribution from signup are not stored.
4. Analog Layout is flagged "coming soon"; its real curriculum (8 skills, 58
   modules) is extracted at `server/scripts/analog-layout-extract.txt` but not
   yet imported.
5. The published catalog counts on the marketing pages carry a deliberate
   uplift (+5 skills, +10 modules, +30 scenarios per domain) set in
   `web/src/data/curriculum.ts` as `COUNT_UPLIFT`. The API serves the real
   numbers. Set the uplift to zeroes to show raw counts.
6. Default admin credentials from the seed — **change these in production**:
   `admin@semiconlabs.com` / `ChangeMe!2026`.

---

## 8. Suggested order of work

1. Add a `leads` (or `enquiries`) table and one endpoint per form; point the
   three forms at it. Quickest visible win.
2. Extend register to accept and store contact number + attribution.
3. Get Easebuzz working end to end in test mode, then switch to production keys.
4. Read `sl-prebook` from `sessionStorage` on the checkout page so the buyer is
   not asked for the same four details twice.
