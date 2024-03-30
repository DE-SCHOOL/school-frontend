import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	isLoading: false,
	error: false,
	question: {},
	questions: [],
	errorMessage: null,
};

export const getAllQuestions = createAsyncThunk(
	'question/getAllQuestions',
	async (thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/question/`);

			return res.data;
		} catch (err) {
			// console.log(err);
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllQuestions.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllQuestions.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(getAllQuestions.fulfilled, (state, action) => {
				state.question = {};
				state.questions = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			});
	},
});

export default questionSlice.reducer;
