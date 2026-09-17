import { describe, expect, it } from 'vitest';
import { getDateFromDateObject } from './getDate';

// Dates are built with the local-time constructor (year, monthIndex, day)
// rather than an ISO string, since getDateFromDateObject reads the date
// back with local getters (getMonth/getDate/getFullYear) — using an ISO
// "Z" string here would make the test's expected value depend on the
// machine's timezone.
describe('getDateFromDateObject', () => {
	it('defaults to MM-DD-YYYY, zero-padding single-digit month/day', () => {
		expect(getDateFromDateObject(new Date(2024, 0, 5))).toBe('01-05-2024');
	});

	it('does not zero-pad a month/day that is already two digits', () => {
		expect(getDateFromDateObject(new Date(2024, 11, 25))).toBe('12-25-2024');
	});

	it('spec=0 explicitly gives the same MM-DD-YYYY format', () => {
		expect(getDateFromDateObject(new Date(2024, 5, 3), 0)).toBe('06-03-2024');
	});

	// A non-zero spec both offsets the day by that amount AND switches the
	// output to YYYY-MM-DD — real, existing dual behavior of this
	// function, pinned here as-is rather than assumed.
	it('a non-zero spec adds to the day and switches to YYYY-MM-DD', () => {
		expect(getDateFromDateObject(new Date(2024, 0, 5), 1)).toBe('2024-01-06');
	});

	it('the day+spec offset applies even when the base day is two digits', () => {
		expect(getDateFromDateObject(new Date(2024, 5, 15), 1)).toBe('2024-06-16');
	});
});
