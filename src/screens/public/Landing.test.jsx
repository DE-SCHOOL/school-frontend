import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Landing from './Landing';

describe('Landing', () => {
	it('renders the DE-SCHOOL wordmark and links to book-demo and staff/student login', () => {
		render(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		);

		expect(screen.getAllByText('DE-SCHOOL').length).toBeGreaterThan(0);

		const demoLinks = screen.getAllByRole('link', { name: /book a (free )?demo/i });
		expect(demoLinks.length).toBeGreaterThan(0);
		demoLinks.forEach((link) => expect(link).toHaveAttribute('href', '/book-demo'));

		const loginLinks = screen.getAllByRole('link', { name: /staff \/ student login/i });
		expect(loginLinks.length).toBeGreaterThan(0);
		loginLinks.forEach((link) => expect(link).toHaveAttribute('href', '/auth/signin'));
	});

	it('mentions Stellar as the payment differentiator', () => {
		render(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		);
		expect(screen.getAllByText(/stellar/i).length).toBeGreaterThan(0);
	});
});
