import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../../store/APIs/apiRequest';
import staffReducer from '../../store/staffs/staffSlice';
import TeacherFormEdit from './TeacherFormEdit';

vi.mock('../../store/APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => {
	const actual = await importOriginal();
	return { ...actual, useParams: () => ({ id: 'staff1' }) };
});

const TEACHER = {
	_id: 'staff1',
	matricule: 'S-001',
	name: 'Existing Staff',
	address: 'Buea',
	dob: '1990-01-01',
	pob: 'Buea',
	email: 'staff@school.cm',
	tel: '677000000',
	high_certificate: 'BSc',
	gender: 'female',
	marital_status: 'not married',
	role: 'lecturer',
};

function renderForm() {
	const store = configureStore({
		reducer: { staffs: staffReducer },
		preloadedState: {
			staffs: { teachers: [], error: false, isLoading: false, errorMessage: null, teacher: TEACHER },
		},
	});
	render(
		<Provider store={store}>
			<TeacherFormEdit />
		</Provider>
	);
	return store;
}

describe('TeacherFormEdit', () => {
	beforeEach(() => {
		apiRequest.mockReset();
		apiRequest.mockResolvedValue({ data: {} });
	});

	it('fetches the staff record on mount', () => {
		renderForm();
		expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/staff/staff1');
	});

	it('pre-selects the gender option matching the fetched staff record', () => {
		renderForm();
		expect(screen.getByRole('option', { name: 'Female' }).selected).toBe(true);
	});

	it('pre-selects the marital status option matching the fetched staff record', () => {
		renderForm();
		expect(screen.getByRole('option', { name: 'Not Married' }).selected).toBe(true);
	});

	it('dispatches editStaff with the edited payload on submit', () => {
		renderForm();
		fireEvent.change(screen.getByPlaceholderText('Enter staff fullnames'), { target: { value: 'Renamed Staff' } });

		fireEvent.click(screen.getByRole('button', { name: /modify/i }));

		expect(apiRequest).toHaveBeenCalledWith(
			'patch',
			'/api/v1/staff/staff1',
			expect.objectContaining({ name: 'Renamed Staff' })
		);
	});
});
