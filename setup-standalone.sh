#!/usr/bin/env bash
#
# Frontend-only local setup — no school-backend, no MongoDB, no Firebase
# project required. For contributors picking up a frontend-only issue
# (a component, a page, styling) who don't need real data or real
# server-side behavior, just to see and click through the app.
#
# What this does:
#   1. Checks Node is installed.
#   2. Installs npm dependencies.
#   3. Creates .env from .env.example (or updates it) to point at the
#      mock API server instead of a real backend.
#   4. Starts the mock API server (mock-server/) in the background —
#      fictional, hardcoded data, no database of any kind.
#   5. Starts the Vite dev server in the foreground (Ctrl+C stops both).
#
# For anything that needs real data, real business logic, or real
# multi-tenant/payment behavior, use ./setup.sh instead (which also
# needs school-backend's own ./setup.sh running).
#
# Safe to re-run at any time.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

MOCK_PORT=8001

log() { printf '\n\033[1;34m==>\033[0m %s\n' "$1"; }
fail() { printf '\n\033[1;31mError:\033[0m %s\n' "$1" >&2; exit 1; }

log "Checking prerequisites"
command -v node >/dev/null 2>&1 || fail "Node.js is not installed. Install Node.js 22.x from https://nodejs.org and re-run this script."

log "Installing npm dependencies"
npm install

log "Setting up environment variables (pointing at the mock API, not a real backend)"
if [ -f .env ]; then
	if sed --version >/dev/null 2>&1; then
		sed -i "s#^VITE_NODE_HOST_APP=.*#VITE_NODE_HOST_APP=http://localhost:${MOCK_PORT}#" .env
	else
		sed -i '' "s#^VITE_NODE_HOST_APP=.*#VITE_NODE_HOST_APP=http://localhost:${MOCK_PORT}#" .env
	fi
else
	echo "VITE_NODE_HOST_APP=http://localhost:${MOCK_PORT}" > .env
fi

log "Starting the mock API server on http://localhost:${MOCK_PORT} (fictional data, no database)"
npm run mock-api &
MOCK_PID=$!
trap 'kill "$MOCK_PID" 2>/dev/null || true' EXIT

# Give it a moment to bind before Vite starts making requests.
sleep 1

log "Setup complete. Log in with any email/password — the mock API accepts anything."
echo "Starting the dev server on http://localhost:3000 (Ctrl+C stops both servers)"
npm run dev
