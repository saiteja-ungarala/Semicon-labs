# Semicon Labs — developer handover

For the team taking over **form submission**, **authentication** and
**payment integration**.

> **Please do not ask for a "build zip" to integrate against.** The build output
> (`web/dist`) is minified, bundled JavaScript with no source in it. You cannot
> add a form handler or a payment gateway to it. Everything below is source.

---

## 0. Architecture — read this first

**The site ships static. There is no backend behind it.** (Client direction,
August 2026.)

The entire catalog — 3 domains, 19 skills, 70 modules, 732 real-world scenarios,
with prices, durations and difficulty — is **hardcoded** in
`web/src/data/catalog-snapshot.json`. That file is a verbatim capture of every
curriculum and marketplace endpoint the UI used to call, so the pages render
exactly what they rendered when a server was wired up. No API, no database, no
hosting bill: `npm run build` produces a folder of files that any static host
serves.

**Every screen and button is still present and fully built**, including sign-up,
log-in, checkout, payments and the dashboard. They are simply not connected to
anything. That is deliberate — they are yours to wire to your own API.

| Area | Data source now | Needs your API? |
|---|---|---|
| Domains, skills, modules, scenarios | `catalog-snapshot.json` | No |
| Marketplace (`/modules`) | `catalog-snapshot.json` | Browsing no · buying yes |
| Sign-up, log-in, password reset, email verification | — | **Yes** |
| Checkout & payments | — | **Yes** |
| Dashboard, purchases, orders, profile | — | **Yes** |
| Contact / corporate / ₹99 pre-book forms | — | **Yes** |

Anything in the last four rows currently shows: *"This action needs an API,
which is not connected in this build."* — raised by `ApiNotConnectedError` in
`web/src/lib/api.ts` before any request is sent.

### Connecting your API

Set one environment variable and those screens come back to life:

```
VITE_API_URL=https://api.your-domain.com
```

Leave it empty (the default) and the site stays fully static. The endpoints the
app expects, and their exact request/response shapes, are the typed interfaces
in each `web/src/features/<area>/api.ts`.

### The old backend still exists

`saiteja-ungarala/Semicon-labs-backend` (Node + Express + Prisma + PostgreSQL)
is intact and implements all of the above — auth with refresh tokens, Easebuzz
checkout, orders, invoices. It is **not deployed** and nothing points at it, but
it is a working reference and may be faster to adopt than to rewrite. See §4–§6.

---

## 1. What you receive

| Part | Repository | Notes |
|---|---|---|
| Frontend | `saiteja-ungarala/Semicon-labs` | React 19 + Vite + TypeScript + Tailwind. **This is the whole product now.** |
| Backend *(optional/reference)* | `saiteja-ungarala/Semicon-labs-backend` | Node + Express + Prisma. Not deployed. Kept in case you adopt it. |
| Database *(optional)* | *(inside the backend repo)* | PostgreSQL. Schema in `prisma/schema.prisma`, migrations in `prisma/migrations`, catalog in `prisma/catalog.json`. |

Either clone the repositories (preferred — you get history and can raise PRs) or
use the source archives supplied alongside this file. The archives contain
tracked files only: **no `node_modules`, no `dist`, and no `.env`.**

---

## 2. Running it locally

### Frontend — this is all you need

```bash
cd web
npm install
npm run dev                   # http://localhost:5173
npm run build                 # produces web/dist — deploy this folder anywhere
```

No database, no API, no `.env` required. Deploying `dist` needs exactly one
host rule: **rewrite all unmatched paths to `/index.html`**, or every page
except the homepage returns 404. For Apache, a `.htaccess` in the web root:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Changing catalog content

The catalog is one JSON file, `web/src/data/catalog-snapshot.json`. Small edits
(a title, a price) can be made there directly. For a bulk content change, the
pipeline that produced it is:

1. Edit the source workbook (e.g. `PD_Labs_Structured.xlsx`)
2. `cd server && npx tsx scripts/import-catalog.ts` → rewrites `prisma/catalog.json`
3. Seed a database and run the API (§3), then re-snapshot:
   ```bash
   cd web
   API_BASE=http://localhost:4000/api/v1 node scripts/snapshot-api.mjs src/data/catalog-snapshot.json
   API_BASE=http://localhost:4000/api/v1 node scripts/snapshot-sorts.mjs src/data/catalog-snapshot.json
   ```

That last step needs the backend running **locally** — only as a build-time
tool, not in production.

### Backend (optional — only if you adopt it)

```bash
cd server
npm install
cp .env.example .env          # then fill in the values (see §5)
npx prisma migrate deploy     # creates the schema
npm run db:seed               # loads the catalog (3 domains, 19 skills, 70 modules, 732 scenarios)
npm run dev                   # http://localhost:4000
```

You need a PostgreSQL instance. Any will do — a local install, Docker, or a
hosted one. `docker-compose.yml` at the repo root starts one on port 5433.

To point the site at it, set `VITE_API_URL=/api` in `web/.env` — the dev server
proxies `/api` to `VITE_API_PROXY`. Note this makes the **auth, checkout and
dashboard** screens live again; the catalog keeps reading the static snapshot
either way.

Useful commands: `npm run build`, `npx tsc -b` (types), `npx eslint src` (lint).

---

## 3. The four forms — current state

**None of these reach a server.** They validate correctly and show proper
success states, but the submitted data only reaches the browser console and
`sessionStorage`. These are your integration points — every one has the
collected data already assembled, so wiring each is a single call.

