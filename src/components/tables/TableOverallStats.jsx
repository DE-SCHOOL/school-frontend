import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentMarkSheetAllCourses } from '../../store/marks/markSlice';

import { calculateOverallAverages } from '../../utilities/resultFunctions';
import SectionNotFound from '../layout/SectionNotFound';

function TableOverallStats({ styles = '', specialty }) {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const academicYear = useSelector((state) => state.years.currentYear);

	useEffect(() => {
		if (academicYear?._id !== undefined) {
			const studIDs = students.map((student) => student._id);
			const searchData = {
				academicYear: academicYear?.schoolYear,
				students: studIDs,
			};
			dispatch(getAllStudentMarkSheetAllCourses(searchData));
		}

		//eslint-disable-next-line
	}, [students?.length, academicYear?._id]);

	// If no student is found
	if (students?.length === 0) {
		return <SectionNotFound text={'Student With Above Search Not Found!!'} />;
	}

	// Calculate combined averages only when we have full data for every student
	let studentOverallAverages = [];
	if (
		marksInfo.length > 0 &&
		marksInfo.flat().length > 0 &&
		!marksInfo.some((markArray) => markArray.length === 0)
	) {
		const result = calculateOverallAverages(
			JSON.parse(JSON.stringify([...marksInfo]))
		);
		studentOverallAverages = result.studentOverallAverages;
	}

	return (
		<React.Fragment>
			<h2 className="center">
				Overall Statistics Per Student for {specialty},{' '}
				{academicYear?.schoolYear}.
			</h2>
			<table className="results mg-top">
				<thead>
					<tr>
						<th>Student</th>
						<th>Seq 1</th>
						<th>Seq 2</th>
						<th>Term 1</th>
						<th>Seq 3</th>
						<th>Seq 4</th>
						<th>Term 2</th>
						<th>Seq 5</th>
						<th>Seq 6</th>
						<th>Term 3</th>
						<th>Annual Average</th>
						<th>Annual Rank</th>
					</tr>
				</thead>
				<tbody>
					{studentOverallAverages.map((student, index) => (
						<tr key={student.studentId || index}>
							<td>{student.studentName}</td>
							<td>{student.s1Avg?.toFixed(2)}</td>
							<td>{student.s2Avg?.toFixed(2)}</td>
							<td>{student.t1Avg?.toFixed(2)}</td>
							<td>{student.s3Avg?.toFixed(2)}</td>
							<td>{student.s4Avg?.toFixed(2)}</td>
							<td>{student.t2Avg?.toFixed(2)}</td>
							<td>{student.s5Avg?.toFixed(2)}</td>
							<td>{student.s6Avg?.toFixed(2)}</td>
							<td>{student.t3Avg?.toFixed(2)}</td>
							<td>{student.annualAvg?.toFixed(2)}</td>
							<td>{student.rank}</td>
						</tr>
					))}
				</tbody>
			</table>
		</React.Fragment>
	);
}

export default TableOverallStats;
