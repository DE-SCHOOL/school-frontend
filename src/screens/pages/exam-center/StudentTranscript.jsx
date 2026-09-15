//react libraries and react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';

//importing slices
import StudentInfo from '../../../components/social/StudentInfo';
import { getStudent } from '../../../store/exams/examSlice';

//importing components
import { TableResultTranscript } from './../../../components/tables';
import { Layout } from '../../../components/layout';
import Loader from './../../../components/loaders/Loader';
import Failure from './../../../components/signal/Failure';

function StudentTranscript() {
	const dispatch = useDispatch();
	const student = useSelector((stud) => stud.exams.student);
	const year = useSelector((state) => state.years.currentYear);
	const exams = useSelector((stud) => stud.exams);

	const params = useParams();

	useEffect(() => {
		if (year?._id !== undefined)
			dispatch(getStudent({ id: params.studentID, academicYearID: year?._id }));
	}, [dispatch, params.studentID, year?._id]);
	return (
		<Layout>
			{student !== undefined && Object.entries(student).length !== 0 && (
				<StudentInfo student={student} type="transcript" />
			)}

			{student !== undefined && Object.entries(student).length !== 0 && (
				<TableResultTranscript student={student} />
			)}
			<span
				className="button-main button-main-medium no-display"
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '2rem',
					width: '15rem',
					marginTop: '2rem',
				}}
				onClick={() => window.print()}
			>
				<FaArrowDown />
				Download
			</span>
			{exams.error === true && exams.errorMessage && (
				<Failure message={exams.errorMessage} />
			)}
			{/* {exams.error === false && setStaffData(defaultInfo)} */}
			{exams.isLoading && <Loader />}
		</Layout>
	);
}

export default StudentTranscript;
