import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	programs: [],
	isLoading: false,
	error: false,
	errorMessage: null,
	program: {},
};

export const getPrograms = createAsyncThunk(
	'program/getPrograms',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/program`);
			return res.data;
		} catch (err) {
			// console.log(err);
			let error = err?.response?.data?.message;
			error = error ? error : 'Something went very Wrong';
			// console.log(error);
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getProgram = createAsyncThunk(
	'program/getProgram',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/program/${id}`);
			return res.data;
		} catch (err) {
			// console.log(err);
			let error = err?.response?.data?.message;
			error = error ? error : 'Something went very Wrong';
			// console.log(error);
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const createPrograms = createAsyncThunk(
	'program/createPrograms',
	async ({ name, director, deputyDirector }, thunkAPI) => {
		try {
			const res = await apiRequest('post', `/api/v1/program`, {
				name,
				director,
				deputyDirector,
			});
			return res.data;
		} catch (err) {
			// console.log(err);
			let error = err?.response?.data?.message;
			error = error ? error : 'Something went very Wrong';
			// console.log(error);
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const editPrograms = createAsyncThunk(
	'program/editPrograms',
	async ({ name, director, deputyDirector, id }, thunkAPI) => {
		try {
			const res = await apiRequest('patch', `/api/v1/program/${id}`, {
				name,
				director,
				deputyDirector,
			});
			return res.data;
		} catch (err) {
			// console.log(err);
			let error = err?.response?.data?.message;
			error = error ? error : 'Something went very Wrong';
			// console.log(error);
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const programSlice = createSlice({
	name: 'program',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPrograms.fulfilled, (state, action) => {
				state.programs = action.payload;
				state.program = {};
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getPrograms.pending, (state, action) => {
				// console.log(action.payload);
				state.isLoading = true;
			})
			.addCase(getPrograms.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(getProgram.fulfilled, (state, action) => {
				state.program = action.payload.data;
				state.programs = [];
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getProgram.pending, (state, action) => {
				// console.log(action.payload);
				state.isLoading = true;
			})
			.addCase(getProgram.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(createPrograms.fulfilled, (state, action) => {
				// state.programs = action.payload;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(createPrograms.pending, (state, action) => {
				// console.log(action.payload);
				state.isLoading = true;
			})
			.addCase(createPrograms.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(editPrograms.fulfilled, (state, action) => {
				// state.programs = [];
				state.program = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(editPrograms.pending, (state, action) => {
				// console.log(action.payload);
				state.isLoading = true;
			})
			.addCase(editPrograms.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			});
	},
});

const { reducer } = programSlice;

export default reducer;
