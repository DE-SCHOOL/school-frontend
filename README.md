# DE-SCHOOL — Frontend

![CI](https://github.com/DE-SCHOOL/school-frontend/actions/workflows/ci.yml/badge.svg)

The web app for DE-SCHOOL: a multi-tenant school management platform for
Cameroonian secondary and higher-education institutions, with tuition,
subscription, and canteen payments settled over the [Stellar
network](https://stellar.org).

This is the frontend only — the public marketing site, the staff/student
dashboard, and DE-SCHOOL's own internal platform console. The API it
talks to lives in
[`school-backend`](https://github.com/DE-SCHOOL/school-backend); start
that one first.

## Quick start

You need [Node.js 22.x](https://nodejs.org). You also need
`school-backend` running locally — see [its
README](https://github.com/DE-SCHOOL/school-backend#readme) for its own
one-command setup.

```bash
git clone https://github.com/DE-SCHOOL/school-frontend.git
cd school-frontend
./setup.sh
```

`setup.sh` installs dependencies, creates a `.env` pointing at
`http://localhost:8000`, and starts the dev server on
`http://localhost:3000`. Re-run it any time — it's safe to repeat.

Once both are running, sign in with the demo accounts
`school-backend`'s setup seeds for you:

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

- All work happens on feature branches off `master`; open a pull
  request rather than pushing directly.
- CI (`.github/workflows/ci.yml`) runs on every PR: lint, `npm test`,
  and a production build. A PR with a failing check is not ready to
  merge.
- Commit messages should explain **why**, not just restate the diff.
- See the project root's `my-todo.md` (in `school-backend`'s sibling
  directory, or ask a maintainer) for the full build roadmap.

## License

Not yet set — this repository does not currently have a `LICENSE`
file. If you're a prospective contributor and this matters to you
before investing time, please open an issue.
