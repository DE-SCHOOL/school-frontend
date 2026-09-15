import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	category: {},
	categories: [],
	isLoading: false,
	error: false,
	errorMessage: '',
};

export const getAllCategory = createAsyncThunk(
	'category',
	async (data, thunkAPI) => {
		try {
			const res = await apiRequest('get', '/api/v1/question-category', data);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';

			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: () => {},
	extraReducers: (builders) => {
		builders
			.addCase(getAllCategory.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllCategory.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(getAllCategory.fulfilled, (state, action) => {
				state.category = {};
				state.categories = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			});
	},
});

export default categorySlice.reducer;
