import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	user: {},
	isLoading: false,
	error: false,
	isLoggedIn: false,
};

export const login = createAsyncThunk(
	'user/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const res = await axios({
				method: 'post',
				url: 'http://localhost:8000/api/v1/staff/login',
				data: { email, password },
				withCredentials: true,
			});
			console.log(res, 'RES', res.data);
			//Store information in local storage
			localStorage.setItem('loggedIn', JSON.stringify(res.data.data));
			console.log('New');
			return res.data;
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue({ error: err.message });
		}
	}
);

const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loggedIn(state, action) {
			const user = JSON.parse(localStorage.getItem('loggedIn'));
			state.user = user;
			state.isLoggedIn = user ? true : false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoading = false;
				state.isLoggedIn = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.error = true;
				state.isLoading = false;
			});
	},
});

const { reducer } = authSlice;

export const { loggedIn } = authSlice.actions;

export default reducer;
