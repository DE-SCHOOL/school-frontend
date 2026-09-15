import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { platformApiRequest } from '../APIs/platformApiRequest';

const initialState = {
	platformStaff: {},
	isLoading: false,
	error: false,
	isLoggedIn: false,
	errorMessage: null,
};

export const platformLogin = createAsyncThunk(
	'platformAuth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const res = await platformApiRequest('post', `/api/v1/platform/login`, {
				email,
				password,
			});
			localStorage.setItem('platformLoggedIn', JSON.stringify(res.data.data));
			return res.data;
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			return thunkAPI.rejectWithValue({ error });
		}
	}
);

export const platformLogout = createAsyncThunk('platformAuth/logout', async () => {
	localStorage.removeItem('platformLoggedIn');
});

const platformAuthSlice = createSlice({
	name: 'platformAuth',
	initialState,
	reducers: {
		platformLoggedIn(state) {
			const platformStaff = JSON.parse(localStorage.getItem('platformLoggedIn'));
			state.platformStaff = platformStaff || {};
			state.isLoggedIn = Boolean(platformStaff);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(platformLogin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(platformLogin.fulfilled, (state, action) => {
				state.platformStaff = action.payload.data;
				state.isLoading = false;
				state.isLoggedIn = true;
				state.errorMessage = null;
			})
			.addCase(platformLogin.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
				state.errorMessage = action.payload?.error;
			})
			.addCase(platformLogout.fulfilled, (state) => {
				state.platformStaff = {};
				state.isLoggedIn = false;
			});
	},
});

export const { platformLoggedIn } = platformAuthSlice.actions;
export default platformAuthSlice.reducer;
