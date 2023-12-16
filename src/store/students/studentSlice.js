import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';
// import getApiError from '../../utilities/getApiError';

const initialState = {
	students: [],
	error: false,
	isLoading: false,
	errorMessage: null,
};

export const getStudents = createAsyncThunk(
	'student/getStudents',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/student`);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);
export const addStudent = createAsyncThunk(
	'student/addStudent',
	async (
		{
			name,
			matricule,
			specialty,
			address,
			gender,
			dob,
			pod,
			email,
			tel,
			parent_name,
			parent_email,
			parent_tel,
			level,
			entry_certificate,
		},
		thunkAPI
	) => {
		try {
			// console.log(name, matricule);
			const res = await apiRequest('post', `/api/v1/student`, {
				name,
				matricule,
				specialty,
				address,
				gender,
				dob,
				pod,
				email,
				tel,
				parent_name,
				parent_email,
				parent_tel,
				level,
				entry_certificate,
			});
			// console.log(res);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);
export const getStaffStudents = createAsyncThunk(
	'staff/getStaffStudents',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/student/${id}/students`);
			console.log(res.data, 111111);
			return res.data;
		} catch (err) {
			let error = err.response.data?.message;
			console.log(err, 'message');
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const studentSlice = createSlice({
	name: 'student',
	initialState,
	reducers: {
		removeStudent() {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStudents.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStudents.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getStudents.fulfilled, (state, action) => {
				state.students = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(addStudent.fulfilled, (state, action) => {
				// state.students = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(addStudent.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(addStudent.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStaffStudents.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStaffStudents.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getStaffStudents.fulfilled, (state, action) => {
				console.log('THIS IS RUBUISH')
				state.students = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			});
	},
});

const { reducer } = studentSlice;
export const { removeStudent } = studentSlice.actions;

export default reducer;
