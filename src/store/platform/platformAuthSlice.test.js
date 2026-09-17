import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { platformApiRequest } from '../APIs/platformApiRequest';
import platformAuthReducer, { platformLogin, platformLogout, platformLoggedIn } from './platformAuthSlice';

vi.mock('../APIs/platformApiRequest', () => ({ platformApiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { platformAuth: platformAuthReducer } });
}

describe('platformAuthSlice', () => {
	beforeEach(() => {
		platformApiRequest.mockReset();
	});

	afterEach(() => {
		localStorage.clear();
	});

	describe('platformLogin', () => {
		it('persists the platform session under its own separate localStorage key', async () => {
			const store = makeStore();
			const staff = { _id: '1', name: 'Founder', role: 'super_admin', token: 'platform-jwt' };
			platformApiRequest.mockResolvedValue({ data: { data: staff } });

			await store.dispatch(platformLogin({ email: 'founder@deschool.cm', password: 'secret' }));

			expect(platformApiRequest).toHaveBeenCalledWith('post', '/api/v1/platform/login', {
				email: 'founder@deschool.cm',
				password: 'secret',
			});
			expect(JSON.parse(localStorage.getItem('platformLoggedIn'))).toEqual(staff);
			expect(localStorage.getItem('loggedIn')).toBeNull();

			const state = store.getState().platformAuth;
			expect(state.isLoggedIn).toBe(true);
			expect(state.platformStaff).toEqual(staff);
		});

		it('sets a real server error message on failure', async () => {
			const store = makeStore();
			platformApiRequest.mockRejectedValue({ response: { data: { message: 'Incorrect password' } } });

			await store.dispatch(platformLogin({ email: 'x@y.cm', password: 'wrong' }));

			const state = store.getState().platformAuth;
			expect(state.error).toBe(true);
			expect(state.errorMessage).toBe('Incorrect password');
			expect(state.isLoggedIn).toBe(false);
		});
	});

	describe('platformLogout', () => {
		it('clears only the platform session key and resets state', async () => {
			const store = makeStore();
			localStorage.setItem('platformLoggedIn', JSON.stringify({ _id: '1' }));
			localStorage.setItem('loggedIn', JSON.stringify({ _id: 'school-staff' }));

			await store.dispatch(platformLogout());

			expect(localStorage.getItem('platformLoggedIn')).toBeNull();
			expect(localStorage.getItem('loggedIn')).not.toBeNull();
			const state = store.getState().platformAuth;
			expect(state.isLoggedIn).toBe(false);
			expect(state.platformStaff).toEqual({});
		});
	});

	describe('platformLoggedIn reducer', () => {
		it('reads the persisted platform session from its own localStorage key', () => {
			const store = makeStore();
			localStorage.setItem('platformLoggedIn', JSON.stringify({ _id: '1', role: 'super_admin' }));

			store.dispatch(platformLoggedIn());

			const state = store.getState().platformAuth;
			expect(state.isLoggedIn).toBe(true);
			expect(state.platformStaff).toEqual({ _id: '1', role: 'super_admin' });
		});

		it('does not authenticate from a school-staff session under the other key', () => {
			const store = makeStore();
			localStorage.setItem('loggedIn', JSON.stringify({ _id: 'school-staff' }));

			store.dispatch(platformLoggedIn());

			expect(store.getState().platformAuth.isLoggedIn).toBe(false);
		});
	});
});
