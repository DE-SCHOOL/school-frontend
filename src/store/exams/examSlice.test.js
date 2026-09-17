import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import examReducer, { getStudentsExam, getStudentResit, getStudent, getStudentsPerSearch } from './examSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { exams: examReducer } });
}

describe('examSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getStudentsExam', () => {
		it('fetches students for an academic year, filtering out entries with no _id', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [{ _id: '1' }, {}, { _id: '2' }] } });

			await store.dispatch(getStudentsExam('y1'));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/student/academic-year/y1');
			expect(store.getState().exams.students).toEqual([{ _id: '1' }, { _id: '2' }]);
		});

		it('uses err.message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue(new Error('offline'));
			await store.dispatch(getStudentsExam('y1'));
			expect(store.getState().exams.errorMessage).toBe('offline');
		});
	});

	describe('getStudentResit', () => {
		it('flattens each result into a plain row and sorts alphabetically by course name', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({
				data: {
					data: [
						{
							student: [{ matricule: 'M-002', name: 'Bob', level: 200 }],
							course: [{ name: 'Zoology', code: 'ZOO101' }],
							total: 32,
						},
						{
							student: [{ matricule: 'M-001', name: 'Alice', level: 100 }],
							course: [{ name: 'Anatomy', code: 'ANA101' }],
							total: 28,
						},
					],
				},
			});

			await store.dispatch(getStudentResit({ semester: 's1', academicYear: '2024/2025' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/course/resit/s1', { academicYear: '2024/2025' });
			expect(store.getState().exams.studentResit).toEqual([
				{ matricule: 'M-001', name: 'Alice', level: 100, course: 'Anatomy', course_code: 'ANA101', total: 28 },
				{ matricule: 'M-002', name: 'Bob', level: 200, course: 'Zoology', course_code: 'ZOO101', total: 32 },
			]);
		});

		it('tolerates a result with no student/course populated, rather than throwing', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [{ student: [], course: [], total: 0 }] } });

			await expect(store.dispatch(getStudentResit({ semester: 's1', academicYear: '2024/2025' }))).resolves.toBeDefined();
			expect(store.getState().exams.studentResit).toEqual([
				{ matricule: undefined, name: undefined, level: undefined, course: undefined, course_code: undefined, total: 0 },
			]);
		});
	});

	describe('getStudent', () => {
		it('fetches a single student by id+academicYearID', async () => {
			const store = makeStore();
			const student = { _id: '1', name: 'Alice' };
			apiRequest.mockResolvedValue({ data: { data: student } });

			await store.dispatch(getStudent({ id: '1', academicYearID: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/student/1/academic-year/y1');
			expect(store.getState().exams.student).toEqual(student);
		});
	});

	describe('getStudentsPerSearch', () => {
		it('posts search criteria scoped to an academic year', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [{ _id: '1' }] } });
			const searchData = { academicYearID: 'y1', name: 'Alice' };

			await store.dispatch(getStudentsPerSearch(searchData));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/student/search/y1', searchData);
			expect(store.getState().exams.students).toEqual([{ _id: '1' }]);
		});
	});
});
