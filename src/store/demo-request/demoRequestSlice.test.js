import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import demoRequestReducer, { submitDemoRequest, resetDemoRequestForm } from './demoRequestSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { demoRequest: demoRequestReducer } });
}

describe('demoRequestSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('submitDemoRequest', () => {
		it('posts without credentials to the one public platform endpoint', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { data: { _id: '1' } } });
			const payload = { name: 'Marie', schoolName: 'Bright Future', contactEmail: 'marie@school.cm' };

			await store.dispatch(submitDemoRequest(payload));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/platform/demo-requests', payload, false);
			expect(store.getState().demoRequest.isSubmitted).toBe(true);
		});

		it('clears any prior error state while pending', () => {
			const store = makeStore();
			apiRequest.mockReturnValue(new Promise(() => {}));
			store.dispatch(submitDemoRequest({}));
			const state = store.getState().demoRequest;
			expect(state.isLoading).toBe(true);
			expect(state.error).toBe(false);
			expect(state.errorMessage).toBeNull();
		});

		it('sets a real server error message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Contact email is required' } } });

			await store.dispatch(submitDemoRequest({}));

			const state = store.getState().demoRequest;
			expect(state.error).toBe(true);
			expect(state.errorMessage).toBe('Contact email is required');
			expect(state.isSubmitted).toBe(false);
		});
	});

	describe('resetDemoRequestForm', () => {
		it('resets isSubmitted/error/errorMessage back to their initial values', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Something failed' } } });
			await store.dispatch(submitDemoRequest({}));
			expect(store.getState().demoRequest.error).toBe(true);

			store.dispatch(resetDemoRequestForm());

			const state = store.getState().demoRequest;
			expect(state.isSubmitted).toBe(false);
			expect(state.error).toBe(false);
			expect(state.errorMessage).toBeNull();
		});
	});
});
