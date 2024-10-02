import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TableFormB } from '../../../components/tables/';
import DeleteModal from '../../../components/mod/DeleteModal';
import Loader from './../../../components/loaders/Loader';
import { getAllFormBs } from '../../../store/form b/formBSlice';

const timetableHeader = {
	name: 'name',
	level: 'class',
	specialty: 'specialty',
	downloadUrl: 'download',
	semester: 'semester',
	academicYear: 'year',
	acts: 'actions',
};

function FormBList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const formBs = useSelector((state) => state.formB.formBs);
	const uiState = useSelector((state) => state.uiState.deleteOpt);
	const isLoading = useSelector((state) => state.formB.isLoadingFormBs);

	//saving the student data in a useState
	const [formBData, setFormBData] = useState(formBs);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(10);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getAllFormBs());
	}, [dispatch]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Form B's" main="Form B" sub="List" />

			{/* Displaying search filter only if student data has fully loaded */}
			{formBs.length !== 0 && (
				<SearchCategory
					styles={'mg-top-md mg-bt-md'}
					dropDown="specialty"
					data={formBs}
					setData={setFormBData}
				/>
			)}
			<section className="students mg-top-md">
				{/* Section About, Download, Add, and Refresh */}
				<SectionMainIntro
					title="Form B's"
					styles="mg-bt mg-top"
					link={'/form bs/upload-form-bs'}
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{formBs.length !== 0 && (
					<TableFormB
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={formBData.length !== 0 ? formBData : formBs}
						header={timetableHeader}
						paggingNum={numPages}
					/>
				)}

				{/* Show student table information only if formBs data has loaded */}
				{formBs.length !== 0 && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={
							formBData.length !== 0 ? formBData.length : formBs.length
						}
					/>
				)}
			</section>
			{uiState.type === 'formb' && (
				<DeleteModal
					type={uiState.type}
					id={uiState.deleteID}
					fileUrl={uiState.fileUrl}
					name={uiState.deleteName}
				/>
			)}
			{isLoading && <Loader />}
		</Layout>
	);
}

export default FormBList;
