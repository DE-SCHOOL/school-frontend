import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import schoolReducer, { getMySchool } from './schoolSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { school: schoolReducer } });
}

describe('schoolSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	it('starts with school: null so callers can distinguish "not loaded yet" from "loaded"', () => {
		const store = makeStore();
		expect(store.getState().school.school).toBeNull();
	});

	it('fetches and stores the caller\'s own tenant School profile', async () => {
		const store = makeStore();
		const school = { _id: '1', name: 'Landmark Metropolitan University', slug: 'lmu' };
		apiRequest.mockResolvedValue({ data: { data: school } });

		await store.dispatch(getMySchool());

		expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/school');
		const state = store.getState().school;
		expect(state.school).toEqual(school);
		expect(state.error).toBe(false);
	});

	it('sets a real server error message on failure without touching the last-loaded school', async () => {
		const store = configureStore({
			reducer: { school: schoolReducer },
			preloadedState: {
				school: { school: { _id: '1', name: 'Cached School' }, isLoading: false, error: false, errorMessage: null },
			},
		});
		apiRequest.mockRejectedValue({ response: { data: { message: 'Session expired' } } });

		await store.dispatch(getMySchool());

		const state = store.getState().school;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe('Session expired');
		expect(state.school).toEqual({ _id: '1', name: 'Cached School' });
	});
});
