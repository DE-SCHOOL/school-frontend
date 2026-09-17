import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { platformApiRequest } from '../APIs/platformApiRequest';
import platformReducer, {
	getDemoRequests,
	setDemoRequestStatus,
	getSchools,
	setSchoolStatus,
	createSchool,
	clearLastCreatedSchool,
} from './platformSlice';

vi.mock('../APIs/platformApiRequest', () => ({ platformApiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { platform: platformReducer } });
}

describe('platformSlice', () => {
	beforeEach(() => {
		platformApiRequest.mockReset();
	});

	describe('getDemoRequests', () => {
		it('fetches and stores the demo request list', async () => {
			const store = makeStore();
			const requests = [{ _id: '1', schoolName: 'Bright Future' }];
			platformApiRequest.mockResolvedValue({ data: { data: requests } });

			await store.dispatch(getDemoRequests());

			expect(platformApiRequest).toHaveBeenCalledWith('get', '/api/v1/platform/demo-requests');
			expect(store.getState().platform.demoRequests).toEqual(requests);
		});

		it('sets a real server error message on failure', async () => {
			const store = makeStore();
			platformApiRequest.mockRejectedValue({ response: { data: { message: 'Forbidden' } } });
			await store.dispatch(getDemoRequests());
			expect(store.getState().platform.errorMessage).toBe('Forbidden');
		});
	});

	describe('setDemoRequestStatus', () => {
		it('updates only the matching demo request in place, by _id', async () => {
			const store = configureStore({
				reducer: { platform: platformReducer },
				preloadedState: {
					platform: {
						demoRequests: [
							{ _id: '1', status: 'lead' },
							{ _id: '2', status: 'lead' },
						],
						schools: [],
						isLoading: false,
						error: false,
						errorMessage: null,
						lastCreatedSchool: null,
					},
				},
			});
			platformApiRequest.mockResolvedValue({ data: { data: { _id: '1', status: 'demo_scheduled' } } });

			await store.dispatch(setDemoRequestStatus({ id: '1', status: 'demo_scheduled' }));

			expect(platformApiRequest).toHaveBeenCalledWith('patch', '/api/v1/platform/demo-requests/1', {
				status: 'demo_scheduled',
			});
			expect(store.getState().platform.demoRequests).toEqual([
				{ _id: '1', status: 'demo_scheduled' },
				{ _id: '2', status: 'lead' },
			]);
		});
	});

	describe('getSchools', () => {
		it('fetches and stores the school list', async () => {
			const store = makeStore();
			const schools = [{ _id: '1', name: 'LMU' }];
			platformApiRequest.mockResolvedValue({ data: { data: schools } });

			await store.dispatch(getSchools());

			expect(platformApiRequest).toHaveBeenCalledWith('get', '/api/v1/platform/schools');
			expect(store.getState().platform.schools).toEqual(schools);
		});
	});

	describe('setSchoolStatus', () => {
		it('updates only the matching school in place, by _id', async () => {
			const store = configureStore({
				reducer: { platform: platformReducer },
				preloadedState: {
					platform: {
						demoRequests: [],
						schools: [
							{ _id: '1', status: 'active' },
							{ _id: '2', status: 'active' },
						],
						isLoading: false,
						error: false,
						errorMessage: null,
						lastCreatedSchool: null,
					},
				},
			});
			platformApiRequest.mockResolvedValue({ data: { data: { _id: '2', status: 'suspended' } } });

			await store.dispatch(setSchoolStatus({ id: '2', status: 'suspended' }));

			expect(store.getState().platform.schools).toEqual([
				{ _id: '1', status: 'active' },
				{ _id: '2', status: 'suspended' },
			]);
		});
	});

	describe('createSchool', () => {
		it('prepends the new school to the list and records it as lastCreatedSchool', async () => {
			const store = makeStore();
			const school = { _id: '1', name: 'New School', slug: 'new-school' };
			platformApiRequest.mockResolvedValue({ data: { data: school } });

			await store.dispatch(createSchool({ name: 'New School', slug: 'new-school' }));

			expect(platformApiRequest).toHaveBeenCalledWith('post', '/api/v1/platform/schools', {
				name: 'New School',
				slug: 'new-school',
			});
			const state = store.getState().platform;
			expect(state.schools).toEqual([school]);
			expect(state.lastCreatedSchool).toEqual(school);
		});

		it('clears any prior error while pending', () => {
			const store = makeStore();
			platformApiRequest.mockReturnValue(new Promise(() => {}));
			store.dispatch(createSchool({}));
			const state = store.getState().platform;
			expect(state.isLoading).toBe(true);
			expect(state.error).toBe(false);
			expect(state.errorMessage).toBeNull();
		});

		it('sets a real server error message on failure (e.g. duplicate slug)', async () => {
			const store = makeStore();
			platformApiRequest.mockRejectedValue({ response: { data: { message: 'Slug already in use' } } });
			await store.dispatch(createSchool({ slug: 'taken' }));
			expect(store.getState().platform.errorMessage).toBe('Slug already in use');
		});
	});

	describe('clearLastCreatedSchool', () => {
		it('resets lastCreatedSchool to null', async () => {
			const store = makeStore();
			platformApiRequest.mockResolvedValue({ data: { data: { _id: '1' } } });
			await store.dispatch(createSchool({}));
			expect(store.getState().platform.lastCreatedSchool).not.toBeNull();

			store.dispatch(clearLastCreatedSchool());

			expect(store.getState().platform.lastCreatedSchool).toBeNull();
		});
	});
});
