import { afterEach, describe, expect, it, vi } from 'vitest';
import * as Sentry from '@sentry/react';
import { initErrorTracking } from './errorTracking';

vi.mock('@sentry/react', () => ({ init: vi.fn() }));

describe('initErrorTracking', () => {
	afterEach(() => {
		vi.unstubAllEnvs();
		vi.clearAllMocks();
	});

	it('does not initialize Sentry when no DSN is configured', () => {
		vi.stubEnv('VITE_SENTRY_DSN', '');
		initErrorTracking();
		expect(Sentry.init).not.toHaveBeenCalled();
	});

	it('initializes Sentry with the configured DSN', () => {
		vi.stubEnv('VITE_SENTRY_DSN', 'https://example@sentry.io/1');
		initErrorTracking();
		expect(Sentry.init).toHaveBeenCalledWith(
			expect.objectContaining({ dsn: 'https://example@sentry.io/1' })
		);
	});
});
