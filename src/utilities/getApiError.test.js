import { describe, expect, it } from 'vitest';
import getApiError from './getApiError';

describe('getApiError', () => {
	it('extracts the message from a real axios-shaped error response', () => {
		const err = { response: { data: { message: 'Invalid credentials' } } };
		expect(getApiError(err)).toBe('Invalid credentials');
	});

	it('returns undefined when there is no response on the error', () => {
		expect(getApiError(new Error('network failure'))).toBeUndefined();
	});

	it('returns undefined when err itself is undefined', () => {
		expect(getApiError(undefined)).toBeUndefined();
	});

	it('returns undefined when response.data has no message field', () => {
		expect(getApiError({ response: { data: {} } })).toBeUndefined();
	});
});
