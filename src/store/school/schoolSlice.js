import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

// The tenant's own School profile (name, contact info, letterhead
// fields) — fetched once per session and used to replace the single
// hardcoded schoolHeaderProp every printed document used to render,
// regardless of which school's staff generated it. See
// src/utilities/appData.js's mapSchoolToHeaderProp.
const initialState = {
	school: null,
	isLoading: false,
	error: false,
	errorMessage: null,
};

export const getMySchool = createAsyncThunk(
	'school/getMySchool',
	async (_, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/school`);
			return res.data.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const schoolSlice = createSlice({
	name: 'school',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMySchool.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMySchool.fulfilled, (state, action) => {
				state.school = action.payload;
				state.isLoading = false;
				state.error = false;
				state.errorMessage = null;
			})
			.addCase(getMySchool.rejected, (state, action) => {
				state.isLoading = false;
				state.error = true;
				state.errorMessage = action.payload?.error;
			});
	},
});

export default schoolSlice.reducer;
