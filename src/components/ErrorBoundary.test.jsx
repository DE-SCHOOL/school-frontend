import { render, screen } from '@testing-library/react';
import * as Sentry from '@sentry/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

vi.mock('@sentry/react', () => ({ captureException: vi.fn() }));

function Bomb() {
	throw new Error('boom');
}

describe('ErrorBoundary', () => {
	beforeEach(() => {
		// React logs the caught error to console.error itself; silence it so
		// this expected failure doesn't clutter the test output.
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders children normally when nothing throws', () => {
		render(
			<ErrorBoundary>
				<div>All good</div>
			</ErrorBoundary>
		);
		expect(screen.getByText('All good')).toBeInTheDocument();
	});

	it('renders a fallback message instead of crashing when a child throws', () => {
		render(
			<ErrorBoundary>
				<Bomb />
			</ErrorBoundary>
		);
		expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
	});

	it('reports the caught error to Sentry', () => {
		render(
			<ErrorBoundary>
				<Bomb />
			</ErrorBoundary>
		);
		expect(Sentry.captureException).toHaveBeenCalledWith(expect.any(Error));
	});
});
