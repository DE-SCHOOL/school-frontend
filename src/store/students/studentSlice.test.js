import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import studentReducer, {
	getStudents,
	getStudentsPerCourseOffering,
	editStudent,
	addStudent,
	getStaffStudents,
	getStudent,
	deleteStudent,
	getAllStudentsPerAcademicYear,
} from './studentSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { students: studentReducer } });
}

describe('studentSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getStudents', () => {
		it('fetches the real endpoint and stores the list, clearing student', async () => {
			const store = makeStore();
			const students = [{ _id: '1', name: 'A' }];
			apiRequest.mockResolvedValue({ data: { data: students } });

			await store.dispatch(getStudents());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/student');
			const state = store.getState().students;
			expect(state.students).toEqual(students);
			expect(state.student).toEqual({});
			expect(state.isLoading).toBe(false);
		});

		it('uses err.message as the error on failure (not the server response shape)', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue(new Error('Request failed with status code 500'));

			await store.dispatch(getStudents());

			const state = store.getState().students;
			expect(state.error).toBe(true);
			expect(state.errorMessage).toBe('Request failed with status code 500');
		});
	});

	describe('getStudentsPerCourseOffering', () => {
		it('fetches students for a course+academicYear', async () => {
			const store = makeStore();
			const students = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: students } });

			await store.dispatch(getStudentsPerCourseOffering({ courseID: 'c1', academicYear: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/student/academic-year/y1/course/c1');
			expect(store.getState().students.students).toEqual(students);
		});
	});

	describe('editStudent', () => {
		it('patches the student and clears the list, storing the updated student', async () => {
			const store = makeStore();
			const updated = { _id: '1', name: 'Updated' };
			apiRequest.mockResolvedValue({ data: { data: updated } });

			await store.dispatch(editStudent({ reqData: { name: 'Updated' }, id: '1', yearID: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/student/1/academic-year/y1', { name: 'Updated' });
			const state = store.getState().students;
			expect(state.student).toEqual(updated);
			expect(state.students).toEqual([]);
		});
	});

	describe('addStudent', () => {
		it('posts the full registration payload and sets success on completion', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: { _id: '1' } } });
			const payload = {
				name: 'New Student',
				matricule: 'M-001',
				specialty: 'spec1',
				address: 'Buea',
				gender: 'male',
				dob: '2010-01-01',
				pob: 'Buea',
				email: '',
				tel: '',
				parent_name: 'Parent',
				parent_email: '',
				parent_tel: '677000000',
				level: 100,
				entry_certificate: '',
				yearID: 'y1',
			};

			await store.dispatch(addStudent(payload));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/student/academic-year/y1', {
				name: 'New Student',
				matricule: 'M-001',
				specialty: 'spec1',
				address: 'Buea',
				gender: 'male',
				dob: '2010-01-01',
				pob: 'Buea',
				email: '',
				tel: '',
				parent_name: 'Parent',
				parent_email: '',
				parent_tel: '677000000',
				level: 100,
				entry_certificate: '',
			});
			expect(store.getState().students.success).toBe(true);
		});

		it('resets success to false while pending', () => {
			const store = makeStore();
			apiRequest.mockReturnValue(new Promise(() => {}));
			store.dispatch(addStudent({}));
			expect(store.getState().students.success).toBe(false);
			expect(store.getState().students.isLoading).toBe(true);
		});

		it('reads the error message via the real axios response shape', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Matricule already in use' } } });

			await store.dispatch(addStudent({}));

			expect(store.getState().students.errorMessage).toBe('Matricule already in use');
		});
	});

	describe('getStaffStudents', () => {
		it('fetches the students belonging to a staff member', async () => {
			const store = makeStore();
			const students = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: students } });

			await store.dispatch(getStaffStudents({ id: 'staff1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/student/staff1/students');
			expect(store.getState().students.students).toEqual(students);
		});
	});

	describe('getStudent', () => {
		it('fetches one student by id+academicYearID', async () => {
			const store = makeStore();
			const student = { _id: '1', name: 'A' };
			apiRequest.mockResolvedValue({ data: { data: student } });

			await store.dispatch(getStudent({ id: '1', academicYearID: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/student/1/academic-year/y1');
			expect(store.getState().students.student).toEqual(student);
		});
	});

	describe('deleteStudent', () => {
		it('deletes a student and filters out any record with no _id from the returned list', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({
				data: { data: [{ _id: '1' }, { _id: undefined }, { _id: '3' }] },
			});

			await store.dispatch(deleteStudent({ id: '2', academicYearID: 'y1' }));

			expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/student/2/academic-year/y1');
			expect(store.getState().students.students).toEqual([{ _id: '1' }, { _id: '3' }]);
		});
	});

	describe('getAllStudentsPerAcademicYear', () => {
		it('fetches all students for an academic year, filtering out entries with no _id', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [{ _id: '1' }, {}] } });

			await store.dispatch(getAllStudentsPerAcademicYear('y1'));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/student-academic-year/y1');
			expect(store.getState().students.students).toEqual([{ _id: '1' }]);
		});

		it('sets error state on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Academic year not found' } } });

			await store.dispatch(getAllStudentsPerAcademicYear('bad-id'));

			expect(store.getState().students.errorMessage).toBe('Academic year not found');
		});
	});
});
