import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	leftNavResponsive: false,
	deleteOpt: {
		type: null,
		deleteID: null,
		deleteName: null,
		newClass: null,
	},
};

const uiStateSlice = createSlice({
	name: 'ui-state',
	initialState,
	reducers: {
		toggleLeftNav(state) {
			state.leftNavResponsive = !state.leftNavResponsive;
		},
		setDeleteEntity(state, action) {
			state.deleteOpt.type = action.payload.type;
			state.deleteOpt.deleteID = action.payload.deleteID;
			state.deleteOpt.deleteName = action.payload.deleteName;
			if (action.payload?.newClass !== undefined) {
				state.deleteOpt.newClass = action.payload.newClass;
			}
		},
		defaultDeleteEntity(state) {
			state.deleteOpt.type = null;
			state.deleteOpt.deleteID = null;
			state.deleteOpt.deleteName = null;
		},
	},
});

export const { toggleLeftNav, setDeleteEntity, defaultDeleteEntity } =
	uiStateSlice.actions;
const { reducer } = uiStateSlice;

export default reducer;
