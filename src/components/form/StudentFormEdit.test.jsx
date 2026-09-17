import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../../store/APIs/apiRequest';
import specialtyReducer from '../../store/specialty/specialtySlice';
import studentReducer from '../../store/students/studentSlice';
import academicYearReducer from '../../store/academic-year/academicYearSlice';
import StudentFormEdit from './StudentFormEdit';

vi.mock('../../store/APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => {
	const actual = await importOriginal();
	return { ...actual, useParams: () => ({ id: 'student1' }) };
});

const SPECIALTY = { _id: 'spec1', name: 'Software Engineering' };
const STUDENT = {
	_id: 'student1',
	matricule: 'LMU-24SWE231',
	name: 'Chi John Brown',
	address: 'Buea',
	dob: '2005-10-22',
	pob: 'Buea',
	email: 'student@example.cm',
	tel: '677000000',
	parent_name: 'Parent Name',
	parent_email: 'parent@example.cm',
	parent_tel: '677000001',
	entry_certificate: 'A Level',
	level: 300,
	gender: 'female',
	specialty: { _id: 'spec1' },
};

function renderForm() {
	const store = configureStore({
		reducer: { specialty: specialtyReducer, students: studentReducer, years: academicYearReducer },
		preloadedState: {
			specialty: {
				specialties: { data: [SPECIALTY] },
				isLoading: false,
				error: false,
				errorMessage: null,
				specialtyName: '',
				specialty: {},
			},
			students: {
				students: [],
				student: STUDENT,
				error: false,
				isLoading: false,
				errorMessage: null,
				success: false,
			},
			years: {
				academicYears: [],
				students: [],
				nextYearStudents: [],
				student: {},
				isLoading: false,
				error: false,
				errorMessage: null,
				currentYear: { _id: 'year1', schoolYear: '2024/2025' },
			},
		},
	});
	render(
		<Provider store={store}>
			<StudentFormEdit />
		</Provider>
	);
	return store;
}

describe('StudentFormEdit', () => {
	beforeEach(() => {
		apiRequest.mockReset();
		apiRequest.mockResolvedValue({ data: { data: [] } });
	});

	it('fetches the student and specialty list on mount', () => {
		renderForm();
		expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/specialty');
		expect(apiRequest).toHaveBeenCalledWith(
			'get',
			'/api/v1/student/student1/academic-year/year1'
		);
	});

	it('pre-selects the level option matching the fetched student', () => {
		renderForm();
		expect(screen.getByRole('option', { name: '300' }).selected).toBe(true);
	});

	it('pre-selects the gender option matching the fetched student', () => {
		renderForm();
		expect(screen.getByRole('option', { name: 'Female' }).selected).toBe(true);
	});

	it('dispatches editStudent with the edited payload on submit', () => {
		renderForm();
		fireEvent.change(screen.getByPlaceholderText('Enter matricule'), { target: { value: 'LMU-24SWE999' } });

		fireEvent.click(screen.getByRole('button', { name: /modify/i }));

		expect(apiRequest).toHaveBeenCalledWith(
			'patch',
			expect.stringContaining('student1'),
			expect.objectContaining({ matricule: 'LMU-24SWE999' })
		);
	});
});
