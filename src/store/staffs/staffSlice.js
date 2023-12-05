import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';
// import getApiError from '../../utilities/getApiError';

const initialState = {
	teachers: [],
	error: false,
	isLoading: false,
	errorMessage: null,
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
			const res = await apiRequest(
				'post',
				`http://localhost:8000/api/v1/staff/register`,
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
				}
			);
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
			});
	},
});

// console.log()
//import.meta.env

const { reducer } = staffSlice;
export const { removeStaffs } = staffSlice.actions;

export default reducer;
