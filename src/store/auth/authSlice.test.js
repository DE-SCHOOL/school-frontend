import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import authReducer, { login, logout, loggedIn } from './authSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));
vi.mock('../../firebase.config', () => ({ auth: {} }));
vi.mock('firebase/auth', () => ({ signInWithCustomToken: vi.fn() }));

import { signInWithCustomToken } from 'firebase/auth';

function makeStore() {
	return configureStore({ reducer: { auth: authReducer } });
}

describe('authSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
		signInWithCustomToken.mockReset();
	});

	afterEach(() => {
		localStorage.clear();
	});

	describe('login', () => {
		it('persists the logged-in user and semester to localStorage on success', async () => {
			const store = makeStore();
			const user = { _id: '1', name: 'Admin', role: 'admin', token: 'jwt', customToken: 'fb-token' };
			apiRequest.mockResolvedValue({ data: { data: user } });
			signInWithCustomToken.mockResolvedValue({});

			await store.dispatch(login({ email: 'admin@school.cm', password: 'password123' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/staff/login', {
				email: 'admin@school.cm',
				password: 'password123',
			});
			expect(JSON.parse(localStorage.getItem('loggedIn'))).toEqual(user);
			expect(JSON.parse(localStorage.getItem('semester'))).toEqual({ current: 's1' });
			const state = store.getState().auth;
			expect(state.isLoggedIn).toBe(true);
			expect(state.user).toEqual({ data: user });
		});

		it('attempts Firebase sign-in with the returned custom token', async () => {
			const store = makeStore();
			const user = { _id: '1', customToken: 'fb-token' };
			apiRequest.mockResolvedValue({ data: { data: user } });
			signInWithCustomToken.mockResolvedValue({});

			await store.dispatch(login({ email: 'a@b.cm', password: 'x' }));

			expect(signInWithCustomToken).toHaveBeenCalledWith({}, 'fb-token');
		});

		// The actual bug this pins: a dev/mock backend's Firebase custom
		// token is never valid against the real, fixed Firebase project
		// (see authSlice.js's own comment) - real login must still
		// succeed even when that secondary sign-in rejects.
		it('still completes a successful login even if Firebase sign-in rejects', async () => {
			const store = makeStore();
			const user = { _id: '1', name: 'Admin', customToken: 'invalid-for-this-project' };
			apiRequest.mockResolvedValue({ data: { data: user } });
			signInWithCustomToken.mockRejectedValue(new Error('auth/invalid-custom-token'));

			await store.dispatch(login({ email: 'admin@school.cm', password: 'password123' }));

			const state = store.getState().auth;
			expect(state.isLoggedIn).toBe(true);
			expect(state.error).toBe(false);
			expect(JSON.parse(localStorage.getItem('loggedIn'))).toEqual(user);
		});

		it('sets error state with the real server message when the JWT login itself fails', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Incorrect password' } } });

			await store.dispatch(login({ email: 'admin@school.cm', password: 'wrong' }));

			const state = store.getState().auth;
			expect(state.error).toBe(true);
			expect(state.errorMessage).toBe('Incorrect password');
			expect(state.isLoggedIn).toBe(false);
			expect(localStorage.getItem('loggedIn')).toBeNull();
		});

		it('sets isLoading while pending', () => {
			const store = makeStore();
			apiRequest.mockReturnValue(new Promise(() => {}));
			store.dispatch(login({ email: 'a@b.cm', password: 'x' }));
			expect(store.getState().auth.isLoading).toBe(true);
		});
	});

	describe('logout', () => {
		it('removes the persisted session and resets state on success', async () => {
			const store = makeStore();
			localStorage.setItem('loggedIn', JSON.stringify({ _id: '1' }));
			apiRequest.mockResolvedValue({ data: {} });

			await store.dispatch(logout());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/staff/logout');
			expect(localStorage.getItem('loggedIn')).toBeNull();
			const state = store.getState().auth;
			expect(state.isLoggedIn).toBe(false);
			expect(state.user).toEqual({});
		});

		it('still clears localStorage even if the server call fails (removeItem runs before the request)', async () => {
			const store = makeStore();
			localStorage.setItem('loggedIn', JSON.stringify({ _id: '1' }));
			apiRequest.mockRejectedValue(new Error('network error'));

			await store.dispatch(logout());

			expect(localStorage.getItem('loggedIn')).toBeNull();
			expect(store.getState().auth.error).toBe(true);
		});
	});

	describe('loggedIn reducer', () => {
		it('reads the persisted session from localStorage into state', () => {
			const store = makeStore();
			localStorage.setItem('loggedIn', JSON.stringify({ _id: '1', name: 'Admin' }));

			store.dispatch(loggedIn());

			const state = store.getState().auth;
			expect(state.isLoggedIn).toBe(true);
			expect(state.user).toEqual({ _id: '1', name: 'Admin' });
		});

		it('reports not logged in when localStorage has nothing', () => {
			const store = makeStore();
			store.dispatch(loggedIn());
			expect(store.getState().auth.isLoggedIn).toBe(false);
		});
	});
});
