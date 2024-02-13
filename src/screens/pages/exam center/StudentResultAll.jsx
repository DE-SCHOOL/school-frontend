import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TablePrint from '../../../components/tables/TablePrint';
import SearchStudents from '../../../components/search/SearchStudents';
import { getStudentsExam } from '../../../store/exams/examSlice';

import Loader from '../../../components/loaders/Loader';
import Button from '../../../components/buttons/Button';
import { TableAllResultData } from '../../../components/tables';
import Failure from '../../../components/signal/Failure';

function StudentResultAll() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	const load = useSelector((state) => state.marks);
	const [scroll, setScroll] = useState(0);

	// console.log(students);
	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getStudentsExam());
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
				<TableAllResultData styles='no-position' />
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

export default StudentResultAll;
