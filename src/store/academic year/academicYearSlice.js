import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	academicYears: [],
	isLoading: false,
	error: false,
	errorMessage: null,
	currentYear: null,
};

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
			});
	},
});

export default AcademicYearSlice.reducer;
