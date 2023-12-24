import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';
// import getApiError from '../../utilities/getApiError';

const initialState = {
	markSheet: [],
	error: false,
	isLoading: false,
	errorMessage: null,
};

export const createInitialMarkSheet = createAsyncThunk(
	'mark/createInitialMarkSheet',
	async ({ students, id }, thunkAPI) => {
		try {
			const res = await apiRequest('post', `/api/v1/mark/${id}`, { students });
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			let error = err.response.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getMarkSheetsPerCoursePerStudents = createAsyncThunk(
	'mark/getMarkSheetsPerCoursePerStudents',
	async ({ students, id }, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				`/api/v1/mark/course/${id}/students`,
				{ students }
			);
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			let error = err.response.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);
export const getAllStudentsMarkSheet = createAsyncThunk(
	'mark/getAllStudentsMarkSheet',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/mark/`);
			return res.data;
		} catch (err) {
			let error = err.response.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const updateStudentsMark = createAsyncThunk(
	'mark/updateStudentsMark',
	async ({ markType, id, marks, students }, thunkAPI) => {
		try {
			const res = await apiRequest('patch', `/api/v1/mark/${id}/${markType}`, {
				students,
				marks,
			});
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			let error = err.response.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const markSlice = createSlice({
	name: 'mark',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createInitialMarkSheet.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(createInitialMarkSheet.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createInitialMarkSheet.fulfilled, (state, action) => {
				state.markSheet = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getMarkSheetsPerCoursePerStudents.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getMarkSheetsPerCoursePerStudents.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getMarkSheetsPerCoursePerStudents.fulfilled, (state, action) => {
				state.markSheet = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(updateStudentsMark.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(updateStudentsMark.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(updateStudentsMark.fulfilled, (state, action) => {
				state.markSheet = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			}).addCase(getAllStudentsMarkSheet.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getAllStudentsMarkSheet.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllStudentsMarkSheet.fulfilled, (state, action) => {
				state.markSheet = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
	},
});

const { reducer } = markSlice;
export default reducer;
