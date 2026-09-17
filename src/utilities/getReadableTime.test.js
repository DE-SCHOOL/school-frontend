import { describe, expect, it } from 'vitest';
import { getReadableTime } from './getReadableTime';

describe('getReadableTime', () => {
	it('zero-pads single-digit hours and minutes', () => {
		expect(getReadableTime(new Date(2024, 0, 1, 9, 5))).toBe('09:05');
	});

	it('does not zero-pad two-digit hours/minutes', () => {
		expect(getReadableTime(new Date(2024, 0, 1, 23, 45))).toBe('23:45');
	});

	it('handles midnight', () => {
		expect(getReadableTime(new Date(2024, 0, 1, 0, 0))).toBe('00:00');
	});
});
