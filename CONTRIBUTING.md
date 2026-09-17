# Contributing

## Getting set up

See the README's [Quick start](README.md#quick-start) — pick
`./setup-standalone.sh` for anything frontend-only (a component, a page,
styling, routing), or `./setup.sh` (plus `school-backend`'s own
`./setup.sh`) if your change needs real data or real server-side
behavior.

## Workflow

- All work happens on feature branches off `master`; open a pull request
  rather than pushing directly.
- CI (`.github/workflows/ci.yml`) runs on every PR: lint, the test suite
  with coverage, a production build, `npm audit`, and a check that
  `./setup-standalone.sh` still works from a clean install. A PR with a
  failing check is not ready to merge.
- Commit messages should explain **why**, not just restate the diff.
- See the project root's `my-todo.md` (in `school-backend`'s sibling
  directory, or ask a maintainer) for the full build roadmap.

## Tests

- Tests live next to the code they cover, as `*.test.js` / `*.test.jsx`
  (Vitest + React Testing Library).
- `npm test` runs the suite once; `npm run test:coverage` also reports
  coverage. `vite.config.js` sets coverage thresholds as a regression
  floor, not an aspirational target — if your change legitimately drops
  coverage below the floor because you deleted more than you added,
  that's fine, adjust the threshold in the same PR and say why.
- Redux slices are tested against a real `configureStore` with
  `apiRequest` mocked at the module boundary (see any `*Slice.test.js`
  for the pattern), not against a hand-rolled fake store.
- A new form field that has a real, checkable constraint (a phone
  number's shape, a password's minimum length, two fields that must
  match) belongs in `src/utilities/validation.js`'s zod schemas, not
  only in the backend — see `StudentForm.jsx`/`TeacherForm.jsx` for how
  a schema is wired into a submit handler.

## Code style

- ESLint (`npm run lint`) fails the build only on real errors — broken
  hook usage, undefined references — not on style. The large
  pre-existing unused-variable *warning* count is expected (see
  `eslint.config.js`'s own comment on why) and not something a PR needs
  to fix incidentally.
- No emojis in code, comments, commit messages, or docs in this
  repository.
- Prefer extending an existing shared piece (e.g.
  `src/components/form/fields/formOptions.jsx` for a `<select>`'s
  `<option>` list reused across a create/edit form pair) over
  re-pasting markup that already exists elsewhere in the tree.
