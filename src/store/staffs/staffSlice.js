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
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/staff`);
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

export const editStaff = createAsyncThunk(
	'staff/editStaff',
	async ({ reqData, id }, thunkAPI) => {
		try {
			// console.log(name, matricule);
			const res = await apiRequest('patch', `/api/v1/staff/${id}`, {
				...reqData,
			});
			// console.log(res);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const getStaff = createAsyncThunk(
	'staff/getStaff',
	async ({ id }, thunkAPI) => {
		try {
			// console.log(name, matricule);
			const res = await apiRequest('get', `/api/v1/staff/${id}`);
			// console.log(res);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
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
				// console.log(action.payload);
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
				// console.log(action.payload);
				state.isLoading = true;
			})
			.addCase(getStaff.rejected, (state, action) => {
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

// console.log()
//import.meta.env

const { reducer } = staffSlice;
export const { removeStaffs } = staffSlice.actions;

export default reducer;
