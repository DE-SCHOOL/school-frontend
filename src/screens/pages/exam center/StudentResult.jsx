//react libraries and react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//importing slices
import StudentInfo from '../../../components/social/StudentInfo';
import { getStudent } from '../../../store/exams/examSlice';

//importing components
import { TableResults } from './../../../components/tables';
import { Layout } from '../../../components/layout';
import Loader from './../../../components/loaders/Loader';
import Failure from './../../../components/signal/Failure';

function StudentResult() {
	const dispatch = useDispatch();
	const student = useSelector((stud) => stud.exams.student);
	const exams = useSelector((stud) => stud.exams);

	const params = useParams();

	useEffect(() => {
		dispatch(getStudent({ id: params.studentID }));
	}, [dispatch, params.studentID]);
	return (
		<Layout>
			{student !== undefined && Object.entries(student).length !== 0 && (
				<StudentInfo student={student} />
			)}
			<div className="line mg-bt mg-top"></div>
			<h2 className="header-secondary center mg-top-lg">
				First Semester Results
			</h2>
			{student !== undefined && Object.entries(student).length !== 0 && (
				<TableResults student={student} />
			)}
			{exams.error === true && exams.errorMessage && (
				<Failure message={exams.errorMessage} />
			)}
			{/* {exams.error === false && setStaffData(defaultInfo)} */}
			{exams.isLoading && <Loader />}
		</Layout>
	);
}

export default StudentResult;
