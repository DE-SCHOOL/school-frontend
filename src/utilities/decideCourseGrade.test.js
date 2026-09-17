import { describe, expect, it } from 'vitest';
import { decideCourseGrade } from './decideCourseGrade';

describe('decideCourseGrade', () => {
	it.each([
		[100, 'A'],
		[80, 'A'],
		[79, 'B+'],
		[70, 'B+'],
		[69, 'B'],
		[60, 'B'],
		[59, 'C+'],
		[55, 'C+'],
		[54, 'C'],
		[50, 'C'],
		[49, 'D+'],
		[45, 'D+'],
		[44, 'D'],
		[40, 'D'],
		[39, 'F'],
		[0, 'F'],
	])('maps a mark of %i to grade %s', (mark, expected) => {
		expect(decideCourseGrade(mark)).toBe(expected);
	});
});
