import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentsPerAcademicYear } from '../../../store/students/studentSlice';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TableTimetable } from '../../../components/tables/';
import DeleteModal from '../../../components/mod/DeleteModal';
import Loader from './../../../components/loaders/Loader';
import { getAllTimetables } from '../../../store/timetable/timetableSlice';

const timetableHeader = {
	name: 'name',
	level: 'class',
	specialty: 'specialty',
	downloadUrl: 'download',
	semester: 'semester',
	academicYear: 'year',
	acts: 'actions',
};

function TimetableList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const timetables = useSelector((state) => state.timetable.timetables);
	const uiState = useSelector((state) => state.uiState.deleteOpt);
	const isLoading = useSelector((state) => state.students.isLoading);
	const year = useSelector((state) => state.years.currentYear);

	//saving the student data in a useState
	const [timetableState, setTimetableState] = useState(timetables);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(10);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getAllTimetables());
	}, [dispatch]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Timetables" main="Timetable" sub="List" />

			{/* Displaying search filter only if student data has fully loaded */}
			{timetables.length !== 0 && (
				<SearchCategory
					styles={'mg-top-md mg-bt-md'}
					dropDown="specialty"
					data={timetables}
					setData={setTimetableState}
				/>
			)}
			<section className="students mg-top-md">
				{/* Section About, Download, Add, and Refresh */}
				<SectionMainIntro
					title="Timetables"
					styles="mg-bt mg-top"
					link={'/time table/upload-timetable'}
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{timetables.length !== 0 && (
					<TableTimetable
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={
							timetableState.length !== 0 ? timetableState : timetables
						}
						header={timetableHeader}
						paggingNum={numPages}
					/>
				)}

				{/* Show student table information only if timetables data has loaded */}
				{timetables.length !== 0 && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={
							timetableState.length !== 0
								? timetableState.length
								: timetables.length
						}
					/>
				)}
			</section>
			{uiState.type === 'timetable' && (
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

export default TimetableList;
