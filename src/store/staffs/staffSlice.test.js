import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import staffReducer, { getStaffs, addStaff, editStaff, getStaff, deleteStaff, removeStaffs } from './staffSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { staffs: staffReducer } });
}

describe('staffSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getStaffs', () => {
		it('stores the full response envelope under teachers (no .data unwrap)', async () => {
			const store = makeStore();
			const envelope = { status: 'success', data: [{ _id: '1' }] };
			apiRequest.mockResolvedValue({ data: envelope });

			await store.dispatch(getStaffs());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/staff');
			expect(store.getState().staffs.teachers).toEqual(envelope);
			expect(store.getState().staffs.teacher).toEqual({});
		});

		it('sets a real server error message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Forbidden' } } });

			await store.dispatch(getStaffs());

			expect(store.getState().staffs.errorMessage).toBe('Forbidden');
		});
	});

	describe('addStaff', () => {
		it('posts the full staff registration payload to /api/v1/staff/register', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: { _id: '1' } } });
			const payload = {
				gender: 'male',
				matricule: 'S-001',
				name: 'New Staff',
				department: 'dept1',
				address: 'Buea',
				dob: '1990-01-01',
				pob: 'Buea',
				email: 'staff@school.cm',
				tel: '677000000',
				password: 'password123',
				confirmPassword: 'password123',
				high_certificate: 'BSc',
				marital_status: 'not married',
				role: 'lecturer',
				picture: 'n/a',
			};

			await store.dispatch(addStaff(payload));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/staff/register', payload);
			expect(store.getState().staffs.isLoading).toBe(false);
			expect(store.getState().staffs.errorMessage).toBeNull();
		});

		it('sets error state on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Email already registered' } } });

			await store.dispatch(addStaff({}));

			expect(store.getState().staffs.errorMessage).toBe('Email already registered');
			expect(store.getState().staffs.error).toBe(true);
		});
	});

	describe('editStaff', () => {
		it('patches the staff member and clears the list, storing the updated record', async () => {
			const store = makeStore();
			const updated = { _id: '1', name: 'Updated Name' };
			apiRequest.mockResolvedValue({ data: { data: updated } });

			await store.dispatch(editStaff({ reqData: { name: 'Updated Name' }, id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/staff/1', { name: 'Updated Name' });
			const state = store.getState().staffs;
			expect(state.teacher).toEqual(updated);
			expect(state.teachers).toEqual([]);
		});
	});

	describe('getStaff', () => {
		it('fetches a single staff member by id', async () => {
			const store = makeStore();
			const staff = { _id: '1', name: 'A' };
			apiRequest.mockResolvedValue({ data: { data: staff } });

			await store.dispatch(getStaff({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/staff/1');
			expect(store.getState().staffs.teacher).toEqual(staff);
		});
	});

	describe('deleteStaff', () => {
		it('deletes a staff member and resets teacher to an empty object', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: { _id: '1' } } });

			await store.dispatch(deleteStaff({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/staff/1');
			expect(store.getState().staffs.teacher).toEqual({});
		});
	});

	describe('removeStaffs reducer', () => {
		it('clears the teachers list synchronously', () => {
			const store = makeStore();
			store.dispatch(removeStaffs());
			expect(store.getState().staffs.teachers).toEqual([]);
		});
	});
});
