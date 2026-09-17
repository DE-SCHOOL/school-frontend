import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';
import uiStateReducer, {
	toggleLeftNav,
	removeLeftNav,
	showLeftNav,
	setDeleteEntity,
	defaultDeleteEntity,
} from './ui-stateSlice';

function makeStore() {
	return configureStore({ reducer: { uiState: uiStateReducer } });
}

describe('uiStateSlice', () => {
	it('toggleLeftNav flips leftNavResponsive', () => {
		const store = makeStore();
		expect(store.getState().uiState.leftNavResponsive).toBe(false);
		store.dispatch(toggleLeftNav());
		expect(store.getState().uiState.leftNavResponsive).toBe(true);
		store.dispatch(toggleLeftNav());
		expect(store.getState().uiState.leftNavResponsive).toBe(false);
	});

	it('removeLeftNav always sets it true, showLeftNav always sets it false', () => {
		const store = makeStore();
		store.dispatch(removeLeftNav());
		expect(store.getState().uiState.leftNavResponsive).toBe(true);
		store.dispatch(showLeftNav());
		expect(store.getState().uiState.leftNavResponsive).toBe(false);
	});

	describe('setDeleteEntity', () => {
		it('sets type/deleteID/deleteName from the payload', () => {
			const store = makeStore();
			store.dispatch(setDeleteEntity({ type: 'student', deleteID: '1', deleteName: 'Alice' }));
			expect(store.getState().uiState.deleteOpt).toEqual({
				type: 'student',
				deleteID: '1',
				deleteName: 'Alice',
				newClass: null,
			});
		});

		it('also sets newClass when provided (promotion delete flow)', () => {
			const store = makeStore();
			store.dispatch(setDeleteEntity({ type: 'promotion', deleteID: '1', deleteName: 'Alice', newClass: 200 }));
			expect(store.getState().uiState.deleteOpt.newClass).toBe(200);
		});

		it('also sets fileUrl when provided (timetable/form-b delete flow)', () => {
			const store = makeStore();
			store.dispatch(setDeleteEntity({ type: 'timetable', deleteID: '1', deleteName: 'T1', fileUrl: 'a.pdf' }));
			expect(store.getState().uiState.deleteOpt.fileUrl).toBe('a.pdf');
		});

		it('does not touch newClass when not provided', () => {
			const store = makeStore();
			store.dispatch(setDeleteEntity({ type: 'student', deleteID: '1', deleteName: 'Alice', newClass: 200 }));
			store.dispatch(setDeleteEntity({ type: 'student', deleteID: '2', deleteName: 'Bob' }));
			expect(store.getState().uiState.deleteOpt.newClass).toBe(200);
		});
	});

	it('defaultDeleteEntity resets type/deleteID/deleteName to null', () => {
		const store = makeStore();
		store.dispatch(setDeleteEntity({ type: 'student', deleteID: '1', deleteName: 'Alice' }));
		store.dispatch(defaultDeleteEntity());
		const state = store.getState().uiState.deleteOpt;
		expect(state.type).toBeNull();
		expect(state.deleteID).toBeNull();
		expect(state.deleteName).toBeNull();
	});
});
