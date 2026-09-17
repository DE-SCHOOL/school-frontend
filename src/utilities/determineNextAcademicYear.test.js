import { describe, expect, it } from 'vitest';
import { determineNextAcademicYear } from './determineNextAcademicYear';

describe('determineNextAcademicYear', () => {
	const allAcademicYear = [
		{ _id: '1', schoolYear: '2023/2024' },
		{ _id: '2', schoolYear: '2024/2025' },
		{ _id: '3', schoolYear: '2025/2026' },
	];

	it('finds the academic year record for currentYear + 1/currentYear + 1', () => {
		expect(determineNextAcademicYear('2023/2024', allAcademicYear)).toEqual({
			_id: '2',
			schoolYear: '2024/2025',
		});
	});

	it('returns undefined when the next academic year does not exist in the list', () => {
		expect(determineNextAcademicYear('2025/2026', allAcademicYear)).toBeUndefined();
	});
});
