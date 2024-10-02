import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase.config';
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	query,
	deleteDoc,
	getDoc,
	setDoc,
	where,
	orderBy,
	serverTimestamp,
} from 'firebase/firestore';

const initialState = {
	isLoading: false,
	error: false,
	errorMessage: null,
	success: false,
	groups: [],
	messages: [],
	group: {},
};

const messageSlice = createSlice({
	name: 'messaging',
	initialState,
	reducers: {
		createGroupInit(state) {
			state.isLoading = true;
			state.error = false;
		},
		createGroupSuccess(state, action) {
			state.isLoading = false;
			state.error = false;
			state.success = true;
		},
		createGroupFailed(state, action) {
			state.error = true;
			state.errorMessage = action.payload;
			state.isLoading = false;
		},
		groupCreated(state, action) {
			state.groups = action.payload;
			state.error = false;
			// state.isLoading = false;
		},
		deleteSuccess(state) {
			state.isLoading = false;
			state.error = false;
		},
		readGroupSuccess(state, action) {
			state.isLoading = false;
			state.error = false;
			state.group = action.payload;
		},
		clearGroup(state) {
			state.group = null;
		},
		clearMessage(state) {
			state.messages = [];
		},
		getMessagesSuccess(state, action) {
			state.messages = action.payload;
		},
	},
});

export const {
	createGroupFailed,
	createGroupInit,
	createGroupSuccess,
	groupCreated,
	deleteSuccess,
	readGroupSuccess,
	clearGroup,
	getMessagesSuccess,
	clearMessage,
} = messageSlice.actions;

export default messageSlice.reducer;

export const createGroup = (data) => async (dispatch) => {
	try {
		dispatch(createGroupInit());

		const colRef = collection(db, 'groups');
		await addDoc(colRef, data);

		dispatch(createGroupSuccess());
	} catch (err) {
		console.log('Error creating group: ', err);
		dispatch(createGroupFailed(err));
	}
};

export const getAllGroups = () => (dispatch) => {
	try {
		const colRef = collection(db, 'groups');
		const groupQuery = query(colRef);

		onSnapshot(groupQuery, (snapshot) => {
			if (!snapshot.empty) {
				let data = [];
				snapshot.forEach((snap) => {
					data.push({ id: snap.id, ...snap.data() });
				});

				dispatch(groupCreated(data));
			}
		});
	} catch (err) {
		console.log('Error getting groups info');
		dispatch(createGroupFailed(err));
	}
};

export const deleteGroup = (deleteId) => async (dispatch) => {
	try {
		dispatch(createGroupInit());

		const colRef = collection(db, 'groups');
		const docRef = doc(colRef, deleteId);
		await deleteDoc(docRef);

		dispatch(deleteSuccess());
	} catch (err) {
		console.log('Error deleting group', err);
		dispatch(createGroupFailed(err));
	}
};

export const getGroup = (id) => async (dispatch) => {
	try {
		dispatch(createGroupInit());
		const colRef = collection(db, 'groups');
		const docRef = doc(colRef, id);

		const group = (await getDoc(docRef)).data();

		dispatch(readGroupSuccess(group));
	} catch (err) {
		console.log('Error getting group', err);
		dispatch(createGroupFailed(err));
	}
};

export const editGroup = (id, data) => async (dispatch) => {
	try {
		dispatch(createGroupInit());

		const colRef = collection(db, 'groups');
		const docRef = doc(colRef, id);

		const group = await setDoc(docRef, data);

		dispatch(readGroupSuccess(group));
	} catch (err) {
		console.log('Error editing group information', err);
		dispatch(createGroupFailed(err));
	}
};

export const getAllGroupMessage = (id) => (dispatch) => {
	const colRef = collection(db, 'groupMessages');
	const getMessages = query(
		colRef,
		where('groupId', '==', id),
		orderBy('timestamp', 'asc')
	);

	const unsubscriber = onSnapshot(getMessages, (snapshot) => {
		let messages = [];
		if (!snapshot.empty) {
			snapshot.forEach((snap) => {
				messages.push({
					id: snap.id,
					...snap.data(),
					timestamp: snap.data()?.timestamp?.toDate()?.toISOString(),
				});
			});

			dispatch(getMessagesSuccess(messages));
		}
	});

	return unsubscriber;
};

export const sendMessage = (data) => async (dispatch) => {
	try {
		const colRef = collection(db, 'groupMessages');
		await addDoc(colRef, { ...data, timestamp: serverTimestamp() });
	} catch (err) {
		console.log('Error occurred while sending message', err);
	}
};
