import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	reviews: [],
	isLoading: false,
	error: false,
	errorMessage: null,
	review: {},
	success: false,
};

export const createReviews = createAsyncThunk(
	'review/createReviews',
	async (data, thunkAPI) => {
		try {
			const res = await apiRequest('post', '/api/v1/review/many', data);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const reviewSlice = createSlice({
	name: 'review',
	initialState,
	reducers: {},
	extraReducers: (builders) => {
		builders
			.addCase(createReviews.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createReviews.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(createReviews.fulfilled, (state, action) => {
				// state.reviews = action.payload;
				state.review = {};
				state.isLoading = false;
				state.errorMessage = null;
				state.success = true;
			});
	},
});

export default reviewSlice.reducer;
