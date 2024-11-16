import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentResit } from '../../../store/exams/examSlice';
import {
	Layout,
	SectionIntro,
	SectionResultIntro,
} from '../../../components/layout';
import Loader from './../../../components/loaders/Loader';
import Failure from './../../../components/signal/Failure';
import { PaggingNumSelect, Paggination } from '../../../components/pagging';
import TableStudentResit from '../../../components/tables/TableStudentResit';
import { semester } from '../../../utilities/periodInfo';
import SectionNotFound from '../../../components/layout/SectionNotFound';

const studentHeader = {
	id: 'ID',
	name: 'Name',
	level: 'class',
	acts: 'actions',
	course: 'Course',
	course_code: 'Course_Code',
	total: 'Total_Mark',
};

function StudentResit() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.studentResit);
	const academicYear = useSelector((state) => state.years.currentYear);
	const exams = useSelector((state) => state.exams);

	//saving the student data in a useState
	const [studentsState] = useState(students);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(25);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		if (academicYear?._id)
			dispatch(
				getStudentResit({
					semester: semester(),
					academicYear: academicYear?.schoolYear,
				})
			);
	}, [dispatch, academicYear?._id]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Total Marks" main="Student" sub="Resit" />

			<section className="students mg-top-lg">
				{/* Section About, Download, Add, and Refresh */}
				<SectionResultIntro
					title="Students"
					styles="mg-bt mg-top"
					link="/exam center/all-resit"
					text="Download All Resits"
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<TableStudentResit
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
			{students?.length === 0 && exams.isLoading === false && (
				<SectionNotFound text={'No students yet'} />
			)}
		</Layout>
	);
}

export default StudentResit;
