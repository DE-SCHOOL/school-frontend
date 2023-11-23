import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	departments: [],
	isLoading: false,
	error: false,
	errorMessage: null,
};

export const getDepartments = createAsyncThunk(
	'department/getDepartments',
	async (thunkAPI) => {
		try {
			const res = await axios({
				method: 'get',
				url: 'http://localhost:8000/api/v1/department',
				withCredentials: true,
			});
			return res.data;
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const createDepartment = createAsyncThunk(
	'department/create',
	async ({ name, hod, program }, thunkAPI) => {
		try {
			const res = await axios({
				method: 'post',
				url: 'http://localhost:8000/api/v1/department',
				withCredentials: true,
				data: { name, hod, program },
			});
			// console.log()
			return res.data;
		} catch (err) {
			console.log(err);
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
			});
	},
});

const { reducer } = departmentSlice;

export const { removeDepartments } = departmentSlice.actions;

export default reducer;
