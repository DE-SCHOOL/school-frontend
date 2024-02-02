import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';
const initialState = {
	specialties: [],
	isLoading: false,
	error: false,
	errorMessage: null,
	specialtyName: '',
	specialty: {},
};

export const getSpecialties = createAsyncThunk(
	'specialty/getSpecialties',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/specialty`);

			// console.log(res.data);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const getSpecialty = createAsyncThunk(
	'specialty/getSpecialty',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/specialty/${id}`);

			// console.log(res.data);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const getSpecialtyCourses = createAsyncThunk(
	'specialty/getSpecialtyCourses',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/course/specialty/${id}`);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const createSpecialties = createAsyncThunk(
	'specialty/createSpecialties',
	async ({ name, department }, thunkAPI) => {
		try {
			const res = await apiRequest('post', `/api/v1/specialty`, {
				name,
				department,
			});
			// console.log(res.data);
			return res.data;
		} catch (err) {
			// console.log(err);
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const editSpecialty = createAsyncThunk(
	'specialty/edit',
	async ({ name, department, id }, thunkAPI) => {
		try {
			const res = await apiRequest('patch', `/api/v1/specialty/${id}`, {
				name,
				department,
			});
			// console.log(res.data);
			return res.data;
		} catch (err) {
			// console.log(err);
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const deleteSpecialty = createAsyncThunk(
	'specialty/deleteSpecialty',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('delete', `/api/v1/specialty/${id}`);
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

const specialtySlice = createSlice({
	name: 'specialty',
	initialState,
	reducers: {
		removeSpecialties: (state, action) => {
			state.specialties = [];
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSpecialties.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getSpecialties.fulfilled, (state, action) => {
				// console.log(action.payload);
				state.specialties = action.payload;
				state.specialty = {};
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getSpecialties.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(getSpecialty.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getSpecialty.fulfilled, (state, action) => {
				state.specialties = [];
				state.specialty = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getSpecialty.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(deleteSpecialty.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteSpecialty.fulfilled, (state, action) => {
				state.specialties = action.payload;
				state.specialty = [];
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(deleteSpecialty.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(createSpecialties.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createSpecialties.fulfilled, (state, action) => {
				// state.specialties = action.payload;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(createSpecialties.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(editSpecialty.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(editSpecialty.fulfilled, (state, action) => {
				state.specialties = [];
				state.specialty = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(editSpecialty.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(getSpecialtyCourses.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getSpecialtyCourses.fulfilled, (state, action) => {
				console.log(action.payload);
				state.specialties = action.payload;
				state.specialtyName = action.payload.data[0]?.specialty[0]?.name || '';
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getSpecialtyCourses.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			});
	},
});

const { reducer } = specialtySlice;

export const { removeSpecialties } = specialtySlice.actions;

export default reducer;
