import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PlatformProtected from './PlatformProtected';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return { ...actual, useNavigate: () => mockNavigate };
});

describe('PlatformProtected', () => {
	beforeEach(() => {
		mockNavigate.mockReset();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('renders its children when a platform session with a token exists', () => {
		localStorage.setItem('platformLoggedIn', JSON.stringify({ token: 'platform-jwt' }));

		render(
			<MemoryRouter>
				<PlatformProtected>
					<div>Platform dashboard</div>
				</PlatformProtected>
			</MemoryRouter>
		);

		expect(screen.getByText('Platform dashboard')).toBeInTheDocument();
		expect(mockNavigate).not.toHaveBeenCalled();
	});

	it('renders nothing and redirects to /platform/login when there is no session', () => {
		render(
			<MemoryRouter>
				<PlatformProtected>
					<div>Platform dashboard</div>
				</PlatformProtected>
			</MemoryRouter>
		);

		expect(screen.queryByText('Platform dashboard')).not.toBeInTheDocument();
		expect(mockNavigate).toHaveBeenCalledWith('/platform/login');
	});

	it('does not authenticate from a school-staff session under the other localStorage key', () => {
		localStorage.setItem('loggedIn', JSON.stringify({ token: 'school-staff-jwt' }));

		render(
			<MemoryRouter>
				<PlatformProtected>
					<div>Platform dashboard</div>
				</PlatformProtected>
			</MemoryRouter>
		);

		expect(screen.queryByText('Platform dashboard')).not.toBeInTheDocument();
		expect(mockNavigate).toHaveBeenCalledWith('/platform/login');
	});

	it('treats a session object with no token as unauthenticated', () => {
		localStorage.setItem('platformLoggedIn', JSON.stringify({ name: 'No token here' }));

		render(
			<MemoryRouter>
				<PlatformProtected>
					<div>Platform dashboard</div>
				</PlatformProtected>
			</MemoryRouter>
		);

		expect(screen.queryByText('Platform dashboard')).not.toBeInTheDocument();
	});
});
