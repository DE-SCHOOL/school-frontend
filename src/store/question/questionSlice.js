import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	isLoading: false,
	error: false,
	question: null,
	questions: [],
	errorMessage: null,
	success: false,
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

export const createQuestion = createAsyncThunk(
	'question/createQuestion',
	async (data, thunkAPI) => {
		try {
			const res = await apiRequest('post', '/api/v1/question/', data);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const getQuestion = createAsyncThunk(
	'question/getQuestion',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('get', `/api/v1/question/${id}`);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const deleteQuestion = createAsyncThunk(
	'question/deleteQuestion',
	async ({ id }, thunkAPI) => {
		try {
			const res = await apiRequest('delete', `/api/v1/question/${id}`);
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const editQuestion = createAsyncThunk(
	'question/editQuestion',
	async (data, thunkAPI) => {
		try {
			const res = await apiRequest('delete', `/api/v1/question/${data.id}`);
			return res.data;
		} catch (err) {
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
				state.question = null;
				state.questions = action.payload.data;
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(createQuestion.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createQuestion.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(createQuestion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.errorMessage = null;
				state.success = true;
			})
			.addCase(deleteQuestion.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteQuestion.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.errorMessage = null;
				state.success = true;
			})
			.addCase(getQuestion.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getQuestion.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(getQuestion.fulfilled, (state, action) => {
				state.question = action.payload.data;
				state.questions = [];
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(editQuestion.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(editQuestion.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error || action.payload;
			})
			.addCase(editQuestion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.errorMessage = null;
				state.success = true;
			});
	},
});

export default questionSlice.reducer;
