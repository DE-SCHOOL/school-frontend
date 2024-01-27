import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	departments: [],
	isLoading: false,
	error: false,
	errorMessage: null,
	department: {},
};

export const getDepartments = createAsyncThunk(
	'department/getDepartments',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/department`);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const getDepartment = createAsyncThunk(
	'department/getDepartment',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/department/${id}`);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const createDepartment = createAsyncThunk(
	'department/create',
	async ({ name, hod, program }, thunkAPI) => {
		try {
			const res = await apiRequest('post', `/api/v1/department`, {
				name,
				hod,
				program,
			});
			// console.log()
			return res.data;
		} catch (err) {
			// console.log(err);
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const editDepartment = createAsyncThunk(
	'department/edit',
	async ({ name, hod, program, id }, thunkAPI) => {
		try {
			const res = await apiRequest('patch', `/api/v1/department/${id}`, {
				name,
				hod,
				program,
			});
			// console.log()
			return res.data;
		} catch (err) {
			// console.log(err);
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const departmentSlice = createSlice({
	name: 'department',
	initialState,
	reducers: {
		removeDepartments: (state, action) => {
			state.departments = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDepartments.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDepartments.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(getDepartments.fulfilled, (state, action) => {
				state.departments = action.payload;
				state.department = {};
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getDepartment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDepartment.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(getDepartment.fulfilled, (state, action) => {
				state.department = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(createDepartment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createDepartment.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(createDepartment.fulfilled, (state, action) => {
				// state.departments = action.payload;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(editDepartment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editDepartment.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(editDepartment.fulfilled, (state, action) => {
				state.department = action.payload.data;
				state.departments = [];
				state.isLoading = false;
				state.errorMessage = null;
			});
	},
});

const { reducer } = departmentSlice;

export const { removeDepartments } = departmentSlice.actions;

export default reducer;
