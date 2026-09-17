import * as Sentry from '@sentry/react';

// A no-op until VITE_SENTRY_DSN is set (see .env.example) - keeps local/CI
// runs, which never have a real DSN, from trying to talk to Sentry at all.
export function initErrorTracking() {
	const dsn = import.meta.env.VITE_SENTRY_DSN;
	if (!dsn) return;
	Sentry.init({ dsn, tracesSampleRate: 0 });
}
