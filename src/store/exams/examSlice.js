import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	students: [],
	student: {},
	studentResit: [],
	isLoading: false,
	error: false,
	errorMessage: null,
};

export const getStudentsExam = createAsyncThunk(
	'exam/getStudents',
	async (academicYear, thunkAPI) => {
		try {
			const res = await apiRequest(
				'get',
				`/api/v1/student/academic-year/${academicYear}`
			);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const getStudentResit = createAsyncThunk(
	'exam/getStudentResit',
	async ({ semester, academicYear }, thunkAPI) => {
		try {
			const res = await apiRequest('post', `/api/v1/course/resit/${semester}`, {
				academicYear,
			});
			const resitData = res.data.data.map((data) => {
				let val = {
					matricule: data.student[0]?.matricule,
					name: data.student[0]?.name,
					level: data.student[0]?.level,
					course: data.course[0]?.name,
					course_code: data.course[0]?.code,
					total: data.total,
				};

				return val;
			});
			const sortedData = resitData.sort((a, b) => {
				if (a.course > b.course) return 1;
				return -1;
			});
			return sortedData;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const getStudent = createAsyncThunk(
	'exam/getStudent',
	async ({ id, academicYearID }, thunkAPI) => {
		try {
			const res = await apiRequest(
				'get',
				`/api/v1/student/${id}/academic-year/${academicYearID}`
			);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const getStudentsPerSearch = createAsyncThunk(
	'exam/searchStudents',
	async (searchData, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				`/api/v1/student/search`,
				searchData
			);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);
const examSlice = createSlice({
	name: 'exam',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getStudentsExam.fulfilled, (state, action) => {
				state.students = action.payload.data;
				state.student = {};
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getStudentsExam.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStudentsExam.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStudentsPerSearch.fulfilled, (state, action) => {
				// console.log(action.payload.data);
				state.students = action.payload.data;
				state.student = {};
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getStudentsPerSearch.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStudentsPerSearch.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStudent.fulfilled, (state, action) => {
				// state.students = {};
				state.student = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getStudent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStudent.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStudentResit.fulfilled, (state, action) => {
				state.studentResit = action.payload;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getStudentResit.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStudentResit.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			});
	},
});

const { reducer } = examSlice;
export default reducer;
