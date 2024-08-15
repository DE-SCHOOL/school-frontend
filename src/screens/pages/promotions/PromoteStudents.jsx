import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import DeleteModal from '../../../components/mod/DeleteModal';
import Loader from './../../../components/loaders/Loader';
import {
	createStudentAcademicYearBulk,
	getCurrentYear,
	getStudentPerAcademicYear,
} from '../../../store/academic year/academicYearSlice';
import Failure from '../../../components/signal/Failure';
import TableStudentsPromote from '../../../components/tables/TableStudentsPromote';

const studentHeader = {
	id: 'ID',
	name: 'Name',
	level: 'class',
	dob: 'DoB',
	parent: 'Parent name',
	tel: 'phone Number',
	acts: 'actions',
	specialty: 'specialty',
	address: 'address',
};

function PromoteStudents() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.years.students);
	const uiState = useSelector((state) => state.uiState.deleteOpt);
	const isLoading = useSelector((state) => state.years.isLoading);
	const year = useSelector((state) => state.years);

	//saving the student data in a useState
	const [studentsState, setStudentsState] = useState(students);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(25);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		if (year.currentYear?._id) {
			dispatch(getStudentPerAcademicYear(year.currentYear));
		}
		// dispatch(getCurrentYear());
	}, [dispatch, year.currentYear?._id]);

	const createBulk = () => {
		const studentIDs = students.map((stud) => stud._id);
		const toYearID = year.currentYear._id;

		console.log(studentIDs, toYearID);
		// dispatch(createStudentAcademicYearBulk({ studentIDs, toYearID }));
	};

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Promotion" main="Student" sub="List" />

			{/* Displaying search filter only if student data has fully loaded */}
			{students.length !== 0 && (
				<SearchCategory
					styles={'mg-top-md mg-bt-md'}
					dropDown="specialty"
					data={students}
					setData={setStudentsState}
				/>
			)}
			<section className="students mg-top-md">
				{/* Section About, Download, Add, and Refresh */}
				<SectionMainIntro
					title={`Students: Academic Year ${year.currentYear?.schoolYear}`}
					styles="mg-bt mg-top"
					promotion={true}
					ftn={createBulk}
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<TableStudentsPromote
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={studentsState.length !== 0 ? studentsState : students}
						header={studentHeader}
						paggingNum={numPages}
					/>
				)}

				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={
							studentsState.length !== 0
								? studentsState.length
								: students.length
						}
					/>
				)}
			</section>
			{uiState.type === 'student' && (
				<DeleteModal
					type={uiState.type}
					id={uiState.deleteID}
					name={uiState.deleteName}
				/>
			)}
			{year.error === true && year.errorMessage && (
				<Failure message={year.errorMessage} />
			)}
			{isLoading && <Loader />}
		</Layout>
	);
}

export default PromoteStudents;
