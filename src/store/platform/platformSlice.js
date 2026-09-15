import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { platformApiRequest } from '../APIs/platformApiRequest';

const initialState = {
	demoRequests: [],
	schools: [],
	isLoading: false,
	error: false,
	errorMessage: null,
	lastCreatedSchool: null,
};

export const getDemoRequests = createAsyncThunk(
	'platform/getDemoRequests',
	async (_, thunkAPI) => {
		try {
			const res = await platformApiRequest('get', '/api/v1/platform/demo-requests');
			return res.data.data;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err?.response?.data?.message || 'Something went wrong' });
		}
	}
);

export const setDemoRequestStatus = createAsyncThunk(
	'platform/setDemoRequestStatus',
	async ({ id, status }, thunkAPI) => {
		try {
			const res = await platformApiRequest('patch', `/api/v1/platform/demo-requests/${id}`, { status });
			return res.data.data;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err?.response?.data?.message || 'Something went wrong' });
		}
	}
);

export const getSchools = createAsyncThunk('platform/getSchools', async (_, thunkAPI) => {
	try {
		const res = await platformApiRequest('get', '/api/v1/platform/schools');
		return res.data.data;
	} catch (err) {
		return thunkAPI.rejectWithValue({ error: err?.response?.data?.message || 'Something went wrong' });
	}
});

export const setSchoolStatus = createAsyncThunk(
	'platform/setSchoolStatus',
	async ({ id, status }, thunkAPI) => {
		try {
			const res = await platformApiRequest('patch', `/api/v1/platform/schools/${id}`, { status });
			return res.data.data;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err?.response?.data?.message || 'Something went wrong' });
		}
	}
);

export const createSchool = createAsyncThunk(
	'platform/createSchool',
	async (payload, thunkAPI) => {
		try {
			const res = await platformApiRequest('post', '/api/v1/platform/schools', payload);
			return res.data.data;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err?.response?.data?.message || 'Something went wrong' });
		}
	}
);

const platformSlice = createSlice({
	name: 'platform',
	initialState,
	reducers: {
		clearLastCreatedSchool(state) {
			state.lastCreatedSchool = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDemoRequests.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDemoRequests.fulfilled, (state, action) => {
				state.demoRequests = action.payload;
				state.isLoading = false;
			})
			.addCase(getDemoRequests.rejected, (state, action) => {
				state.isLoading = false;
				state.error = true;
				state.errorMessage = action.payload?.error;
			})
			.addCase(setDemoRequestStatus.fulfilled, (state, action) => {
				state.demoRequests = state.demoRequests.map((d) =>
					d._id === action.payload._id ? action.payload : d
				);
			})
			.addCase(getSchools.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSchools.fulfilled, (state, action) => {
				state.schools = action.payload;
				state.isLoading = false;
			})
			.addCase(getSchools.rejected, (state, action) => {
				state.isLoading = false;
				state.error = true;
				state.errorMessage = action.payload?.error;
			})
			.addCase(setSchoolStatus.fulfilled, (state, action) => {
				state.schools = state.schools.map((s) => (s._id === action.payload._id ? action.payload : s));
			})
			.addCase(createSchool.pending, (state) => {
				state.isLoading = true;
				state.error = false;
				state.errorMessage = null;
			})
			.addCase(createSchool.fulfilled, (state, action) => {
				state.isLoading = false;
				state.schools = [action.payload, ...state.schools];
				state.lastCreatedSchool = action.payload;
			})
			.addCase(createSchool.rejected, (state, action) => {
				state.isLoading = false;
				state.error = true;
				state.errorMessage = action.payload?.error;
			});
	},
});

export const { clearLastCreatedSchool } = platformSlice.actions;
export default platformSlice.reducer;
