import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import dashboardReducer, { getStaffCourse, assignCourse, editAssignedCourses, removeStaffs } from './dashboardSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { dashboard: dashboardReducer } });
}

describe('dashboardSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getStaffCourse', () => {
		it('fetches and stores the staff-course assignments', async () => {
			const store = makeStore();
			const envelope = { data: [{ _id: '1' }] };
			apiRequest.mockResolvedValue({ data: envelope });

			await store.dispatch(getStaffCourse());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/staff-course');
			expect(store.getState().dashboard.staffCourse).toEqual(envelope);
		});

		it('sets a real server error message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'No assignments' } } });
			await store.dispatch(getStaffCourse());
			expect(store.getState().dashboard.errorMessage).toBe('No assignments');
		});
	});

	describe('assignCourse', () => {
		it('posts courses+staff and clears staffCourse on success', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });

			await store.dispatch(assignCourse({ courses: ['c1'], staff: 's1' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/staff-course', { courses: ['c1'], staff: 's1' });
			expect(store.getState().dashboard.staffCourse).toEqual([]);
		});
	});

	describe('editAssignedCourses', () => {
		it('patches the assignment by staffID', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });

			await store.dispatch(editAssignedCourses({ courses: ['c1', 'c2'], staffID: 's1' }));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/staff-course/s1', { courses: ['c1', 'c2'] });
			expect(store.getState().dashboard.staffCourse).toEqual([]);
		});
	});

	describe('removeStaffs reducer', () => {
		it('clears staffCourse synchronously', () => {
			const store = makeStore();
			store.dispatch(removeStaffs());
			expect(store.getState().dashboard.staffCourse).toEqual([]);
		});
	});
});
