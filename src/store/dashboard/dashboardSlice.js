import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	staffCourse: [],
	error: false,
	isLoading: false,
	errorMessage: null,
};

export const getStaffCourse = createAsyncThunk(
	'dashboard/getStaffCourse',
	async (thunkAPI) => {
		try {
			const res = await apiRequest(
				'get',
				`http://localhost:8000/api/v1/staff-course`
			);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			// console.log(err);
			let error = err.response.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const assignCourse = createAsyncThunk(
	'dashboard/assignCourse',
	async ({ courses, staff }, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				`http://localhost:8000/api/v1/staff-course`,
				{ courses, staff }
			);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			// console.log(err);
			// const msg = getApiError();
			let error = err?.response.data.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		removeStaffs: (state, action) => {
			state.staffCourse = [];
		},
		// removeStaffs() {

		// }
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStaffCourse.fulfilled, (state, action) => {
				state.staffCourse = action.payload;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getStaffCourse.pending, (state, action) => {
				// console.log(action.payload);
				state.isLoading = true;
			})
			.addCase(getStaffCourse.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(assignCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(assignCourse.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(assignCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.errorMessage = null;
			});
	},
});

// console.log()
//import.meta.env

const { reducer } = dashboardSlice;
export const { removeStaffs } = dashboardSlice.actions;

export default reducer;
