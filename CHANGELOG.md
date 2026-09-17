# Changelog

Notable changes to this project, starting from when this file was
introduced. History before this point isn't retroactively backfilled —
`git log` is the record of record for that; see `my-todo.md` for the
broader build roadmap this work sits inside.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- Zod schema validation (`src/utilities/validation.js`) for the student
  and staff forms, run client-side before `addStudent`/`addStaff`
  dispatch — including a password/confirm-password check `TeacherForm`
  never actually had before.
- An `ErrorBoundary` around the app root (`src/index.jsx`), and optional
  Sentry error reporting gated behind `VITE_SENTRY_DSN`
  (`src/utilities/errorTracking.js`) — a no-op with no DSN configured.
- Redux slice test suites for all 22 slices under `src/store/`, plus
  component tests for the student/staff create and edit forms and
  several auth/public screens.
- `docker-compose.yml` and an updated `Dockerfile` bringing up the
  frontend-only stack (this app plus the mock API server) in containers.
- `.github/dependabot.yml` for weekly npm and GitHub Actions update
  checks.
- `CONTRIBUTING.md`, consolidating the workflow/test/style guidance that
  used to live only as a short inline README section.
- A coverage-threshold CI step (`npm run test:coverage`) and a step that
  runs `./setup-standalone.sh` end-to-end to prove it still works from a
  clean clone.

### Fixed

- A systemic bug across 13 Redux thunks: `createAsyncThunk(name, async
  (thunkAPI) => ...)` — a single-parameter payload creator — silently
  shadowed the real `thunkAPI` with the thunk's `arg` (usually
  `undefined`), so `rejectWithValue` calls never produced a real error
  payload on failure.
- `editQuestion` sent a DELETE request instead of a PATCH.
- A hardcoded Firebase API key committed in `src/firebase.config.js`,
  moved to `VITE_FIREBASE_*` env vars.
- `mock-server/server.js` never actually loaded `MOCK_API_PORT` from
  `.env` despite documenting it.
- `setup-standalone.sh` started the mock API server via `npm run
  mock-api &`, which captures npm's PID rather than the underlying node
  process's — the exit trap's `kill` never actually stopped the server.
- Assorted unsafe `err.response.data.message` property access
  (non-optional-chained) across several slices.

### Removed

- `src/utilities/DeleteEntity.js` — dead code, never imported, and
  called `useDispatch()` outside a component.
- ~200 `console.log` calls (most already commented out) and several
  large blocks of commented-out dead JSX in `GroupFormEdit.jsx` and
  `TeacherFormEdit.jsx`.

### Changed

- `src/assets/data/leftNavigationData.jsx` (previously 612 lines) split
  into `src/assets/data/navigation/{mainMenu,managementMenu,othersMenu}.jsx`.
- Duplicated `<option>` lists (gender, student level, marital status)
  across the student/staff create and edit form pairs consolidated into
  `src/components/form/fields/formOptions.jsx`.
