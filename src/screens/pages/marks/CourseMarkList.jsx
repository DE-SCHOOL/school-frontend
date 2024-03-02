import React, { useEffect } from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../store/courses/courseSlice';
import { getStudentsPerCourseOffering } from '../../../store/students/studentSlice';
import { getMarkSheetsPerCoursePerStudents } from '../../../store/marks/markSlice';
import { TableCourseMarks } from '../../../components/tables';
import Failure from '../../../components/signal/Failure';
import Loader from '../../../components/loaders/Loader';

function CourseMarkList() {
	const course = useSelector((state) => state.courses.course);
	const students = useSelector((state) => state.students.students);
	const markSheet = useSelector((state) => state.marks.markSheet);
	const marks = useSelector((state) => state.marks);
	const dispatch = useDispatch();

	const params = useParams();

	useEffect(() => {
		dispatch(getStudentsPerCourseOffering({ courseID: params.courseID }));
		dispatch(getCourse({ id: params.courseID }));

		//dispatch to get all marksheets per course for particular students if students already exist
		if (students?.length !== 0) {
			const studentIDs = [];
			students.map((student) => {
				studentIDs.push(student._id);
				return student;
			});
			dispatch(
				getMarkSheetsPerCoursePerStudents({
					id: params.courseID,
					students: studentIDs,
				})
			);
		}
		//eslint-disable-next-line
	}, [dispatch, params.courseID, students.length, markSheet?.length]);

	return (
		<Layout>
			<SectionIntro
				title="View Marks"
				main={course?.length !== 0 ? `${course?.name}(${course?.code})` : ''}
				sub="Marks"
			/>
			<section className="marks mg-top">
				<TableCourseMarks
					students={students}
					length={markSheet.length}
					semester={course?.semester}
				/>
			</section>
			{marks.error === true && marks.errorMessage && (
				<Failure message={marks.errorMessage} />
			)}
			{/* {marks.error === false && setStaffData(defaultInfo)} */}
			{marks.isLoading && <Loader />}
		</Layout>
	);
}

export default CourseMarkList;
