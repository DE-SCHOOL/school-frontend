#!/usr/bin/env bash
#
# One-command local setup for school-frontend contributors.
#
# What this does, in order:
#   1. Checks Node.js is installed.
#   2. Installs npm dependencies.
#   3. Creates .env from .env.example on first run (points the frontend
#      at your local backend on http://localhost:8000).
#   4. Starts the Vite dev server in the foreground (Ctrl+C to stop).
#
# This app talks to school-backend over HTTP — it has nothing to seed or
# run on its own. Start school-backend's own ./setup.sh first (or
# alongside this, in another terminal); see that repo's README for
# login credentials once it has seeded its demo data.
#
# Safe to re-run at any time.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

log() { printf '\n\033[1;34m==>\033[0m %s\n' "$1"; }
fail() { printf '\n\033[1;31mError:\033[0m %s\n' "$1" >&2; exit 1; }

log "Checking prerequisites"

command -v node >/dev/null 2>&1 || fail "Node.js is not installed. Install Node.js 22.x from https://nodejs.org and re-run this script."
NODE_MAJOR="$(node -e 'console.log(process.versions.node.split(".")[0])')"
if [ "$NODE_MAJOR" -lt 22 ]; then
	echo "Warning: this project targets Node.js 22.x; you have $(node -v). It may still work, but 22.x is what's tested."
fi

log "Installing npm dependencies"
npm install

log "Setting up environment variables"
if [ -f .env ]; then
	echo ".env already exists — leaving it as-is. Delete it and re-run this script if you want a fresh one."
else
	cp .env.example .env
	echo "Created .env pointing at http://localhost:8000 — edit it if your backend runs somewhere else."
fi

log "Setup complete."
echo "Make sure school-backend is running (its own ./setup.sh) before you try logging in."
echo "Starting the dev server on http://localhost:3000 (Ctrl+C to stop)"
npm run dev
