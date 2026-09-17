import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import timetableReducer, {
	uploadStart,
	uploadProgressUpdate,
	uploadSuccess,
	createTimetableFailed,
	createTimetableCreated,
	getTimetablesSuccess,
	getTimetablesFailed,
	deleteTimetableStart,
	deleteTimetableRejected,
	deleteTimetableSuccess,
	getAllTimetables,
	deleteTimetable,
	uploadFile,
} from './timetableSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));
vi.mock('../../firebase.config', () => ({ storage: {} }));
vi.mock('firebase/storage', () => ({
	ref: vi.fn(() => ({})),
	uploadBytesResumable: vi.fn(),
	getDownloadURL: vi.fn(),
	getMetadata: vi.fn(),
	deleteObject: vi.fn(),
}));

import { deleteObject, getMetadata } from 'firebase/storage';

function makeStore() {
	return configureStore({ reducer: { timetable: timetableReducer } });
}

describe('timetableSlice reducers', () => {
	it('uploadStart resets progress and sets both loading flags', () => {
		const store = makeStore();
		store.dispatch(uploadStart());
		const state = store.getState().timetable;
		expect(state.isUploading).toBe(true);
		expect(state.isLoadingTimetables).toBe(true);
		expect(state.uploadProgress).toBe(0);
	});

	it('uploadProgressUpdate stores the given percentage', () => {
		const store = makeStore();
		store.dispatch(uploadProgressUpdate(42));
		expect(store.getState().timetable.uploadProgress).toBe(42);
	});

	it('uploadSuccess completes the upload at 100%', () => {
		const store = makeStore();
		store.dispatch(uploadSuccess());
		const state = store.getState().timetable;
		expect(state.isUploading).toBe(false);
		expect(state.uploadProgress).toBe(100);
	});

	it('createTimetableFailed records the error and resets upload state', () => {
		const store = makeStore();
		store.dispatch(createTimetableFailed('Upload failed'));
		const state = store.getState().timetable;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe('Upload failed');
		expect(state.isUploading).toBe(false);
		expect(state.uploadSuccess).toBe(false);
	});

	it('createTimetableCreated marks success and clears any prior error', () => {
		const store = makeStore();
		store.dispatch(createTimetableFailed('prior error'));
		store.dispatch(createTimetableCreated());
		const state = store.getState().timetable;
		expect(state.uploadSuccess).toBe(true);
		expect(state.error).toBe(false);
		expect(state.errorMessage).toBeNull();
	});

	it('getTimetablesSuccess stores the list and clears loading/error', () => {
		const store = makeStore();
		const timetables = [{ _id: '1' }];
		store.dispatch(getTimetablesSuccess(timetables));
		const state = store.getState().timetable;
		expect(state.timetables).toEqual(timetables);
		expect(state.isLoadingTimetables).toBe(false);
		expect(state.error).toBe(false);
	});

	it('getTimetablesFailed records the error', () => {
		const store = makeStore();
		store.dispatch(getTimetablesFailed('Could not load'));
		const state = store.getState().timetable;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe('Could not load');
	});

	it('delete lifecycle: start sets loading, rejected records error, success clears loading', () => {
		const store = makeStore();
		store.dispatch(deleteTimetableStart());
		expect(store.getState().timetable.isLoadingTimetables).toBe(true);

		store.dispatch(deleteTimetableRejected('Could not delete'));
		expect(store.getState().timetable.error).toBe(true);
		expect(store.getState().timetable.errorMessage).toBe('Could not delete');

		store.dispatch(deleteTimetableSuccess());
		expect(store.getState().timetable.isLoadingTimetables).toBe(false);
	});
});

describe('getAllTimetables thunk', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	it('fetches the real endpoint and dispatches the list on success', async () => {
		const store = makeStore();
		const timetables = [{ _id: '1' }];
		apiRequest.mockResolvedValue({ data: { data: timetables } });

		await store.dispatch(getAllTimetables());

		expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/timetable');
		expect(store.getState().timetable.timetables).toEqual(timetables);
	});

	it('dispatches a real server error message on failure', async () => {
		const store = makeStore();
		apiRequest.mockRejectedValue({ response: { data: { message: 'Not found' } } });

		await store.dispatch(getAllTimetables());

		expect(store.getState().timetable.errorMessage).toBe('Not found');
	});
});

describe('deleteTimetable thunk', () => {
	beforeEach(() => {
		apiRequest.mockReset();
		deleteObject.mockReset();
	});

	it('deletes the API record and the Firebase Storage file, then succeeds', async () => {
		const store = makeStore();
		apiRequest.mockResolvedValue({ data: {} });
		deleteObject.mockResolvedValue(undefined);

		await store.dispatch(deleteTimetable({ id: '1', fileUrl: 'timetable.pdf' }));

		expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/timetable/1');
		expect(deleteObject).toHaveBeenCalled();
		expect(store.getState().timetable.isLoadingTimetables).toBe(false);
		expect(store.getState().timetable.error).toBe(false);
	});

	it('reports a real error if the API delete fails', async () => {
		const store = makeStore();
		apiRequest.mockRejectedValue({ response: { data: { message: 'Not authorized' } } });

		await store.dispatch(deleteTimetable({ id: '1', fileUrl: 'timetable.pdf' }));

		expect(store.getState().timetable.error).toBe(true);
		expect(store.getState().timetable.errorMessage).toBe('Not authorized');
	});
});

// uploadFile's full progress-tracked upload path (uploadBytesResumable's
// event-based .on() callbacks) wraps the Firebase Storage SDK directly
// and isn't covered here - the one meaningfully testable branch without
// reimplementing that SDK's event machinery is the "already uploaded"
// duplicate-detection check up front, which is real application logic.
describe('uploadFile thunk - duplicate detection', () => {
	beforeEach(() => {
		getMetadata.mockReset();
	});

	it('fails fast with a clear message when a file already exists at that path', async () => {
		const store = makeStore();
		getMetadata.mockResolvedValue({ size: 1234 }); // file exists

		await store.dispatch(
			uploadFile({
				file: { blobFile: new Blob() },
				name: 'Timetable',
				specialtyName: 'Software Engineering',
				level: 200,
				semester: 's1',
				schoolYear: '2024/2025',
			})
		);

		const state = store.getState().timetable;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toContain('already been uploaded');
		expect(state.isUploading).toBe(false);
	});
});
