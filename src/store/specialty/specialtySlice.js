import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
	specialties: [],
	isLoading: false,
	error: false,
	errorMessage: null,
};

export const getSpecialties = createAsyncThunk(
	'specialty/getSpecialties',
	async (thunkAPI) => {
		try {
			const res = await axios({
				method: 'get',
				url: 'http://localhost:8000/api/v1/specialty',
				withCredentials: true,
			});

			// console.log(res.data);
			return res.data;
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

export const createSpecialties = createAsyncThunk(
	'specialty/createSpecialties',
	async ({ name, department }, thunkAPI) => {
		try {
			const res = await axios({
				method: 'post',
				url: 'http://localhost:8000/api/v1/specialty',
				data: { name, department },
				withCredentials: true,
			});

			// console.log(res.data);
			return res.data;
		} catch (err) {
			console.log(err);
			const error = err?.response?.data?.message || 'Something went wrong';
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
				console.log(action.payload);
				state.specialties = action.payload;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(getSpecialties.rejected, (state, action) => {
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
			});
	},
});

const { reducer } = specialtySlice;

export const { removeSpecialties } = specialtySlice.actions;

export default reducer;
