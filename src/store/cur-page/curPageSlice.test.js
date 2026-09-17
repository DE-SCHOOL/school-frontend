import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';
import curPageReducer, { setCurData } from './curPageSlice';

describe('curPageSlice', () => {
	it('setCurData replaces DATA_CONST with the payload', () => {
		const store = configureStore({ reducer: { curPage: curPageReducer } });
		expect(store.getState().curPage.DATA_CONST).toEqual([]);

		store.dispatch(setCurData([{ _id: '1' }, { _id: '2' }]));

		expect(store.getState().curPage.DATA_CONST).toEqual([{ _id: '1' }, { _id: '2' }]);
	});
});
