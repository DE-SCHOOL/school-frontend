import { describe, expect, it } from 'vitest';
import { correctStudentLevelData } from './correctStudentLevelData';

describe('correctStudentLevelData', () => {
	it('returns undefined when studentData is undefined', () => {
		expect(correctStudentLevelData(undefined, [{ _id: '1' }])).toBeUndefined();
	});

	it('finds the matching student in allStudents by _id', () => {
		const allStudents = [
			{ _id: '1', name: 'Alice' },
			{ _id: '2', name: 'Bob' },
		];
		const result = correctStudentLevelData({ _id: '2' }, allStudents);
		expect(result).toEqual({ _id: '2', name: 'Bob' });
	});

	it('returns undefined when no student in allStudents matches', () => {
		const allStudents = [{ _id: '1', name: 'Alice' }];
		expect(correctStudentLevelData({ _id: '999' }, allStudents)).toBeUndefined();
	});

	it('returns undefined when allStudents is empty', () => {
		expect(correctStudentLevelData({ _id: '1' }, [])).toBeUndefined();
	});
});
