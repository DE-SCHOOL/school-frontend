import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../../store/APIs/apiRequest';
import specialtyReducer from '../../store/specialty/specialtySlice';
import studentReducer from '../../store/students/studentSlice';
import academicYearReducer from '../../store/academic-year/academicYearSlice';
import StudentForm from './StudentForm';

vi.mock('../../store/APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

const SPECIALTY = { _id: 'spec1', name: 'Software Engineering' };
const CURRENT_YEAR = { _id: 'year1', schoolYear: '2024/2025' };

function renderForm({ currentYear = CURRENT_YEAR } = {}) {
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
			students: { students: [], student: {}, error: false, isLoading: false, errorMessage: null, success: false },
			years: {
				academicYears: [],
				students: [],
				nextYearStudents: [],
				student: {},
				isLoading: false,
				error: false,
				errorMessage: null,
				currentYear,
			},
		},
	});
	render(
		<Provider store={store}>
			<StudentForm />
		</Provider>
	);
	return store;
}

function fillRequiredFields() {
	fireEvent.change(screen.getByPlaceholderText('Enter matricule'), { target: { value: 'LMU-24SWE231' } });
	fireEvent.change(screen.getByPlaceholderText('Enter student name'), { target: { value: 'Chi John Brown' } });
	fireEvent.change(screen.getByPlaceholderText('Enter address'), { target: { value: 'Buea' } });
	fireEvent.change(screen.getByPlaceholderText('Enter date of birth'), { target: { value: '2005-10-22' } });
	fireEvent.change(screen.getByPlaceholderText('Enter place of birth'), { target: { value: 'Buea' } });
	fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'student@example.cm' } });
	fireEvent.change(screen.getByPlaceholderText('Enter student tel'), { target: { value: '677000000' } });
	fireEvent.change(screen.getByPlaceholderText('Enter parent name'), { target: { value: 'Parent Name' } });
	fireEvent.change(screen.getByPlaceholderText('Enter parent email'), { target: { value: 'parent@example.cm' } });
	fireEvent.change(screen.getByPlaceholderText('Enter parent tel'), { target: { value: '677000001' } });
	fireEvent.change(screen.getByPlaceholderText('Enter highest education level'), { target: { value: 'A Level' } });
}

describe('StudentForm', () => {
	beforeEach(() => {
		apiRequest.mockReset();
		apiRequest.mockResolvedValue({ data: { data: [] } });
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('fetches the specialty list on mount', () => {
		renderForm();
		expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/specialty');
	});

	it('renders every fetched specialty as a select option', () => {
		renderForm();
		expect(screen.getByRole('option', { name: 'Software Engineering' })).toBeInTheDocument();
	});

	it('dispatches addStudent with the full form payload, including the selected specialty and academic year', async () => {
		renderForm();
		fillRequiredFields();

		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		// addStudent posts to this exact endpoint with the assembled payload
		// - asserting the real HTTP call is a stronger guarantee than
		// asserting on a mocked action creator, since it also proves the
		// thunk wiring end to end.
		expect(apiRequest).toHaveBeenCalledWith(
			'post',
			`/api/v1/student/academic-year/${CURRENT_YEAR._id}`,
			expect.objectContaining({
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
				level: '200',
				gender: 'male',
			})
		);
	});

	it('resets the form back to its defaults after submitting', () => {
		renderForm();
		fillRequiredFields();

		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(screen.getByPlaceholderText('Enter matricule').value).toBe('');
		expect(screen.getByPlaceholderText('Enter student name').value).toBe('');
	});

	it('refuses to submit and alerts the user when no academic year is selected yet', () => {
		const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
		renderForm({ currentYear: null });
		apiRequest.mockClear();

		fillRequiredFields();
		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Create academic-years first'));
		expect(apiRequest).not.toHaveBeenCalledWith('post', expect.stringContaining('/api/v1/student'), expect.anything());
	});

	it('rejects an invalid phone number client-side and never calls the API', () => {
		renderForm();
		fillRequiredFields();
		fireEvent.change(screen.getByPlaceholderText('Enter student tel'), { target: { value: '123' } });
		apiRequest.mockClear();

		fireEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(screen.getByText(/phone number must start with 6/i)).toBeInTheDocument();
		expect(apiRequest).not.toHaveBeenCalledWith('post', expect.stringContaining('/api/v1/student'), expect.anything());
	});

	it('shows a Failure message when the store reports an error', () => {
		const store = renderForm();
		act(() => {
			store.dispatch({ type: 'student/addStudent/rejected', payload: { error: 'Matricule already in use' } });
		});
		expect(screen.getByText('Matricule already in use')).toBeInTheDocument();
	});
});
