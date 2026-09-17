#!/usr/bin/env node
// A standalone, fake API server for school-frontend contributors who
// only need to see and click through pages — no MongoDB, no real
// backend, no Firebase project, nothing but `npm install` and this
// file. Explicitly NOT a full reimplementation of school-backend: it
// returns realistic-shaped fictional data for the handful of endpoints
// that matter for browsing the app's screens, and a safe, empty-but-
// valid envelope for everything else it doesn't know about, so an
// unmocked screen degrades to an empty list instead of crashing.
//
// Real login/data/business-logic work still needs the real backend
// (school-backend's own setup.sh) — this is for "I only touched a
// component/page/style and want to see it," not for testing anything
// that actually depends on real data or server-side behavior.
//
// Adding a fixture for a screen this doesn't cover yet is a genuinely
// good first contribution — see fixtures.js and RESOURCE_FIXTURES below.

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as fixtures from './fixtures.js';

// Was reading process.env.MOCK_API_PORT with nothing ever loading .env
// into process.env for this plain Node script (Vite's own .env loading
// only covers import.meta.env in the browser bundle, a separate
// mechanism) - MOCK_API_PORT was documented in .env.example but had no
// actual effect. The 'dotenv/config' import above fixes that.
const PORT = process.env.MOCK_API_PORT || 8001;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const ok = (data, status = 200) => (req, res) => {
	res.status(status).json({
		status: 'success',
		results: Array.isArray(data) ? data.length : undefined,
		data,
	});
};

// --- Auth ---
// A fixed, fake token — nothing on this server actually verifies it;
// any value in that URL segment is accepted, matching how apiRequest.js
// always appends whatever token is in localStorage.
app.post('/api/v1/staff/login', (req, res) => {
	res.json({
		status: 'success',
		data: {
			...fixtures.STAFF[0],
			token: 'mock-token',
			// A real Firebase custom token would only verify against the
			// real project's own service account — this one won't, and
			// that's fine: authSlice.js's login thunk treats a Firebase
			// sign-in failure as non-fatal (see that file's own comment).
			customToken: 'mock-custom-token',
		},
	});
});
app.get(/^\/api\/v1\/staff\/logout/, ok({}));

app.post('/api/v1/platform/login', (req, res) => {
	res.json({
		status: 'success',
		data: { _id: 'mock-platform-staff', name: 'Demo Founder', email: 'admin@deschool.dev', role: 'super_admin', token: 'mock-platform-token' },
	});
});
app.post('/api/v1/platform/demo-requests', (req, res) => {
	res.status(201).json({ status: 'success', data: { ...req.body, _id: 'mock-demo-request', status: 'lead' } });
});
app.get(/^\/api\/v1\/platform\/demo-requests/, ok([]));
app.get(/^\/api\/v1\/platform\/schools/, ok([]));

// --- The two MainNav.jsx fetches every authenticated page depends on ---
app.get(/^\/api\/v1\/academic-year\/current/, ok(fixtures.CURRENT_YEAR));
app.get(/^\/api\/v1\/school/, ok(fixtures.SCHOOL));

// --- Generic per-resource fixtures ---
// Matches the FIRST path segment after /api/v1/ regardless of what
// follows (an id, a token, both) — apiRequest.js always appends the
// session token as a final path segment, so exact route arity varies
// per call site.
const RESOURCE_FIXTURES = {
	'academic-year': fixtures.ACADEMIC_YEARS,
	course: fixtures.COURSES,
	department: fixtures.DEPARTMENTS,
	program: fixtures.PROGRAMS,
	specialty: fixtures.SPECIALTIES,
	staff: fixtures.STAFF,
	student: fixtures.STUDENTS,
};

app.get(/^\/api\/v1\/([a-z-]+)/, (req, res) => {
	const resource = req.params[0];
	const fixture = RESOURCE_FIXTURES[resource];
	if (fixture) return ok(fixture)(req, res);
	// Unmocked resource: an empty, valid response so the screen renders
	// an empty state instead of throwing on a failed request.
	res.json({ status: 'success', results: 0, data: [] });
});

// Any POST/PATCH/DELETE this server doesn't have a specific handler
// for: echo the submitted body back as if it were created/updated, so
// forms don't error out even though nothing is actually persisted.
app.all(/^\/api\/v1\//, (req, res) => {
	res.status(200).json({ status: 'success', data: { ...req.body, _id: 'mock-id' } });
});

app.listen(PORT, () => {
	console.log(`[mock-api] fictional API server for school-frontend running on http://localhost:${PORT}`);
	console.log('[mock-api] no real backend, no MongoDB, no Firebase project needed');
});
