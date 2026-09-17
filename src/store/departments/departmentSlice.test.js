import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import departmentReducer, {
	getDepartments,
	getDepartment,
	createDepartment,
	editDepartment,
	deleteDepartment,
	removeDepartments,
} from './departmentSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { departments: departmentReducer } });
}

describe('departmentSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getDepartments', () => {
		it('fetches and stores the department list, clearing department', async () => {
			const store = makeStore();
			const envelope = { data: [{ _id: '1' }] };
			apiRequest.mockResolvedValue({ data: envelope });

			await store.dispatch(getDepartments());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/department');
			expect(store.getState().departments.departments).toEqual(envelope);
			expect(store.getState().departments.department).toEqual({});
		});

		it('uses err.message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue(new Error('offline'));
			await store.dispatch(getDepartments());
			expect(store.getState().departments.errorMessage).toBe('offline');
		});
	});

	describe('getDepartment', () => {
		it('fetches a single department by id', async () => {
			const store = makeStore();
			const department = { _id: '1', name: 'Sciences' };
			apiRequest.mockResolvedValue({ data: { data: department } });

			await store.dispatch(getDepartment({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/department/1');
			expect(store.getState().departments.department).toEqual(department);
		});
	});

	describe('createDepartment', () => {
		it('posts name/hod/program to the real endpoint', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });

			await store.dispatch(createDepartment({ name: 'Sciences', hod: 'staff1', program: 'prog1' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/department', {
				name: 'Sciences',
				hod: 'staff1',
				program: 'prog1',
			});
		});

		it('sets a server error message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'HOD already assigned' } } });
			await store.dispatch(createDepartment({ name: 'x', hod: 'x', program: 'x' }));
			expect(store.getState().departments.errorMessage).toBe('HOD already assigned');
		});
	});

	describe('editDepartment', () => {
		it('patches the department, clears the list, stores the updated record', async () => {
			const store = makeStore();
			const updated = { _id: '1', name: 'Updated' };
			apiRequest.mockResolvedValue({ data: { data: updated } });

			await store.dispatch(editDepartment({ name: 'Updated', hod: 'staff1', program: 'prog1', id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/department/1', {
				name: 'Updated',
				hod: 'staff1',
				program: 'prog1',
			});
			const state = store.getState().departments;
			expect(state.department).toEqual(updated);
			expect(state.departments).toEqual([]);
		});
	});

	describe('deleteDepartment', () => {
		it('deletes a department and stores the returned list', async () => {
			const store = makeStore();
			const remaining = [{ _id: '2' }];
			apiRequest.mockResolvedValue({ data: remaining });

			await store.dispatch(deleteDepartment({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/department/1');
			expect(store.getState().departments.departments).toEqual(remaining);
			expect(store.getState().departments.department).toEqual({});
		});
	});

	describe('removeDepartments reducer', () => {
		it('clears the department list synchronously', () => {
			const store = makeStore();
			store.dispatch(removeDepartments());
			expect(store.getState().departments.departments).toEqual([]);
		});
	});
});
