import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import academicYearReducer, {
	createStudentAcademicYearBulk,
	promoteStudentsBulk,
	getStudentPerAcademicYear,
	getStudentPerAcademicYearNextStudents,
	promoteStudents,
	createSchoolYear,
	getAcademicYears,
	updateAcademicYears,
	getCurrentYear,
	deletePromotedStudent,
} from './academicYearSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { years: academicYearReducer } });
}

describe('academicYearSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getAcademicYears', () => {
		it('fetches and stores the year list', async () => {
			const store = makeStore();
			const years = [{ _id: '1', schoolYear: '2024/2025' }];
			apiRequest.mockResolvedValue({ data: { data: years } });

			await store.dispatch(getAcademicYears());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/academic-year');
			expect(store.getState().years.academicYears).toEqual(years);
		});

		it('sets a real server error message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'No years found' } } });
			await store.dispatch(getAcademicYears());
			expect(store.getState().years.errorMessage).toBe('No years found');
		});
	});

	describe('getCurrentYear', () => {
		it('fetches and stores the current year as a single object', async () => {
			const store = makeStore();
			const year = { _id: '1', schoolYear: '2024/2025', isCurrent: true };
			apiRequest.mockResolvedValue({ data: { data: year } });

			await store.dispatch(getCurrentYear());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/academic-year/current');
			expect(store.getState().years.currentYear).toEqual(year);
		});
	});

	describe('createSchoolYear', () => {
		it('posts the new year payload and stores the returned list', async () => {
			const store = makeStore();
			const years = [{ _id: '1', schoolYear: '2025/2026' }];
			apiRequest.mockResolvedValue({ data: { data: years } });

			await store.dispatch(createSchoolYear({ schoolYear: '2025/2026' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/academic-year', { schoolYear: '2025/2026' });
			expect(store.getState().years.academicYears).toEqual(years);
		});
	});

	describe('updateAcademicYears', () => {
		it('patches the given year id', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });

			await store.dispatch(updateAcademicYears({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/academic-year/1');
		});
	});

	describe('createStudentAcademicYearBulk', () => {
		it('posts the bulk-insert payload', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });
			const payload = { students: ['s1', 's2'], academicYear: 'y1' };

			await store.dispatch(createStudentAcademicYearBulk(payload));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/student-academic-year/bulk-insert', payload);
		});
	});

	describe('getStudentPerAcademicYear', () => {
		it('fetches students for the given year and stores them', async () => {
			const store = makeStore();
			const students = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: students } });

			await store.dispatch(getStudentPerAcademicYear({ _id: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/student-academic-year/y1');
			expect(store.getState().years.students).toEqual(students);
		});
	});

	describe('getStudentPerAcademicYearNextStudents', () => {
		it('maps the returned students down to just their ids', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [{ _id: '1' }, { _id: '2' }] } });

			await store.dispatch(getStudentPerAcademicYearNextStudents({ _id: 'y1' }));

			expect(store.getState().years.nextYearStudents).toEqual(['1', '2']);
		});
	});

	describe('promoteStudents', () => {
		it('posts the promotion payload and clears nextYearStudents on success', async () => {
			const store = makeStore();
			const students = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: students } });

			await store.dispatch(promoteStudents({ _id: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/student-academic-year/y1/promote-student', { _id: 'y1' });
			const state = store.getState().years;
			expect(state.students).toEqual(students);
			expect(state.nextYearStudents).toEqual([]);
		});
	});

	describe('promoteStudentsBulk', () => {
		it('posts only the students array to the bulk-promote endpoint', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [] } });

			await store.dispatch(promoteStudentsBulk({ students: ['s1'], _id: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/student-academic-year/y1/bulk-promote', {
				students: ['s1'],
			});
		});
	});

	describe('deletePromotedStudent', () => {
		it('sends the delete with studentID/newClass/currentYearID as the body', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [] } });
			const data = { nextAcademicYearID: 'y2', studentID: 's1', newClass: 200, currentYearID: 'y1' };

			await store.dispatch(deletePromotedStudent(data));

			expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/student-academic-year/y2', {
				studentID: 's1',
				newClass: 200,
				currentYearID: 'y1',
			});
		});

		it('sets error state on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Cannot undo promotion' } } });
			await store.dispatch(deletePromotedStudent({ nextAcademicYearID: 'y2', studentID: 's1', newClass: 200, currentYearID: 'y1' }));
			expect(store.getState().years.errorMessage).toBe('Cannot undo promotion');
		});
	});
});
