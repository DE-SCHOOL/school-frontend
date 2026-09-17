import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../../store/APIs/apiRequest';
import demoRequestReducer from '../../store/demo-request/demoRequestSlice';
import BookDemo from './BookDemo';

vi.mock('../../store/APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function renderBookDemo() {
	const store = configureStore({ reducer: { demoRequest: demoRequestReducer } });
	render(
		<Provider store={store}>
			<MemoryRouter>
				<BookDemo />
			</MemoryRouter>
		</Provider>
	);
}

describe('BookDemo', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	it('submits the filled-in form to the public demo-request endpoint, without credentials', async () => {
		apiRequest.mockResolvedValue({ data: { data: { _id: '1' } } });
		renderBookDemo();

		fireEvent.change(screen.getByPlaceholderText('Full name'), { target: { value: 'Marie Ngu' } });
		fireEvent.change(screen.getByPlaceholderText(/Landmark Metropolitan/), {
			target: { value: 'Bright Future Academy' },
		});
		fireEvent.change(screen.getByPlaceholderText('you@school.cm'), { target: { value: 'marie@school.cm' } });
		fireEvent.click(screen.getByRole('button', { name: /request my demo/i }));

		await vi.waitFor(() =>
			expect(apiRequest).toHaveBeenCalledWith(
				'post',
				'/api/v1/platform/demo-requests',
				expect.objectContaining({
					name: 'Marie Ngu',
					schoolName: 'Bright Future Academy',
					contactEmail: 'marie@school.cm',
				}),
				false
			)
		);
	});

	it('shows a confirmation screen after a successful submission', async () => {
		apiRequest.mockResolvedValue({ data: { data: { _id: '1' } } });
		renderBookDemo();

		fireEvent.change(screen.getByPlaceholderText('Full name'), { target: { value: 'Marie Ngu' } });
		fireEvent.change(screen.getByPlaceholderText(/Landmark Metropolitan/), { target: { value: 'Bright Future' } });
		fireEvent.change(screen.getByPlaceholderText('you@school.cm'), { target: { value: 'marie@school.cm' } });
		fireEvent.click(screen.getByRole('button', { name: /request my demo/i }));

		expect(await screen.findByText(/we'll be in touch/i)).toBeInTheDocument();
	});

	it('shows the real server error message on failure and stays on the form', async () => {
		apiRequest.mockRejectedValue({ response: { data: { message: 'Contact email is required' } } });
		renderBookDemo();

		fireEvent.change(screen.getByPlaceholderText('Full name'), { target: { value: 'Marie Ngu' } });
		fireEvent.change(screen.getByPlaceholderText(/Landmark Metropolitan/), { target: { value: 'Bright Future' } });
		fireEvent.change(screen.getByPlaceholderText('you@school.cm'), { target: { value: 'marie@school.cm' } });
		fireEvent.click(screen.getByRole('button', { name: /request my demo/i }));

		expect(await screen.findByText('Contact email is required')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /request my demo/i })).toBeInTheDocument();
	});
});
