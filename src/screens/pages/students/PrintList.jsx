import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TablePrint from '../../../components/tables/TablePrint';
import SearchStudents from '../../../components/search/SearchStudents';
import { getStudentsExam } from '../../../store/exams/examSlice';

function StudentList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getStudentsExam());
	}, [dispatch]);

	return (
		<div className="stud-print">
			<SearchStudents styles={'mg-top-md mg-bt-md'} type="print" />

			<section className="students">
				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<TablePrint styles="mg-top" tableData={students} />
				)}
			</section>
		</div>
	);
}

export default StudentList;
