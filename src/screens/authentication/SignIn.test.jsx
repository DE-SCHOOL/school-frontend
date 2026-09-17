import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../../store/APIs/apiRequest';
import authReducer from '../../store/auth/authSlice';
import SignIn from './SignIn';

vi.mock('../../store/APIs/apiRequest', () => ({ apiRequest: vi.fn() }));
vi.mock('../../firebase.config', () => ({ auth: {} }));
vi.mock('firebase/auth', () => ({ signInWithCustomToken: vi.fn(() => Promise.resolve({})) }));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return { ...actual, useNavigate: () => mockNavigate };
});

function renderSignIn() {
	const store = configureStore({ reducer: { auth: authReducer } });
	render(
		<Provider store={store}>
			<MemoryRouter>
				<SignIn />
			</MemoryRouter>
		</Provider>
	);
	return store;
}

describe('SignIn', () => {
	beforeEach(() => {
		apiRequest.mockReset();
		mockNavigate.mockReset();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('dispatches login with the entered email and password on submit', () => {
		apiRequest.mockReturnValue(new Promise(() => {})); // leave pending, we only assert the call
		renderSignIn();

		fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
			target: { value: 'admin@school.cm' },
		});
		fireEvent.change(screen.getByPlaceholderText('Password'), {
			target: { value: 'password123' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Login' }));

		expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/staff/login', {
			email: 'admin@school.cm',
			password: 'password123',
		});
	});

	it('shows a loader while the login request is in flight', () => {
		apiRequest.mockReturnValue(new Promise(() => {}));
		renderSignIn();

		fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'a@b.cm' } });
		fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'x' } });
		fireEvent.click(screen.getByRole('button', { name: 'Login' }));

		expect(document.querySelector('.loading-page')).toBeInTheDocument();
	});

	it('shows the real server error message when login fails', async () => {
		apiRequest.mockRejectedValue({ response: { data: { message: 'Incorrect password' } } });
		renderSignIn();

		fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'a@b.cm' } });
		fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong' } });
		fireEvent.click(screen.getByRole('button', { name: 'Login' }));

		expect(await screen.findByText('Incorrect password')).toBeInTheDocument();
	});

	it('redirects to /teachers/list immediately if a session already exists in localStorage', () => {
		localStorage.setItem('loggedIn', JSON.stringify({ _id: '1', role: 'admin' }));

		renderSignIn();

		expect(mockNavigate).toHaveBeenCalledWith('/teachers/list');
	});

	it('redirects to /teachers/list once login succeeds', async () => {
		apiRequest.mockResolvedValue({ data: { data: { _id: '1', role: 'admin', customToken: 'fb' } } });
		renderSignIn();

		fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'a@b.cm' } });
		fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'x' } });
		fireEvent.click(screen.getByRole('button', { name: 'Login' }));

		await vi.waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/teachers/list'));
	});
});
