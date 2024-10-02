import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../firebase.config';
import {
	deleteObject,
	getDownloadURL,
	getMetadata,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { apiRequest } from '../APIs/apiRequest';

const initialState = {
	uploadSuccess: false,
	errorMessage: null,
	error: false,
	isLoadingTimetables: false,
	timetables: [],
	timetable: {},
	isUploading: false,
	uploadError: null,
	uploadProgress: 0,
};

const timetableSlice = createSlice({
	name: 'timetable',
	initialState,
	reducers: {
		uploadStart: (state) => {
			state.isUploading = true;
			state.isLoadingTimetables = true;
			state.uploadProgress = 0;
		},
		uploadProgressUpdate: (state, action) => {
			state.uploadProgress = action.payload;
		},
		uploadSuccess: (state, action) => {
			state.isUploading = false;
			state.uploadProgress = 100;
		},
		createTimetableFailed: (state, action) => {
			state.isUploading = false;
			state.uploadProgress = 0;
			state.errorMessage = action.payload;
			state.error = true;
			state.isLoadingTimetables = false;
			state.uploadSuccess = false;
		},
		createTimetableCreated: (state) => {
			state.isUploading = false;
			state.isLoadingTimetables = false;
			state.uploadProgress = 0;
			state.error = false;
			state.errorMessage = null;
			state.uploadSuccess = true;
		},
		getTimetablesSuccess: (state, action) => {
			state.error = false;
			state.errorMessage = null;
			state.timetables = action.payload;
			state.isLoadingTimetables = false;
		},
		getTimetablesFailed: (state, action) => {
			state.errorMessage = action.payload;
			state.error = true;
			state.isLoadingTimetables = false;
			state.uploadSuccess = false;
		},
		getTimetablesPending: (state) => {
			state.isLoadingTimetables = true;
		},
		deleteTimetableStart: (state) => {
			state.isLoadingTimetables = true;
		},
		deleteTimetableRejected: (state, action) => {
			state.isLoadingTimetables = false;
			state.error = true;
			state.errorMessage = action.payload;
			state.uploadSuccess = false;
		},
		deleteTimetableSuccess: (state) => {
			state.isLoadingTimetables = false;
		},
	},
});

export const {
	uploadStart,
	uploadProgressUpdate,
	uploadSuccess,
	createTimetableCreated,
	createTimetableFailed,
	getTimetablesSuccess,
	getTimetablesFailed,
	deleteTimetableStart,
	deleteTimetableRejected,
	deleteTimetableSuccess,
} = timetableSlice.actions;
export default timetableSlice.reducer;

export const uploadFile = (data) => async (dispatch) => {
	dispatch(uploadStart());

	const timetableRef = ref(storage, 'timetables');
	const {
		file: { blobFile },
	} = data;

	const fileRef = ref(
		timetableRef,
		`${data.specialtyName}_${data.level}_${data.semester}_${data.schoolYear
			.split('/')
			.join('-')}.pdf`
	);

	try {
		await getMetadata(fileRef);
		throw new Error(
			`${data.specialtyName}_${data.level}_${data.semester}_${data.schoolYear
				.split('/')
				.join('-')} timetable has already been uploaded`
		);
	} catch (err) {
		if (err.code === 'storage/object-not-found') {
			const metadata = {
				contentType: 'application/pdf',
			};

			const uploadTask = uploadBytesResumable(fileRef, blobFile, metadata);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(Number(snapshot.bytesTransferred) / Number(snapshot.totalBytes)) *
						100;
					console.log('Upload is ' + progress + '% done');
					dispatch(uploadProgressUpdate(progress));
				},
				(error) => {
					// Handle unsuccessful uploads
					console.log('An error occurred uploading the file', error);
					dispatch(
						createTimetableFailed(
							'Timetable failed to upload, check your internet connection'
						)
					);
				},
				async () => {
					try {
						const downloadLink = await getDownloadURL(uploadTask.snapshot.ref);
						await apiRequest('post', '/api/v1/timetable', {
							downloadUrl: downloadLink,
							...data,
							file: undefined,
							specialtyName: undefined,
							schoolYear: undefined,
						});

						dispatch(createTimetableCreated());
					} catch (err) {
						const error =
							err?.response?.data?.message || 'Something went wrong';
						dispatch(createTimetableFailed(error));
					}
				}
			);
		} else {
			dispatch(createTimetableFailed(err.message));
		}
	}
};

export const getAllTimetables = () => async (dispatch) => {
	try {
		const res = await apiRequest('get', '/api/v1/timetable');
		dispatch(getTimetablesSuccess(res.data.data));
	} catch (err) {
		const error = err?.response?.data?.message || 'Something went wrong';
		console.log(err);
		dispatch(getTimetablesFailed(error));
	}
};

export const deleteTimetable =
	({ id, fileUrl }) =>
	async (dispatch) => {
		dispatch(deleteTimetableStart());
		try {
			const timetableFileRef = ref(storage, `timetables/${fileUrl}`);
			const res = await apiRequest('delete', `/api/v1/timetable/${id}`);
			await deleteObject(timetableFileRef);

			// console.log(res);
			return dispatch(deleteTimetableSuccess());
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			console.log(err);
			return dispatch(deleteTimetableRejected(error));
		}
	};
