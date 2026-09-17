import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import messagingReducer, {
	createGroupInit,
	createGroupSuccess,
	createGroupFailed,
	groupCreated,
	deleteSuccess,
	readGroupSuccess,
	clearGroup,
	clearMessage,
	getMessagesSuccess,
	createGroup,
	deleteGroup,
	getGroup,
	editGroup,
	sendMessage,
} from './messagingSlice';

vi.mock('../../firebase.config', () => ({ db: {} }));
vi.mock('firebase/firestore', () => ({
	addDoc: vi.fn(),
	collection: vi.fn(() => ({})),
	doc: vi.fn(() => ({})),
	onSnapshot: vi.fn(),
	query: vi.fn(() => ({})),
	deleteDoc: vi.fn(),
	getDoc: vi.fn(),
	setDoc: vi.fn(),
	where: vi.fn(),
	orderBy: vi.fn(),
	serverTimestamp: vi.fn(() => 'mock-timestamp'),
}));

import { addDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

function makeStore() {
	return configureStore({ reducer: { groupChat: messagingReducer } });
}

describe('messagingSlice reducers', () => {
	it('createGroupInit sets isLoading and clears error', () => {
		const store = makeStore();
		store.dispatch(createGroupFailed(new Error('x')));
		store.dispatch(createGroupInit());
		const state = store.getState().groupChat;
		expect(state.isLoading).toBe(true);
		expect(state.error).toBe(false);
	});

	it('createGroupSuccess marks success and clears loading', () => {
		const store = makeStore();
		store.dispatch(createGroupSuccess());
		const state = store.getState().groupChat;
		expect(state.isLoading).toBe(false);
		expect(state.success).toBe(true);
	});

	it('createGroupFailed records the error payload', () => {
		const store = makeStore();
		const err = new Error('Firestore unavailable');
		store.dispatch(createGroupFailed(err));
		const state = store.getState().groupChat;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe(err);
	});

	it('groupCreated stores the group list', () => {
		const store = makeStore();
		store.dispatch(groupCreated([{ id: '1' }]));
		expect(store.getState().groupChat.groups).toEqual([{ id: '1' }]);
	});

	it('deleteSuccess clears loading/error', () => {
		const store = makeStore();
		store.dispatch(deleteSuccess());
		const state = store.getState().groupChat;
		expect(state.isLoading).toBe(false);
		expect(state.error).toBe(false);
	});

	it('readGroupSuccess stores the fetched group', () => {
		const store = makeStore();
		store.dispatch(readGroupSuccess({ name: 'Class A' }));
		expect(store.getState().groupChat.group).toEqual({ name: 'Class A' });
	});

	it('clearGroup nulls the current group', () => {
		const store = makeStore();
		store.dispatch(readGroupSuccess({ name: 'Class A' }));
		store.dispatch(clearGroup());
		expect(store.getState().groupChat.group).toBeNull();
	});

	it('clearMessage empties the messages list', () => {
		const store = makeStore();
		store.dispatch(getMessagesSuccess([{ id: 'm1' }]));
		store.dispatch(clearMessage());
		expect(store.getState().groupChat.messages).toEqual([]);
	});

	it('getMessagesSuccess stores the messages list', () => {
		const store = makeStore();
		store.dispatch(getMessagesSuccess([{ id: 'm1' }]));
		expect(store.getState().groupChat.messages).toEqual([{ id: 'm1' }]);
	});
});

describe('createGroup thunk', () => {
	beforeEach(() => {
		addDoc.mockReset();
	});

	it('adds a Firestore document and marks success', async () => {
		const store = makeStore();
		addDoc.mockResolvedValue({ id: 'g1' });

		await store.dispatch(createGroup({ name: 'Class A' }));

		expect(addDoc).toHaveBeenCalled();
		expect(store.getState().groupChat.success).toBe(true);
	});

	it('reports failure via createGroupFailed on a Firestore error', async () => {
		const store = makeStore();
		const err = new Error('permission-denied');
		addDoc.mockRejectedValue(err);

		await store.dispatch(createGroup({ name: 'Class A' }));

		const state = store.getState().groupChat;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe(err);
	});
});

describe('deleteGroup thunk', () => {
	beforeEach(() => {
		deleteDoc.mockReset();
	});

	it('deletes the document and marks success', async () => {
		const store = makeStore();
		deleteDoc.mockResolvedValue(undefined);

		await store.dispatch(deleteGroup('g1'));

		expect(deleteDoc).toHaveBeenCalled();
		expect(store.getState().groupChat.error).toBe(false);
	});
});

describe('getGroup thunk', () => {
	beforeEach(() => {
		getDoc.mockReset();
	});

	it('fetches the document and stores its data', async () => {
		const store = makeStore();
		getDoc.mockResolvedValue({ data: () => ({ name: 'Class A' }) });

		await store.dispatch(getGroup('g1'));

		expect(store.getState().groupChat.group).toEqual({ name: 'Class A' });
	});
});

describe('editGroup thunk', () => {
	beforeEach(() => {
		setDoc.mockReset();
	});

	it('writes the document via setDoc', async () => {
		const store = makeStore();
		setDoc.mockResolvedValue(undefined);

		await store.dispatch(editGroup('g1', { name: 'Renamed' }));

		expect(setDoc).toHaveBeenCalled();
	});
});

describe('sendMessage thunk', () => {
	beforeEach(() => {
		addDoc.mockReset();
	});

	it('adds the message document with a server timestamp', async () => {
		const store = makeStore();
		addDoc.mockResolvedValue({ id: 'm1' });

		await store.dispatch(sendMessage({ groupId: 'g1', text: 'Hello' }));

		expect(addDoc).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({ groupId: 'g1', text: 'Hello', timestamp: 'mock-timestamp' })
		);
	});

	it('dispatches a failure instead of silently swallowing a send error', async () => {
		const store = makeStore();
		const err = new Error('network down');
		addDoc.mockRejectedValue(err);

		await store.dispatch(sendMessage({ groupId: 'g1', text: 'Hello' }));

		const state = store.getState().groupChat;
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe(err);
	});
});
