import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import programReducer, { getPrograms, getProgram, createPrograms, editPrograms, deleteProgram } from './programSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { programs: programReducer } });
}

describe('programSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getPrograms', () => {
		it('fetches and stores the program list, clearing program', async () => {
			const store = makeStore();
			const envelope = { data: [{ _id: '1' }] };
			apiRequest.mockResolvedValue({ data: envelope });

			await store.dispatch(getPrograms());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/program');
			expect(store.getState().programs.programs).toEqual(envelope);
			expect(store.getState().programs.program).toEqual({});
		});

		it('falls back to its own distinct message on failure with no server message', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue(new Error('boom'));
			await store.dispatch(getPrograms());
			// This slice's fallback string is spelled differently from every
			// other slice's ("went very Wrong" vs "went wrong") - a real,
			// pre-existing inconsistency, pinned as-is rather than "fixed"
			// silently mid test-writing.
			expect(store.getState().programs.errorMessage).toBe('Something went very Wrong');
		});
	});

	describe('getProgram', () => {
		it('fetches a single program and clears the list', async () => {
			const store = makeStore();
			const program = { _id: '1', name: 'Engineering' };
			apiRequest.mockResolvedValue({ data: { data: program } });

			await store.dispatch(getProgram({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/program/1');
			const state = store.getState().programs;
			expect(state.program).toEqual(program);
			expect(state.programs).toEqual([]);
		});
	});

	describe('createPrograms', () => {
		it('posts name/director/deputyDirector', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });

			await store.dispatch(createPrograms({ name: 'Engineering', director: 's1', deputyDirector: 's2' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/program', {
				name: 'Engineering',
				director: 's1',
				deputyDirector: 's2',
			});
		});
	});

	describe('editPrograms', () => {
		it('patches the program and stores the updated record without clearing the list', async () => {
			const store = makeStore();
			const updated = { _id: '1', name: 'Updated' };
			apiRequest.mockResolvedValue({ data: { data: updated } });

			await store.dispatch(editPrograms({ name: 'Updated', director: 's1', deputyDirector: 's2', id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/program/1', {
				name: 'Updated',
				director: 's1',
				deputyDirector: 's2',
			});
			expect(store.getState().programs.program).toEqual(updated);
		});
	});

	describe('deleteProgram', () => {
		it('deletes a program and stores the returned list', async () => {
			const store = makeStore();
			const remaining = [{ _id: '2' }];
			apiRequest.mockResolvedValue({ data: remaining });

			await store.dispatch(deleteProgram({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/program/1');
			expect(store.getState().programs.programs).toEqual(remaining);
		});

		it('falls back to "Something went wrong" (not "very Wrong") on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue(new Error('boom'));
			await store.dispatch(deleteProgram({ id: '1' }));
			expect(store.getState().programs.errorMessage).toBe('Something went wrong');
		});
	});
});
