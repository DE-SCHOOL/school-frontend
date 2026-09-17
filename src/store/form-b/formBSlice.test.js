import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import formBReducer, {
	uploadStart,
	uploadProgressUpdate,
	uploadSuccess,
	createFormBFailed,
	createFormBCreated,
	getFormBsSuccess,
	getFormBsFailed,
	deleteFormBStart,
	deleteFormBRejected,
	deleteFormBSuccess,
	getAllFormBs,
	deleteFormB,
	uploadFile,
} from './formBSlice';

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
	return configureStore({ reducer: { formB: formBReducer } });
}

describe('formBSlice reducers', () => {
	it('uploadStart resets progress and sets both loading flags', () => {
		const store = makeStore();
		store.dispatch(uploadStart());
		const state = store.getState().formB;
		expect(state.isUploading).toBe(true);
		expect(state.isLoadingFormBs).toBe(true);
		expect(state.uploadProgress).toBe(0);
	});

	it('uploadProgressUpdate stores the given percentage', () => {
		const store = makeStore();
		store.dispatch(uploadProgressUpdate(55));
		expect(store.getState().formB.uploadProgress).toBe(55);
	});

	it('uploadSuccess completes the upload at 100%', () => {
		const store = makeStore();
		store.dispatch(uploadSuccess());
		expect(store.getState().formB.uploadProgress).toBe(100);
	});

	it('createFormBFailed records the error and resets upload state', () => {
		const store = makeStore();
		store.dispatch(createFormBFailed('Upload failed'));
		const state = store.getState().formB;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe('Upload failed');
	});

	it('createFormBCreated marks success and clears any prior error', () => {
		const store = makeStore();
		store.dispatch(createFormBFailed('prior error'));
		store.dispatch(createFormBCreated());
		const state = store.getState().formB;
		expect(state.uploadSuccess).toBe(true);
		expect(state.error).toBe(false);
	});

	it('getFormBsSuccess stores the list and clears loading/error', () => {
		const store = makeStore();
		store.dispatch(getFormBsSuccess([{ _id: '1' }]));
		const state = store.getState().formB;
		expect(state.formBs).toEqual([{ _id: '1' }]);
		expect(state.isLoadingFormBs).toBe(false);
	});

	it('getFormBsFailed records the error', () => {
		const store = makeStore();
		store.dispatch(getFormBsFailed('Could not load'));
		expect(store.getState().formB.errorMessage).toBe('Could not load');
	});

	it('delete lifecycle: start sets loading, rejected records error, success clears loading', () => {
		const store = makeStore();
		store.dispatch(deleteFormBStart());
		expect(store.getState().formB.isLoadingFormBs).toBe(true);
		store.dispatch(deleteFormBRejected('Could not delete'));
		expect(store.getState().formB.errorMessage).toBe('Could not delete');
		store.dispatch(deleteFormBSuccess());
		expect(store.getState().formB.isLoadingFormBs).toBe(false);
	});
});

describe('getAllFormBs thunk', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	it('fetches the real endpoint and dispatches the list on success', async () => {
		const store = makeStore();
		apiRequest.mockResolvedValue({ data: { data: [{ _id: '1' }] } });

		await store.dispatch(getAllFormBs());

		expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/form-b');
		expect(store.getState().formB.formBs).toEqual([{ _id: '1' }]);
	});

	it('dispatches a real server error message on failure', async () => {
		const store = makeStore();
		apiRequest.mockRejectedValue({ response: { data: { message: 'Not found' } } });
		await store.dispatch(getAllFormBs());
		expect(store.getState().formB.errorMessage).toBe('Not found');
	});
});

describe('deleteFormB thunk', () => {
	beforeEach(() => {
		apiRequest.mockReset();
		deleteObject.mockReset();
	});

	it('deletes the API record and the Firebase Storage file, then succeeds', async () => {
		const store = makeStore();
		apiRequest.mockResolvedValue({ data: {} });
		deleteObject.mockResolvedValue(undefined);

		await store.dispatch(deleteFormB({ id: '1', fileUrl: 'formb.pdf' }));

		expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/form-b/1');
		expect(deleteObject).toHaveBeenCalled();
		expect(store.getState().formB.isLoadingFormBs).toBe(false);
	});

	it('reports a real error if the API delete fails', async () => {
		const store = makeStore();
		apiRequest.mockRejectedValue({ response: { data: { message: 'Not authorized' } } });
		await store.dispatch(deleteFormB({ id: '1', fileUrl: 'formb.pdf' }));
		expect(store.getState().formB.errorMessage).toBe('Not authorized');
	});
});

describe('uploadFile thunk - duplicate detection', () => {
	beforeEach(() => {
		getMetadata.mockReset();
	});

	it('fails fast with a clear message when a form-b already exists at that path', async () => {
		const store = makeStore();
		getMetadata.mockResolvedValue({ size: 1234 });

		await store.dispatch(
			uploadFile({
				file: { blobFile: new Blob() },
				name: 'Form B',
				specialtyName: 'Software Engineering',
				level: 200,
				schoolYear: '2024/2025',
			})
		);

		const state = store.getState().formB;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toContain('already been uploaded');
	});
});
