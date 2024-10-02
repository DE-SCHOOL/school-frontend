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
	isLoadingFormBs: false,
	formBs: [],
	formB: {},
	isUploading: false,
	uploadError: null,
	uploadProgress: 0,
};

const formBSlice = createSlice({
	name: 'formb',
	initialState,
	reducers: {
		uploadStart: (state) => {
			state.isUploading = true;
			state.isLoadingFormBs = true;
			state.uploadProgress = 0;
		},
		uploadProgressUpdate: (state, action) => {
			state.uploadProgress = action.payload;
		},
		uploadSuccess: (state, action) => {
			state.isUploading = false;
			state.uploadProgress = 100;
		},
		createFormBFailed: (state, action) => {
			state.isUploading = false;
			state.uploadProgress = 0;
			state.errorMessage = action.payload;
			state.error = true;
			state.isLoadingFormBs = false;
			state.uploadSuccess = false;
		},
		createFormBCreated: (state) => {
			state.isUploading = false;
			state.isLoadingFormBs = false;
			state.uploadProgress = 0;
			state.error = false;
			state.errorMessage = null;
			state.uploadSuccess = true;
		},
		getFormBsSuccess: (state, action) => {
			state.error = false;
			state.errorMessage = null;
			state.formBs = action.payload;
			state.isLoadingFormBs = false;
		},
		getFormBsFailed: (state, action) => {
			state.errorMessage = action.payload;
			state.error = true;
			state.isLoadingFormBs = false;
			state.uploadSuccess = false;
		},
		getFormBsPending: (state) => {
			state.isLoadingFormBs = true;
		},
		deleteFormBStart: (state) => {
			state.isLoadingFormBs = true;
		},
		deleteFormBRejected: (state, action) => {
			state.isLoadingFormBs = false;
			state.error = true;
			state.errorMessage = action.payload;
			state.uploadSuccess = false;
		},
		deleteFormBSuccess: (state) => {
			state.isLoadingFormBs = false;
		},
	},
});

export const {
	uploadStart,
	uploadProgressUpdate,
	uploadSuccess,
	createFormBCreated,
	createFormBFailed,
	getFormBsSuccess,
	getFormBsFailed,
	deleteFormBStart,
	deleteFormBRejected,
	deleteFormBSuccess,
} = formBSlice.actions;
export default formBSlice.reducer;

export const uploadFile = (data) => async (dispatch) => {
	dispatch(uploadStart());

	const formBRef = ref(storage, 'formbs');
	const {
		file: { blobFile },
	} = data;

	const fileRef = ref(
		formBRef,
		`${data.name}_${data.specialtyName}_${data.level}_${data.schoolYear
			.split('/')
			.join('-')}.pdf`
	);

	try {
		await getMetadata(fileRef);
		throw new Error(
			`${data.specialtyName}_${data.level}_${data.schoolYear
				.split('/')
				.join('-')} form B has already been uploaded`
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
						createFormBFailed(
							'Form B failed to upload, check your internet connection'
						)
					);
				},
				async () => {
					try {
						const downloadLink = await getDownloadURL(uploadTask.snapshot.ref);
						await apiRequest('post', '/api/v1/form-b', {
							downloadUrl: downloadLink,
							...data,
							file: undefined,
							specialtyName: undefined,
							schoolYear: undefined,
						});

						dispatch(createFormBCreated());
					} catch (err) {
						const error =
							err?.response?.data?.message || 'Something went wrong';
						dispatch(createFormBFailed(error));
					}
				}
			);
		} else {
			dispatch(createFormBFailed(err.message));
		}
	}
};

export const getAllFormBs = () => async (dispatch) => {
	try {
		const res = await apiRequest('get', '/api/v1/form-b');
		dispatch(getFormBsSuccess(res.data.data));
	} catch (err) {
		const error = err?.response?.data?.message || 'Something went wrong';
		console.log(err);
		dispatch(getFormBsFailed(error));
	}
};

export const deleteFormB =
	({ id, fileUrl }) =>
	async (dispatch) => {
		dispatch(deleteFormBStart());
		try {
			const formBFileRef = ref(storage, `formb/${fileUrl}`);
			const res = await apiRequest('delete', `/api/v1/form-b/${id}`);
			await deleteObject(formBFileRef);

			// console.log(res);
			return dispatch(deleteFormBSuccess());
		} catch (err) {
			const error = err?.response?.data?.message || 'Something went wrong';
			console.log(err);
			return dispatch(deleteFormBRejected(error));
		}
	};
