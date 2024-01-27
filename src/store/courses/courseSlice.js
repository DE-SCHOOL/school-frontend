import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	courses: [],
	isLoading: false,
	error: false,
	errorMessage: null,
	course: [],
};

export const getCourses = createAsyncThunk(
	'course/getCourses',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/course`);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			// console.log(err);
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
			const res = await apiRequest('post', `/api/v1/course`, {
				name,
				specialty,
				code,
				semester,
				levels,
				status,
				credit_value,
			});

			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const editCourse = createAsyncThunk(
	'course/editCourse',
	async ({ values, id }, thunkAPI) => {
		try {
			const res = await apiRequest('patch', `/api/v1/course/${id}`, {
				...values,
			});

			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const myCourses = createAsyncThunk(
	'course/getMyCourses',
	async ({ teacherID }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/staff-course/${teacherID}`);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			// console.log(err);
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getCourse = createAsyncThunk(
	'course/getCourse',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/course/${id}`);
			// console.log(res.data, 'COURSE');
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			// console.log(err);
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getCoursesPerSpecialty = createAsyncThunk(
	'course/getCoursesPerSpecialty',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/course/specialty/${id}`);
			// console.log(res.data, 'COURSE');
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			// console.log(err);
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
			.addCase(editCourse.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(editCourse.fulfilled, (state, action) => {
				state.course = action.payload.data;
				state.courses = [];
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(editCourse.rejected, (state, action) => {
				state.errorMessage = action.payload?.error;
				state.error = true;
				state.isLoading = false;
			})
			.addCase(getCourses.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getCourses.fulfilled, (state, action) => {
				state.courses = action.payload;
				state.course = {};
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getCourses.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(myCourses.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(myCourses.fulfilled, (state, action) => {
				state.course = action.payload;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(myCourses.rejected, (state, action) => {
				state.errorMessage = action.payload?.error;
				state.error = true;
				state.isLoading = false;
			})
			.addCase(getCourse.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getCourse.fulfilled, (state, action) => {
				state.course = action.payload.data;
				state.courses = {};
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getCourse.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getCoursesPerSpecialty.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getCoursesPerSpecialty.fulfilled, (state, action) => {
				state.course = {};
				state.courses = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getCoursesPerSpecialty.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			});
	},
});

const { reducer } = courseSlice;
export default reducer;
