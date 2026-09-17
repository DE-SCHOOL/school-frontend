import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../../store/APIs/apiRequest';
import staffReducer from '../../store/staffs/staffSlice';
import TeacherForm from './TeacherForm';

vi.mock('../../store/APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function renderForm() {
	const store = configureStore({ reducer: { staffs: staffReducer } });
	render(
		<Provider store={store}>
			<TeacherForm />
		</Provider>
	);
	return store;
}

function fillRequiredFields({ password = 'password123', confirmPassword = 'password123', tel = '677000000' } = {}) {
	fireEvent.change(screen.getByPlaceholderText('Enter staff fullnames'), { target: { value: 'New Staff' } });
	fireEvent.change(screen.getByPlaceholderText('Enter staff address'), { target: { value: 'Buea' } });
	fireEvent.change(screen.getByPlaceholderText('Enter staff matricule'), { target: { value: 'S-001' } });
	fireEvent.change(screen.getByPlaceholderText('Enter staff Date of birth'), { target: { value: '1990-01-01' } });
	fireEvent.change(screen.getByPlaceholderText('Enter staff Place of birth'), { target: { value: 'Buea' } });
	fireEvent.change(screen.getByPlaceholderText('Enter staff phone number'), { target: { value: tel } });
	fireEvent.change(screen.getByPlaceholderText('Enter staff highest certificate'), { target: { value: 'BSc' } });
	fireEvent.change(screen.getByPlaceholderText('Enter staff email'), { target: { value: 'staff@school.cm' } });
	fireEvent.change(screen.getByPlaceholderText('Enter staff password'), { target: { value: password } });
	fireEvent.change(screen.getByPlaceholderText('Confirm staff password'), { target: { value: confirmPassword } });
}

describe('TeacherForm', () => {
	beforeEach(() => {
		apiRequest.mockReset();
		apiRequest.mockResolvedValue({ data: {} });
	});

	it('dispatches addStaff with the full form payload when everything is valid', () => {
		renderForm();
		fillRequiredFields();

		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(apiRequest).toHaveBeenCalledWith(
			'post',
			'/api/v1/staff/register',
			expect.objectContaining({
				name: 'New Staff',
				address: 'Buea',
				matricule: 'S-001',
				email: 'staff@school.cm',
				password: 'password123',
				confirmPassword: 'password123',
			})
		);
	});

	// Real bug found and fixed while writing this test: the form
	// previously never checked password === confirmPassword client-side
	// at all - a mismatch was only ever caught by the backend, after a
	// full round trip.
	it('refuses to submit when password and confirm password do not match', () => {
		renderForm();
		fillRequiredFields({ password: 'password123', confirmPassword: 'somethingElse123' });

		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(screen.getByText(/do not match/i)).toBeInTheDocument();
		expect(apiRequest).not.toHaveBeenCalled();
	});

	it('rejects an invalid phone number client-side', () => {
		renderForm();
		fillRequiredFields({ tel: '512' });

		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(screen.getByText(/phone number must start with 6/i)).toBeInTheDocument();
		expect(apiRequest).not.toHaveBeenCalled();
	});

	it('rejects a password shorter than 8 characters', () => {
		renderForm();
		fillRequiredFields({ password: 'short', confirmPassword: 'short' });

		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
		expect(apiRequest).not.toHaveBeenCalled();
	});

	it('resets the form after a successful, valid submission', () => {
		renderForm();
		fillRequiredFields();

		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(screen.getByPlaceholderText('Enter staff fullnames').value).toBe('');
	});
});
