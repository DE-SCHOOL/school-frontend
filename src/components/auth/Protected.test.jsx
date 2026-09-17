import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Protected from './Protected';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return { ...actual, useNavigate: () => mockNavigate };
});

describe('Protected', () => {
	beforeEach(() => {
		mockNavigate.mockReset();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('renders its children when the logged-in user\'s role is in the allowed list', () => {
		localStorage.setItem('loggedIn', JSON.stringify({ role: 'admin' }));

		render(
			<MemoryRouter>
				<Protected restrict={['admin', 'director']}>
					<div>Admin dashboard</div>
				</Protected>
			</MemoryRouter>
		);

		expect(screen.getByText('Admin dashboard')).toBeInTheDocument();
		expect(mockNavigate).not.toHaveBeenCalled();
	});

	it('navigates back when the role is not in the allowed list', () => {
		localStorage.setItem('loggedIn', JSON.stringify({ role: 'lecturer' }));

		render(
			<MemoryRouter>
				<Protected restrict={['admin', 'director']}>
					<div>Admin dashboard</div>
				</Protected>
			</MemoryRouter>
		);

		expect(mockNavigate).toHaveBeenCalledWith(-1);
	});

	it('navigates back when there is no logged-in user at all', () => {
		render(
			<MemoryRouter>
				<Protected restrict={['admin']}>
					<div>Admin dashboard</div>
				</Protected>
			</MemoryRouter>
		);

		expect(mockNavigate).toHaveBeenCalledWith(-1);
	});

	// Renders children regardless (the redirect is a useEffect side
	// effect, not a render guard) - real, existing behavior: the
	// protected content is visible for one frame even when unauthorized,
	// pinned here rather than assumed away.
	it('still renders children synchronously even while redirecting away', () => {
		render(
			<MemoryRouter>
				<Protected restrict={['admin']}>
					<div>Admin dashboard</div>
				</Protected>
			</MemoryRouter>
		);

		expect(screen.getByText('Admin dashboard')).toBeInTheDocument();
	});
});
