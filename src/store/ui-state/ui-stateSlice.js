import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	leftNavResponsive: false,
};

const uiStateSlice = createSlice({
	name: 'ui-state',
	initialState,
	reducers: {
		toggleLeftNav(state, action) {
			state.leftNavResponsive = !state.leftNavResponsive;
		},
	},
});

export const { toggleLeftNav } = uiStateSlice.actions;
const { reducer } = uiStateSlice;

export default reducer;
