import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	courses: [],
	isLoading: false,
	error: false,
	errorMessage: null,
};

export const getCourses = createAsyncThunk(
	'course/getCourses',
	async (thunkAPI) => {
		try {
			const res = await axios({
				method: 'get',
				url: 'http://localhost:8000/api/v1/course',
				withCredentials: true,
			});
			console.log(res.data);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			console.log(err);
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const createCourse = createAsyncThunk(
	'course/createCourse',
	async (
		{ name, specialty, code, semester, levels, status, credit_value },
		thunkAPI
	) => {
		try {
			const res = await axios({
				method: 'post',
				url: 'http://localhost:8000/api/v1/course',
				data: { name, specialty, code, semester, levels, status, credit_value },
				withCredentials: true,
			});
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createCourse.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createCourse.fulfilled, (state, action) => {
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(createCourse.rejected, (state, action) => {
				state.errorMessage = action.payload?.error;
				state.error = true;
				state.isLoading = false;
			})
			.addCase(getCourses.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getCourses.fulfilled, (state, action) => {
				state.courses = action.payload;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getCourses.rejected, (state, action) => {
				state.errorMessage = action.payload?.error;
				state.error = true;
				state.isLoading = false;
			});
	},
});

const { reducer } = courseSlice;
export default reducer;
