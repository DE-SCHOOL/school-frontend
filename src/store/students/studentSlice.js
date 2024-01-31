import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';
// import getApiError from '../../utilities/getApiError';

const initialState = {
	students: [],
	student: {},
	error: false,
	isLoading: false,
	errorMessage: null,
	success: false,
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

export const getStudentsPerCourseOffering = createAsyncThunk(
	'student/getStudentsPerCourseOffering',
	async ({ courseID }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/student/course/${courseID}`);
			return res.data;
		} catch (err) {
			// const msg = getApiError();
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const editStudent = createAsyncThunk(
	'student/editStudent',
	async ({ reqData, id }, thunkAPI) => {
		try {
			// console.log(name, matricule);
			const res = await apiRequest('patch', `/api/v1/student/${id}`, {
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
			pob,
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
				pob,
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
			let error = err.response.data?.message;
			// console.log(err, 'message');
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);
export const getStaffStudents = createAsyncThunk(
	'staff/getStaffStudents',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/student/${id}/students`);
			// console.log(res.data, 111111);
			return res.data;
		} catch (err) {
			let error = err.response.data?.message;
			// console.log(err, 'message');
			error = error ? error : 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getStudent = createAsyncThunk(
	'student/getStudent',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/student/${id}`);
			// console.log(res.data, 111111);
			return res.data;
		} catch (err) {
			let error = err.response.data?.message;
			// console.log(err, 'message');
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
				state.student = {};
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getStudent.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStudent.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getStudent.fulfilled, (state, action) => {
				state.student = action.payload.data;
				state.isLoading = false;
			})
			.addCase(addStudent.fulfilled, (state, action) => {
				// state.students = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
				state.success = true;
			})
			.addCase(addStudent.pending, (state, action) => {
				state.isLoading = true;
				state.success = false;

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
				state.students = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getStudentsPerCourseOffering.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getStudentsPerCourseOffering.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getStudentsPerCourseOffering.fulfilled, (state, action) => {
				state.students = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(editStudent.fulfilled, (state, action) => {
				state.students = [];
				state.student = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(editStudent.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(editStudent.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			});
	},
});

const { reducer } = studentSlice;
export const { removeStudent } = studentSlice.actions;

export default reducer;