| # | Form | File | What happens today | What it needs |
|---|---|---|---|---|
| 1 | **₹99 pre-book** (dialog) | `web/src/components/marketing/PreBookDialog.tsx` | Saves `{name, contact, email, source, emailVerifyRequested}` to `sessionStorage` under key **`sl-prebook`**, then shows a "Your seat is reserved — we'll be in touch" confirmation. **It no longer goes to checkout**, because there is no payment gateway. | Persist the lead, wire the **Verify email** button (§3.1), then start payment from `onSubmit`. |
| 2 | **Corporate enquiry** | `web/src/components/marketing/CorporateEnquiryForm.tsx` | `console.info('Corporate enquiry:', data)` — nothing is stored. | An endpoint to receive it (name, email, contact, organization, requirement, source). |
| 3 | **Contact** | `web/src/features/pages/ContactPage.tsx` | `console.info('Contact submission:', data)` — nothing is stored. | An endpoint to receive it. |
| 4 | **Register / log in** | `web/src/features/auth/` | Posts to `/auth/register` etc., which only exist if you set `VITE_API_URL`. Unset, they show "not connected". | Your auth API — see the caveat below. |

### 3.1 The "Verify email" button — and the flow that already exists

The pre-book dialog has a **Verify email** button beside the email field. Today
it only validates the address and switches to a "Sent" state; **no mail leaves
the server.** The handler is `onVerify` in `PreBookDialog.tsx` — put your call
there. Editing the address returns the button to its unsent state, so a changed
email can never sit behind a stale confirmation.

Before you build anything: **a complete email-verification flow already exists**
and you should reuse it rather than write a second one.

| Piece | Location |
|---|---|
| Token model | `VerificationToken` in `prisma/schema.prisma` (hashed, 24-hour expiry, single-use via `usedAt`) |
| Issue + send | `sendVerification()` in `server/src/services/auth.service.ts` |
| Email body | `verificationEmail()` in `server/src/utils/mailer.ts` |
| Consume token | `POST /api/v1/auth/verify-email` |
| Landing page | `web/src/features/auth/VerifyEmailPage.tsx` |

It already runs automatically on registration. Two things stop it working for
the pre-book dialog:

1. **No mail is actually sent anywhere yet.** `sendMail()` only creates a real
   SMTP transport when **both `SMTP_HOST` and `SMTP_USER`** are set. Without
   them it logs the message — including the verification link — to the server
   console and returns successfully. Nothing is failing loudly; it is simply
   not sending. Set the SMTP variables and this flow starts working, including
   password reset.
2. **`sendVerification()` takes a `User`,** but someone using the pre-book
   dialog has no account yet. You will need either an endpoint that accepts a
   bare email address, or to create the user record at pre-book time. There is
   also **no resend endpoint** — worth adding while you are here, since
   registration's verification mail currently cannot be re-triggered.

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

### Frontend (`web/.env`) — the only one that matters for the static build

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | **Empty by default.** Empty = fully static, server-backed screens show "not connected". Set to your API base to switch auth/checkout/dashboard back on. |
| `VITE_SITE_URL` | Public origin, used for canonical URLs, sitemap and Open Graph. |
| `VITE_API_PROXY` | Dev-server proxy target when `VITE_API_URL=/api`. Dev only. |

### Backend — only if you adopt the reference API

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

1. **No API is connected.** Auth, checkout, dashboard and all four forms show
   "not connected" until you set `VITE_API_URL`. This is by design, not a bug.
2. The four forms do not persist anything anywhere.
3. Payment is untested against a real Easebuzz account, and is not reachable
   from the static build at all.
4. **No outbound email is configured** in the reference backend.
   `SMTP_HOST`/`SMTP_USER` are unset, so account verification and
   password-reset mails are logged to the server console rather than sent.
5. Contact number and attribution from signup are not stored — the register
   endpoint accepts neither.
6. Analog Layout is flagged "coming soon"; its real curriculum (8 skills, 58
   modules) is extracted at `server/scripts/analog-layout-extract.txt` but not
   yet imported.
7. The published catalog counts on the marketing pages carry a deliberate
   uplift (+5 skills, +10 modules, +30 scenarios per domain) set in
   `web/src/data/curriculum.ts` as `COUNT_UPLIFT`. The snapshot holds the real
   numbers. Set the uplift to zeroes to show raw counts.
8. **Every module in the marketplace is priced ₹499 with zero ratings** — the
   seed never varied them, so all four sort options produce the same order.
   Real prices go in `catalog-snapshot.json` as `priceMinor`, in paise.
9. Two typos carried over from the source workbook and visible on the site:
   `PEX - starrc` (lowercase, while its own scenarios say "StarXtract") and
   `Dummy Fill BEOL- Calibre` (missing space before the dash).
10. Default admin credentials in the reference seed — change before any
    production use: `admin@semiconlabs.com` / `ChangeMe!2026`.

---

## 8. Suggested order of work

1. **Stand up an API and set `VITE_API_URL`.** Everything below depends on it.
   Adopting `Semicon-labs-backend` gets you auth, orders and Easebuzz already
   written — see §0.
2. Add a `leads` (or `enquiries`) table and one endpoint per form, then point
   the four forms at it. Quickest visible win, and the ₹99 flow starts
   capturing real buyers instead of dropping them.
3. Wire the pre-book **Verify email** button (§3.1) and add a resend endpoint.
4. Set the SMTP variables so verification and password reset actually deliver.
5. Extend register to accept and store contact number + attribution.
6. Get your gateway working end to end in test mode, then switch to production
   keys. Payment starts from `onSubmit` in `PreBookDialog.tsx`, where the
   buyer's details are already collected.
