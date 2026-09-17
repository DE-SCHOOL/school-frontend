# DE-SCHOOL — Frontend

![CI](https://github.com/DE-SCHOOL/school-frontend/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

The web app for DE-SCHOOL: a multi-tenant school management platform for
Cameroonian secondary and higher-education institutions, with tuition,
subscription, and canteen payments settled over the [Stellar
network](https://stellar.org).

This is the frontend only — the public marketing site, the staff/student
dashboard, and DE-SCHOOL's own internal platform console. The real API
lives in [`school-backend`](https://github.com/DE-SCHOOL/school-backend),
but you only need it running if your work actually depends on real
data or server-side behavior — see below.

## Which setup do I need?

Pick based on what your task actually touches — most issues filed
against this repo only need the first row.

| Your task | What to do |
|---|---|
| **Frontend only** — a component, a page, styling, routing | `./setup-standalone.sh` (below) — no backend, no MongoDB, no Firebase project at all |
| **Backend only** — an API endpoint, a model, business logic | You don't need this repo — go straight to [`school-backend`](https://github.com/DE-SCHOOL/school-backend#which-setup-do-i-need) |
| **Full-stack** — a feature spanning both, or you need to see real data actually flow through a real API | `./setup.sh` here **and** `./setup.sh` in [`school-backend`](https://github.com/DE-SCHOOL/school-backend#which-setup-do-i-need) |

## Quick start

You need [Node.js 22.x](https://nodejs.org).

### Option A — frontend only, no backend needed

For a component, a page, styling, routing — anything where you just
need to see and click through the app. No MongoDB, no `school-backend`,
no Firebase project.

```bash
git clone https://github.com/DE-SCHOOL/school-frontend.git
cd school-frontend
./setup-standalone.sh
```

This installs dependencies, starts a small mock API server
(`mock-server/` — fictional, hardcoded data, no database of any kind)
on `http://localhost:8001`, points the app at it, and starts the dev
server on `http://localhost:3000`. Log in with **any** email and
password — the mock server accepts anything. Ctrl+C stops both
servers. Re-run any time.

This won't be right for work that depends on real data, real
multi-tenancy, real payments, or anything server-side actually
computing something — for that, use Option B. It's also intentionally
incomplete: it only has realistic fixture data for the screens most
commonly touched (login, academic year, school profile, staff,
students, courses); anything else falls back to an empty list rather
than crashing. Adding a fixture for a screen that needs one is a good
first contribution — see `mock-server/server.js`.

Prefer a container instead of a local Node install? `docker compose up
--build` does the same thing (`docker-compose.yml`) — the app on
`http://localhost:3000`, the mock API on `http://localhost:8001`.

### Option B — full stack, real data

For anything that needs real data, real multi-tenancy, real payment
flows, or backend behavior to actually be correct.

```bash
git clone https://github.com/DE-SCHOOL/school-frontend.git
cd school-frontend
./setup.sh
```

You also need [`school-backend`](https://github.com/DE-SCHOOL/school-backend)
running locally — see its own README for its one-command setup.
`setup.sh` installs dependencies, points the app at
`http://localhost:8000`, and starts the dev server. Sign in with the
demo accounts `school-backend`'s setup seeds for you:

| Role | Where to sign in | Email | Password |
|---|---|---|---|
| School staff (admin) | `/auth/signin` | `admin@demo-school.cm` | `DevAdmin#2026` |
| Platform console (super-admin) | `/platform/login` | `admin@deschool.dev` | `DevPlatform#2026` |

## The pages you'll land on

If you're new to this codebase, these are the entry points worth
knowing before you go looking for a specific feature:

- **`/` — the public landing page.** What a prospective school sees
  first: what the platform does, why Stellar payments matter to a
  school's fee collection, and a "Book a Demo" call to action. No login
  required. (`src/screens/public/Landing.jsx`)
- **`/book-demo` — the demo request form.** The one genuinely public,
  unauthenticated write endpoint on the whole API
  (`POST /api/v1/platform/demo-requests`). Submissions show up in the
  platform console below. (`src/screens/public/BookDemo.jsx`)
- **`/auth/signin` — school staff and student login.** The existing
  dashboard: grades, attendance, timetables, staff management, reports.
  A school's own staff and students never see the platform console —
  this is the only login they use. (`src/screens/authentication/SignIn.jsx`)
- **`/platform/login` and `/platform/dashboard` — DE-SCHOOL's own
  internal console**, not for school staff. This is where a demo
  request becomes a real school: converting a lead (or starting from
  scratch) creates the `School` record **and** its first administrator
  account in one atomic step — that account is what a school actually
  signs in with for the first time. Also where subscription status and
  school status (active/suspended) are managed.
  (`src/screens/platform/`)

The staff/student dashboard beyond `/auth/signin` is the larger, older
part of this codebase — students, staff, courses, marks, attendance,
timetables, departments, programs, reports — organized under
`src/screens/pages/` and `src/routes/pages/`, one folder per feature
area, each with its own Redux slice under `src/store/`.

### Setting up manually, instead of `./setup.sh`

```bash
npm install
cp .env.example .env   # points at http://localhost:8000 by default
npm run dev
```

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with hot reload. |
| `npm run build` | Production build. |
| `npm run lint` | ESLint — fails on real errors (broken hook usage, undefined references), not on style. |
| `npm test` | Vitest suite. |
| `npm run mock-api` | Standalone fake API server (`mock-server/`) — what `./setup-standalone.sh` runs for you automatically. |

## Architecture at a glance

- **Stack:** Vite, React 18, Redux Toolkit, `react-router-dom` v7,
  `rsuite` for the internal dashboard's UI components, SASS.
- **API calls:** `src/store/APIs/apiRequest.js` for school staff/student
  requests (reads the session token from `localStorage['loggedIn']`) and
  `src/store/APIs/platformApiRequest.js` for the platform console (its
  own separate `localStorage['platformLoggedIn']` key and API helper) —
  deliberately never shared, since a school-staff session and a
  platform-admin session must never be usable as each other.
- **Routing:** each feature area owns its own small router component
  (e.g. `src/routes/public/index.jsx`, `src/routes/platform/index.jsx`),
  all mounted together in `src/routes/index.jsx`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow, test
conventions, and code style this repo expects from a pull request.

## License

[MIT](LICENSE).
