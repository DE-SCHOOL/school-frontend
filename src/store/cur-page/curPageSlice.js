import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	DATA_CONST: [],
};

const curPageSlice = createSlice({
	name: 'curPage',
	initialState,
	reducers: {
		setCurData: (state, action) => {
			state.DATA_CONST = action.payload;
		},
	},
});
const { reducer } = curPageSlice;
export const { setCurData } = curPageSlice.actions;
export default reducer;
