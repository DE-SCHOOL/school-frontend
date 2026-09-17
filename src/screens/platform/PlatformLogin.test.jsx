import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { platformApiRequest } from '../../store/APIs/platformApiRequest';
import platformAuthReducer from '../../store/platform/platformAuthSlice';
import PlatformLogin from './PlatformLogin';

vi.mock('../../store/APIs/platformApiRequest', () => ({ platformApiRequest: vi.fn() }));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return { ...actual, useNavigate: () => mockNavigate };
});

function renderPlatformLogin() {
	const store = configureStore({ reducer: { platformAuth: platformAuthReducer } });
	render(
		<Provider store={store}>
			<MemoryRouter>
				<PlatformLogin />
			</MemoryRouter>
		</Provider>
	);
}

describe('PlatformLogin', () => {
	beforeEach(() => {
		platformApiRequest.mockReset();
		mockNavigate.mockReset();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('dispatches platformLogin with the entered credentials', () => {
		platformApiRequest.mockReturnValue(new Promise(() => {}));
		renderPlatformLogin();

		fireEvent.change(screen.getByPlaceholderText('you@deschool.cm'), { target: { value: 'founder@deschool.cm' } });
		fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'secret' } });
		fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

		expect(platformApiRequest).toHaveBeenCalledWith('post', '/api/v1/platform/login', {
			email: 'founder@deschool.cm',
			password: 'secret',
		});
	});

	it('redirects to /platform/dashboard once already logged in', () => {
		localStorage.setItem('platformLoggedIn', JSON.stringify({ token: 'jwt' }));
		renderPlatformLogin();
		expect(mockNavigate).toHaveBeenCalledWith('/platform/dashboard');
	});

	it('does not redirect when there is no existing platform session', () => {
		renderPlatformLogin();
		expect(mockNavigate).not.toHaveBeenCalled();
	});

	it('shows the real server error message on failed login', async () => {
		platformApiRequest.mockRejectedValue({ response: { data: { message: 'Incorrect password' } } });
		renderPlatformLogin();

		fireEvent.change(screen.getByPlaceholderText('you@deschool.cm'), { target: { value: 'x@y.cm' } });
		fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong' } });
		fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

		expect(await screen.findByText('Incorrect password')).toBeInTheDocument();
	});

	it('links to the school staff login as an alternative', () => {
		renderPlatformLogin();
		expect(screen.getByRole('link', { name: 'Go there' })).toHaveAttribute('href', '/auth/signin');
	});
});
