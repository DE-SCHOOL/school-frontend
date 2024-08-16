import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	academicYears: [],
	students: [],
	nextYearStudents: [],
	student: {},
	isLoading: false,
	error: false,
	errorMessage: null,
	currentYear: null,
};

export const createStudentAcademicYearBulk = createAsyncThunk(
	'academicYear/insertStudentAcademicYearBulk',
	async (data, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				'/api/v1/student-academic-year/bulk-insert',
				data
			);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const promoteStudentsBulk = createAsyncThunk(
	'academicYear/promoteStudentsBulk',
	async (data, thunkAPI) => {
		try {
			const { students, _id } = data;
			const res = await apiRequest(
				'post',
				`/api/v1/student-academic-year/${_id}/bulk-promote`,
				{ students }
			);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getStudentPerAcademicYear = createAsyncThunk(
	'academicYear/getStudentPerAcademicYear',
	async (academicYear, thunkAPI) => {
		try {
			const res = await apiRequest(
				'get',
				`/api/v1/student-academic-year/${academicYear._id}`
			);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getStudentPerAcademicYearNextStudents = createAsyncThunk(
	'academicYear/getStudentPerAcademicYearNextStudents',
	async (academicYear, thunkAPI) => {
		try {
			const res = await apiRequest(
				'get',
				`/api/v1/student-academic-year/${academicYear._id}`
			);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);
export const promoteStudents = createAsyncThunk(
	'academicYear/promoteStudent',
	async (data, thunkAPI) => {
		try {
			const res = await apiRequest(
				'post',
				`/api/v1/student-academic-year/${data._id}/promote-student`,
				data
			);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const createSchoolYear = createAsyncThunk(
	'academicYear/create',
	async (data, thunkAPI) => {
		try {
			const res = await apiRequest('post', '/api/v1/academic-year', data);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getAcademicYears = createAsyncThunk(
	'academicYear/getAllYears',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', '/api/v1/academic-year');
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const updateAcademicYears = createAsyncThunk(
	'academicYear/updateYears',
	async (data, thunkAPI) => {
		try {
			const res = await apiRequest('patch', `/api/v1/academic-year/${data.id}`);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getCurrentYear = createAsyncThunk(
	'academicYear/getCurrent',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/academic-year/current`);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const AcademicYearSlice = createSlice({
	name: 'academicYear',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createSchoolYear.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createSchoolYear.fulfilled, (state, action) => {
				state.academicYears = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(createSchoolYear.rejected, (state, action) => {
				state.errorMessage = action.payload?.error;
				state.error = true;
				state.isLoading = false;
			})
			.addCase(getAcademicYears.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAcademicYears.fulfilled, (state, action) => {
				state.academicYears = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getAcademicYears.rejected, (state, action) => {
				state.error = true;
				state.errorMessage = action.payload?.error;
				state.isLoading = false;
			})
			.addCase(updateAcademicYears.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(updateAcademicYears.fulfilled, (state, action) => {
				// state.academicYears = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(updateAcademicYears.rejected, (state, action) => {
				state.error = true;
				state.errorMessage = action.payload?.error;
				state.isLoading = false;
			})
			.addCase(getCurrentYear.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getCurrentYear.fulfilled, (state, action) => {
				state.currentYear = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getCurrentYear.rejected, (state, action) => {
				state.error = true;
				state.errorMessage = action.payload?.error;
				state.isLoading = false;
			})
			.addCase(createStudentAcademicYearBulk.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createStudentAcademicYearBulk.fulfilled, (state, action) => {
				// state.currentYear = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(createStudentAcademicYearBulk.rejected, (state, action) => {
				state.error = true;
				state.errorMessage = action.payload?.error;
				state.isLoading = false;
			})
			.addCase(getStudentPerAcademicYear.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getStudentPerAcademicYear.fulfilled, (state, action) => {
				state.students = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(getStudentPerAcademicYear.rejected, (state, action) => {
				state.error = true;
				state.errorMessage = action.payload?.error;
				state.isLoading = false;
			})
			.addCase(
				getStudentPerAcademicYearNextStudents.pending,
				(state, action) => {
					state.isLoading = true;
				}
			)
			.addCase(
				getStudentPerAcademicYearNextStudents.fulfilled,
				(state, action) => {
					const studentIDs = action.payload.data.map((stud) => stud._id);
					state.nextYearStudents = studentIDs;
					state.errorMessage = null;
					state.isLoading = false;
				}
			)
			.addCase(
				getStudentPerAcademicYearNextStudents.rejected,
				(state, action) => {
					state.error = true;
					state.errorMessage = action.payload?.error;
					state.isLoading = false;
				}
			)
			.addCase(promoteStudents.fulfilled, (state, action) => {
				state.nextYearStudents = [];
				state.students = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(promoteStudents.rejected, (state, action) => {
				state.error = true;
				state.errorMessage = action.payload?.error;
				state.isLoading = false;
			})
			.addCase(promoteStudents.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(promoteStudentsBulk.fulfilled, (state, action) => {
				state.nextYearStudents = [];
				state.students = action.payload.data;
				state.errorMessage = null;
				state.isLoading = false;
			})
			.addCase(promoteStudentsBulk.rejected, (state, action) => {
				state.error = true;
				state.errorMessage = action.payload?.error;
				state.isLoading = false;
			})
			.addCase(promoteStudentsBulk.pending, (state, action) => {
				state.isLoading = true;
			});
	},
});

export default AcademicYearSlice.reducer;
