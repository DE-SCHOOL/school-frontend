import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';
// import getApiError from '../../utilities/getApiError';

const initialState = {
	teachers: [],
	error: false,
	isLoading: false,
	errorMessage: null,
	teacher: {},
};

export const getStaffs = createAsyncThunk(
	'staff/getStaffs',
	async (_, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/staff`);
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			let error = err?.response?.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);
export const addStaff = createAsyncThunk(
	'staff/addStaff',
	async (
		{
			gender,
			matricule,
			name,
			department,
			address,
			dob,
			pob,
			email,
			tel,
			password,
			confirmPassword,
			high_certificate,
			marital_status,
			role,
			picture,
		},
		thunkAPI
	) => {
		try {
			const res = await apiRequest('post', `/api/v1/staff/register`, {
				gender,
				matricule,
				name,
				department,
				address,
				dob,
				pob,
				email,
				tel,
				password,
				confirmPassword,
				high_certificate,
				marital_status,
				role,
				picture,
			});
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			let error = err?.response?.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const editStaff = createAsyncThunk(
	'staff/editStaff',
	async ({ reqData, id }, thunkAPI) => {
		try {
			const res = await apiRequest('patch', `/api/v1/staff/${id}`, {
				...reqData,
			});
			return res.data;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const getStaff = createAsyncThunk(
	'staff/getStaff',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/staff/${id}`);
			return res.data;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const deleteStaff = createAsyncThunk(
	'staff/deleteStaff',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('delete', `/api/v1/staff/${id}`);

			return res.data;
		} catch (err) {
			let error = err?.response?.data?.message;
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const staffSlice = createSlice({
	name: 'staff',
	initialState,
	reducers: {
		removeStaffs: (state, action) => {
			state.teachers = [];
		},
		// removeStaffs() {

		// }
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStaffs.fulfilled, (state, action) => {
				state.teachers = action.payload;
				state.teacher = {};
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getStaffs.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getStaffs.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStaff.fulfilled, (state, action) => {
				state.teacher = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getStaff.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getStaff.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(deleteStaff.fulfilled, (state, action) => {
				state.teacher = action.payload.data;
				state.teacher = {};
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(deleteStaff.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteStaff.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(addStaff.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addStaff.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(addStaff.fulfilled, (state, action) => {
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(editStaff.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editStaff.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(editStaff.fulfilled, (state, action) => {
				state.teacher = action.payload.data;
				state.teachers = [];
				state.isLoading = false;
				state.errorMessage = null;
			});
	},
});

//import.meta.env

const { reducer } = staffSlice;
export const { removeStaffs } = staffSlice.actions;

export default reducer;
