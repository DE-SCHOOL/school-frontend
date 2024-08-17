import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TablePrint from '../../../components/tables/TablePrint';
import SearchStudents from '../../../components/search/SearchStudents';
import { getStudentsExam } from '../../../store/exams/examSlice';

import Loader from '../../../components/loaders/Loader';
import Button from '../../../components/buttons/Button';

function PrintList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	const academicYear = useSelector((state) => state.years.currentYear);
	const load = useSelector((state) => state.exams);
	const [scroll, setScroll] = useState(0);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		if (academicYear?._id !== undefined)
			dispatch(getStudentsExam(academicYear?._id));
	}, [dispatch, academicYear?._id]);

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
				form="STUDENT LIST"
			/>

			<section className="students">
				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<TablePrint styles="mg-top" tableData={students} />
				)}
			</section>
			<Button styles={scroll} />
			{load.isLoading && <Loader />}
		</div>
	);
}

export default PrintList;
