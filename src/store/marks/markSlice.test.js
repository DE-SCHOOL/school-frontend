import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import markReducer, {
	createInitialMarkSheet,
	getMarkSheetsPerCoursePerStudents,
	getAllStudentsMarkSheet,
	updateStudentsMark,
	getStudentMarkSheetAllCourses,
	getStudentMarkSheetAllCoursesII,
	getAllStudentMarkSheetAllCourses,
	getAllStudentMarkSheetAllCoursesII,
} from './markSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { marks: markReducer } });
}

describe('markSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('createInitialMarkSheet', () => {
		it('posts students+academicYear to the course-scoped endpoint', async () => {
			const store = makeStore();
			const markSheet = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: markSheet } });

			await store.dispatch(createInitialMarkSheet({ students: ['s1'], academicYear: 'y1', id: 'c1' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/mark/c1', { students: ['s1'], academicYear: 'y1' });
			expect(store.getState().marks.markSheet).toEqual(markSheet);
		});

		it('sets error state on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Mark sheet already exists' } } });
			await store.dispatch(createInitialMarkSheet({ students: [], academicYear: 'y1', id: 'c1' }));
			expect(store.getState().marks.errorMessage).toBe('Mark sheet already exists');
		});
	});

	describe('getMarkSheetsPerCoursePerStudents', () => {
		it('fetches marks for a course and a set of students', async () => {
			const store = makeStore();
			const markSheet = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: markSheet } });

			await store.dispatch(getMarkSheetsPerCoursePerStudents({ students: ['s1'], academicYear: 'y1', id: 'c1' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/mark/course/c1/students', {
				students: ['s1'],
				academicYear: 'y1',
			});
			expect(store.getState().marks.markSheet).toEqual(markSheet);
		});
	});

	describe('getAllStudentsMarkSheet', () => {
		it('fetches the full mark sheet', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [{ _id: '1' }] } });
			await store.dispatch(getAllStudentsMarkSheet());
			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/mark');
			expect(store.getState().marks.allMarkSheet).toEqual([{ _id: '1' }]);
		});
	});

	describe('updateStudentsMark', () => {
		it('patches marks by course id and mark type (s1CA, s1Exam, etc.)', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [] } });

			await store.dispatch(
				updateStudentsMark({ markType: 's1CA', id: 'c1', marks: [15], students: ['s1'], academicYear: 'y1' })
			);

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/mark/c1/s1CA', {
				students: ['s1'],
				marks: [15],
				academicYear: 'y1',
			});
		});
	});

	describe('getStudentMarkSheetAllCourses / II', () => {
		it('stores semester 1 results under studentCoursesMarks', async () => {
			const store = makeStore();
			const marks = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: marks } });

			await store.dispatch(getStudentMarkSheetAllCourses({ studID: ['s1'], courses: ['c1'], academicYear: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/mark/student/courses', {
				studID: ['s1'],
				courses: ['c1'],
				academicYear: 'y1',
			});
			expect(store.getState().marks.studentCoursesMarks).toEqual(marks);
		});

		it('stores semester 2 results under the separate studentCoursesMarksII slot', async () => {
			const store = makeStore();
			const marks = [{ _id: '2' }];
			apiRequest.mockResolvedValue({ data: { data: marks } });

			await store.dispatch(getStudentMarkSheetAllCoursesII({ studID: ['s1'], courses: ['c2'], academicYear: 'y1' }));

			expect(store.getState().marks.studentCoursesMarksII).toEqual(marks);
			// Confirms the two thunks are independent state slots, not
			// overwriting each other despite hitting the same endpoint.
			expect(store.getState().marks.studentCoursesMarks).toEqual([]);
		});
	});

	describe('getAllStudentMarkSheetAllCourses / II', () => {
		it('fetches and stores under studentsCoursesMarks', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [{ _id: '1' }] } });
			await store.dispatch(getAllStudentMarkSheetAllCourses({ studID: ['s1'] }));
			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/mark/all/student/courses', { studID: ['s1'] });
			expect(store.getState().marks.studentsCoursesMarks).toEqual([{ _id: '1' }]);
		});

		it('II variant sets isLoading while pending and reports errors on failure', async () => {
			const store = makeStore();
			apiRequest.mockReturnValue(new Promise(() => {}));
			store.dispatch(getAllStudentMarkSheetAllCoursesII({ studID: ['s1'] }));
			expect(store.getState().marks.isLoading).toBe(true);
		});

		it('II variant reports a real error message on failure (not silently swallowed)', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'No results for this year' } } });

			await store.dispatch(getAllStudentMarkSheetAllCoursesII({ studID: ['s1'] }));

			const state = store.getState().marks;
			expect(state.error).toBe(true);
			expect(state.isLoading).toBe(false);
			expect(state.errorMessage).toBe('No results for this year');
		});
	});
});
