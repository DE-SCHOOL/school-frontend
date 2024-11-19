import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchStudents from '../../../components/search/SearchStudents';
import { getStudentsExam } from '../../../store/exams/examSlice';

import Loader from '../../../components/loaders/Loader';
import Button from '../../../components/buttons/Button';
import { TableAllResultDataTerm } from '../../../components/tables';
import Failure from '../../../components/signal/Failure';
import { getCurrentYear } from '../../../store/academic year/academicYearSlice';
import { getAllStudentsPerAcademicYear } from '../../../store/students/studentSlice';

function StudentResultAllTerm() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	// const students = useSelector((state) => state.exams.students);
	const load = useSelector((state) => state.marks);
	const academicYear = useSelector((state) => state.years.currentYear);
	const [scroll, setScroll] = useState(0);

	// console.log(students, students.length);
	//useEffect to dispatch student data after initial render
	useEffect(() => {
		if (academicYear?._id !== undefined) {
			dispatch(getStudentsExam(academicYear?._id));
			dispatch(getAllStudentsPerAcademicYear(academicYear?._id));
		}
	}, [dispatch, academicYear?._id]);

	useEffect(() => {
		dispatch(getCurrentYear());
	}, [dispatch]);

	window.onscroll = () => {
		if (window.scrollY > 200) {
			setScroll(1);
		} else {
			setScroll(0);
		}
	};

	return (
		<div className="stud-print">
			<SearchStudents
				styles={'mg-top-md mg-bt-md'}
				type="print"
				form="STUDENT RESULTS"
			/>

			<section className="students">
				<TableAllResultDataTerm styles="no-position" />
			</section>
			<Button styles={scroll} />
			{load.isLoading && <Loader />}
			{load.error === true && load.errorMessage && (
				<Failure message={load.errorMessage} />
			)}
			{/* {load.error === false && setStaffData(defaultInfo)} */}
		</div>
	);
}

export default StudentResultAllTerm;
