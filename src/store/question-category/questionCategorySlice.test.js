import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import categoryReducer, { getAllCategory } from './questionCategorySlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { questionCategory: categoryReducer } });
}

describe('questionCategorySlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	it('fetches and stores the category list, clearing category', async () => {
		const store = makeStore();
		const categories = [{ _id: '1', name: 'Teaching quality' }];
		apiRequest.mockResolvedValue({ data: { data: categories } });

		await store.dispatch(getAllCategory());

		expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/question-category', undefined);
		const state = store.getState().questionCategory;
		expect(state.categories).toEqual(categories);
		expect(state.category).toEqual({});
	});

	it('sets a real server error message on failure', async () => {
		const store = makeStore();
		apiRequest.mockRejectedValue({ response: { data: { message: 'Forbidden' } } });
		await store.dispatch(getAllCategory());
		expect(store.getState().questionCategory.errorMessage).toBe('Forbidden');
		expect(store.getState().questionCategory.error).toBe(true);
	});
});
