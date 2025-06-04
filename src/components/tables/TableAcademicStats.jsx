import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentMarkSheetAllCourses } from '../../store/marks/markSlice';

import * as periodInfo from '../../utilities/periodInfo';

import {
	calculateStudentsFinalYearlyRank,
	calculateStudentYearlyCourseRank,
	calculateYearlyCourseAverages,
	rankStudentResults,
} from '../../utilities/resultFunctions';
import SectionNotFound from '../layout/SectionNotFound';

function TableAcademicStats({ student, styles = '', specialty }) {
	let semester = periodInfo.semester();

	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	// const courses = useSelector((state) => state.courses.courses);
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const academicYear = useSelector((state) => state.years.currentYear);
	useEffect(() => {
		if (academicYear?._id !== undefined) {
			//Get the students whose results are to be displayed

			// const academicYear = '2023/2024';

			//getting the student IDs
			let studIDs = [];
			students.map((student) => {
				studIDs.push(student._id);
				return student;
			});

			//searching  data
			const searchData = {
				academicYear: academicYear?.schoolYear,
				students: studIDs,
				semester,
			};
			dispatch(getAllStudentMarkSheetAllCourses(searchData));
		}

		//eslint-disable-next-line
	}, [students?.length, academicYear?._id]);

	//If no student is found
	if (students?.length === 0) {
		return <SectionNotFound text={'Student With Above Search Not Found!!'} />;
	}
	let marksInfoNew = [];
	let marksInfoNewII = [];
	let studentRanks = null;
	if (
		marksInfo.length > 0 &&
		marksInfo.flat().length > 0 &&
		!marksInfo.some((markArray) => markArray.length === 0)
	) {
		const data = JSON.parse(JSON.stringify([...marksInfo]));
		marksInfoNew = rankStudentResults(data);
		marksInfoNewII = calculateStudentYearlyCourseRank(
			JSON.parse(JSON.stringify([...marksInfoNew]))
		);

		studentRanks = calculateYearlyCourseAverages(marksInfo).studentAverages;
		calculateStudentsFinalYearlyRank(studentRanks);
	}

	return (
		<React.Fragment>
			<h2 className="center">
				Academic Year Per Student Statistics for {specialty},{' '}
				{academicYear?.schoolYear}.
			</h2>
			<table className="results mg-top">
				<thead>
					<tr>
						<th>Student</th>
						<th>Term 1 Average</th>
						<th>Term 2 Average</th>
						<th>Term 3 Average</th>
						<th>Annual Average</th>
						<th>Annual Rank</th>
					</tr>
				</thead>
				<tbody>
					{marksInfoNewII?.map((studArr, index) => {
						let TOTAL_MARKS_T1 = 0;
						let TOTAL_MARKS_T2 = 0;
						let TOTAL_MARKS_T3 = 0;
						let TOTAL_COEF = 0;

						studArr.map((studEl, index) => {
							TOTAL_MARKS_T1 += studEl.t1Total * studEl.course.credit_value;
							TOTAL_MARKS_T2 += studEl.t2Total * studEl.course.credit_value;
							TOTAL_MARKS_T3 += studEl.t3Total * studEl.course.credit_value;
							TOTAL_COEF += studEl.course.credit_value;
							return null;
						});
						const student = studentRanks.filter(
							(stud) => stud.studentId === studArr[0].student._id
						);
						return (
							<tr key={index}>
								{/* <td>{markInfo.course}</td> */}
								<td>{student[0].studentName}</td>
								<td>{(TOTAL_MARKS_T1 / TOTAL_COEF)?.toFixed(2)}</td>
								<td>{(TOTAL_MARKS_T2 / TOTAL_COEF)?.toFixed(2)}</td>
								<td>{(TOTAL_MARKS_T3 / TOTAL_COEF)?.toFixed(2)}</td>
								<td>{student[0].overallAverage?.toFixed(2)}</td>
								<td>{student[0].rank}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</React.Fragment>
	);
}

export default TableAcademicStats;
