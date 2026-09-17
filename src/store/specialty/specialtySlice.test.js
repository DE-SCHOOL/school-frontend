import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import specialtyReducer, {
	getSpecialties,
	getSpecialty,
	getSpecialtyCourses,
	createSpecialties,
	editSpecialty,
	deleteSpecialty,
	removeSpecialties,
} from './specialtySlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { specialty: specialtyReducer } });
}

describe('specialtySlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getSpecialties', () => {
		it('fetches and stores the specialty list, clearing specialty', async () => {
			const store = makeStore();
			const envelope = { data: [{ _id: '1' }] };
			apiRequest.mockResolvedValue({ data: envelope });

			await store.dispatch(getSpecialties());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/specialty');
			expect(store.getState().specialty.specialties).toEqual(envelope);
			expect(store.getState().specialty.specialty).toEqual({});
		});

		it('uses err.message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue(new Error('timeout'));
			await store.dispatch(getSpecialties());
			expect(store.getState().specialty.errorMessage).toBe('timeout');
		});
	});

	describe('getSpecialty', () => {
		it('fetches one specialty by id and clears the list', async () => {
			const store = makeStore();
			const specialty = { _id: '1', name: 'Science' };
			apiRequest.mockResolvedValue({ data: { data: specialty } });

			await store.dispatch(getSpecialty({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/specialty/1');
			expect(store.getState().specialty.specialty).toEqual(specialty);
			expect(store.getState().specialty.specialties).toEqual([]);
		});
	});

	describe('getSpecialtyCourses', () => {
		it('derives specialtyName from the first course\'s first specialty entry', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({
				data: { data: [{ specialty: [{ name: 'Software Engineering' }] }] },
			});

			await store.dispatch(getSpecialtyCourses({ id: 'spec1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/course/specialty/spec1');
			expect(store.getState().specialty.specialtyName).toBe('Software Engineering');
		});

		it('falls back to an empty string when there are no courses', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: [] } });

			await store.dispatch(getSpecialtyCourses({ id: 'spec1' }));

			expect(store.getState().specialty.specialtyName).toBe('');
		});
	});

	describe('createSpecialties', () => {
		it('posts name and department to the real endpoint', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });

			await store.dispatch(createSpecialties({ name: 'Arts', department: 'dept1' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/specialty', { name: 'Arts', department: 'dept1' });
		});

		it('sets a server-provided error message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Duplicate specialty' } } });
			await store.dispatch(createSpecialties({ name: 'Arts', department: 'dept1' }));
			expect(store.getState().specialty.errorMessage).toBe('Duplicate specialty');
		});
	});

	describe('editSpecialty', () => {
		it('patches the specialty and clears the list', async () => {
			const store = makeStore();
			const updated = { _id: '1', name: 'Updated' };
			apiRequest.mockResolvedValue({ data: { data: updated } });

			await store.dispatch(editSpecialty({ name: 'Updated', department: 'dept1', id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/specialty/1', { name: 'Updated', department: 'dept1' });
			expect(store.getState().specialty.specialty).toEqual(updated);
		});
	});

	describe('deleteSpecialty', () => {
		it('deletes a specialty and resets specialty to an empty array', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: [] });

			await store.dispatch(deleteSpecialty({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/specialty/1');
			expect(store.getState().specialty.specialty).toEqual([]);
		});
	});

	describe('removeSpecialties reducer', () => {
		it('clears the specialty list and isLoading synchronously', () => {
			const store = makeStore();
			store.dispatch(removeSpecialties());
			expect(store.getState().specialty.specialties).toEqual([]);
			expect(store.getState().specialty.isLoading).toBe(false);
		});
	});
});
