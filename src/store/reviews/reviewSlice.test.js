import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import reviewReducer, { createReviews } from './reviewSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { reviews: reviewReducer } });
}

describe('reviewSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	it('posts the bulk review payload to /api/v1/review/many and sets success', async () => {
		const store = makeStore();
		apiRequest.mockResolvedValue({ data: {} });
		const payload = { reviews: [{ question: 'q1', response: 5 }] };

		await store.dispatch(createReviews(payload));

		expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/review/many', payload);
		const state = store.getState().reviews;
		expect(state.success).toBe(true);
		expect(state.review).toEqual({});
		expect(state.isLoading).toBe(false);
	});

	it('sets isLoading while pending', () => {
		const store = makeStore();
		apiRequest.mockReturnValue(new Promise(() => {}));
		store.dispatch(createReviews({}));
		expect(store.getState().reviews.isLoading).toBe(true);
	});

	it('sets a real server error message on failure', async () => {
		const store = makeStore();
		apiRequest.mockRejectedValue({ response: { data: { message: 'Already reviewed' } } });
		await store.dispatch(createReviews({}));
		const state = store.getState().reviews;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe('Already reviewed');
		expect(state.success).toBe(false);
	});
});
