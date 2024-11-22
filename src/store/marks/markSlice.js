import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';
// import getApiError from '../../utilities/getApiError';

const initialState = {
	markSheet: [],
	error: false,
	isLoading: false,
	errorMessage: null,
	allMarkSheet: [],
	studentCoursesMarks: [],
	studentsCoursesMarks: [],
	studentsCoursesMarksII: [],
};

export const createInitialMarkSheet = createAsyncThunk(
	'mark/createInitialMarkSheet',
	async ({ students, academicYear, id }, thunkAPI) => {
		console.log(students, academicYear);
		try {
			const res = await apiRequest('post', `/api/v1/mark/${id}`, {
				students,
				academicYear,
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

export const getMarkSheetsPerCoursePerStudents = createAsyncThunk(
	'mark/getMarkSheetsPerCoursePerStudents',
	async ({ students, academicYear, id }, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				`/api/v1/mark/course/${id}/students`,
				{ students, academicYear }
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
			const res = await apiRequest('get', `/api/v1/mark`);
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
	async ({ markType, id, marks, students, academicYear }, thunkAPI) => {
		try {
			const res = await apiRequest('patch', `/api/v1/mark/${id}/${markType}`, {
				students,
				marks,
				academicYear,
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
// getStudentMarkSheetAllCourses
export const getStudentMarkSheetAllCourses = createAsyncThunk(
	'mark/getStudentMarkSheetAllCourses',
	async (searchData, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				`/api/v1/mark/student/courses`,
				searchData
			);
			return res.data;
		} catch (err) {
			let error = err.response.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getAllStudentMarkSheetAllCourses = createAsyncThunk(
	'mark/getAllStudentMarkSheetAllCourses',
	async (searchData, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				`/api/v1/mark/all/student/courses`,
				searchData
			);
			return res.data;
		} catch (err) {
			let error = err.response.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getAllStudentMarkSheetAllCoursesII = createAsyncThunk(
	'mark/getAllStudentMarkSheetAllCoursesII',
	async (searchData, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				`/api/v1/mark/all/student/courses`,
				searchData
			);
			return res.data;
		} catch (err) {
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
			})
			.addCase(getAllStudentsMarkSheet.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getAllStudentsMarkSheet.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllStudentsMarkSheet.fulfilled, (state, action) => {
				state.allMarkSheet = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getStudentMarkSheetAllCourses.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStudentMarkSheetAllCourses.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getStudentMarkSheetAllCourses.fulfilled, (state, action) => {
				state.studentCoursesMarks = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getAllStudentMarkSheetAllCourses.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getAllStudentMarkSheetAllCourses.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllStudentMarkSheetAllCourses.fulfilled, (state, action) => {
				state.studentsCoursesMarks = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getAllStudentMarkSheetAllCoursesII.rejected, (state, action) => {
				// state.error = true;
				// state.isLoading = false;
				// state.errorMessage = action.payload?.error;
			})
			.addCase(getAllStudentMarkSheetAllCoursesII.pending, (state, action) => {
				// state.isLoading = true;
			})
			.addCase(
				getAllStudentMarkSheetAllCoursesII.fulfilled,
				(state, action) => {
					state.studentsCoursesMarksII = action.payload.data;
					state.isLoading = false;
					state.errorMessage = null;
				}
			);
	},
});

const { reducer } = markSlice;
export default reducer;
