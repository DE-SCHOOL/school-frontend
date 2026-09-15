import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../APIs/apiRequest';

// The public "Book a Demo" form. Deliberately uses the ordinary
// apiRequest (not platformApiRequest) — POST /api/v1/platform/demo-requests
// is the one genuinely unauthenticated route on the platform router (see
// demo_request.controller.js), filled in by a prospective school before
// they have any account with DE-SCHOOL at all.
const initialState = {
	isLoading: false,
	isSubmitted: false,
	error: false,
	errorMessage: null,
};

export const submitDemoRequest = createAsyncThunk(
	'demoRequest/submit',
	async (payload, thunkAPI) => {
		try {
			const res = await apiRequest('post', '/api/v1/platform/demo-requests', payload, false);
			return res.data.data;
		} catch (err) {
			return thunkAPI.rejectWithValue({ error: err?.response?.data?.message || 'Something went wrong' });
		}
	}
);

const demoRequestSlice = createSlice({
	name: 'demoRequest',
	initialState,
	reducers: {
		resetDemoRequestForm(state) {
			state.isSubmitted = false;
			state.error = false;
			state.errorMessage = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(submitDemoRequest.pending, (state) => {
				state.isLoading = true;
				state.error = false;
				state.errorMessage = null;
			})
			.addCase(submitDemoRequest.fulfilled, (state) => {
				state.isLoading = false;
				state.isSubmitted = true;
			})
			.addCase(submitDemoRequest.rejected, (state, action) => {
				state.isLoading = false;
				state.error = true;
				state.errorMessage = action.payload?.error;
			});
	},
});

export const { resetDemoRequestForm } = demoRequestSlice.actions;
export default demoRequestSlice.reducer;
