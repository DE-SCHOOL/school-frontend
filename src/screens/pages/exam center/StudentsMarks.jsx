import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentsExam } from '../../../store/exams/examSlice';
import {
	Layout,
	SectionIntro,
	SectionResultIntro,
} from '../../../components/layout';
import Loader from './../../../components/loaders/Loader';
import Failure from './../../../components/signal/Failure';
import { PaggingNumSelect, Paggination } from '../../../components/pagging';
import SearchStudents from '../../../components/search/SearchStudents';
import { TableStudents } from '../../../components/tables';
import SectionNotFound from '../../../components/layout/SectionNotFound';

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

function StudentMarks() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	const exams = useSelector((state) => state.exams);
	const academicYear = useSelector((state) => state.years.currentYear);
	//saving the student data in a useState
	const [studentsState, setStudentsState] = useState(students);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(25);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		if (academicYear?._id !== undefined)
			dispatch(getStudentsExam(academicYear?._id));
	}, [dispatch, academicYear?._id]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="All Results" main="Student" sub="Results" />

			{/* Displaying search filter only if student data has fully loaded */}
			<SearchStudents
				styles={'mg-top-md mg-bt-md'}
				dropDown="specialty"
				data={students}
				setData={setStudentsState}
			/>
			<section className="students">
				{/* Section About, Download, Add, and Refresh */}
				<SectionResultIntro title="Students" styles="mg-bt mg-top" type={'university'} />

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<TableStudents
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={studentsState.length !== 0 ? studentsState : students}
						header={studentHeader}
						paggingNum={numPages}
						tableType="results"
					/>
				)}

				{/* <SectionResultIntro title="View all results" styles="mg-bt mg-top" /> */}

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
				{exams.error === true && exams.errorMessage && (
					<Failure message={exams.errorMessage} />
				)}
				{/* {exams.error === false && setStaffData(defaultInfo)} */}
				{exams.isLoading && <Loader />}
			</section>
			{students.length === 0 && exams.isLoading === false && (
				<SectionNotFound text={'No marks yet'} />
			)}
		</Layout>
	);
}

export default StudentMarks;
