//react libraries and react
import React from 'react';
import { useSelector } from 'react-redux';
// import { getCoursesPerSpecialty } from '../../store/courses/courseSlice';
import Loader from '../loaders/Loader';
import Failure from '../signal/Failure';

import * as periodInfo from './../../utilities/periodInfo';
import { getGradeRemark } from '../../utilities/getGradeRemark';
import {
	calculateStudentAverages,
	rankStudentResults,
	rankStudents,
} from '../../utilities/resultFunctions';
import { returnSequence } from '../../utilities/returnSequence';

function TableResultsSequence({ student, styles = '' }) {
	const sequence = periodInfo.semester();
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const load = useSelector((state) => state.courses);

	let marksInfoNew = [];
	let studentAverages = [];
	let studentRanking = [];
	// console.log(marksInfo.length, 'JASIO', marksInfo, marksInfo.flat().length);
	if (
		marksInfo.length > 0 &&
		marksInfo.flat().length > 0 &&
		!marksInfo.some((markArray) => markArray.length === 0)
	) {
		const data = JSON.parse(JSON.stringify([...marksInfo]));
		marksInfoNew = rankStudentResults(data);
		studentAverages = calculateStudentAverages(data);
		studentRanking = rankStudents(studentAverages, `${sequence}ExamAverage`);
	}

	const studentResult =
		marksInfoNew.flat().filter((el) => el.student?._id === student._id) || [];
	const studentRank = studentRanking.filter(
		(el) => el.studentId === student._id
	);

	const maxAvg = Math.max(...studentRanking.map((el) => el.totalAverage));
	const minAvg = Math.min(...studentRanking.map((el) => el.totalAverage));
	const totalPassed = studentRanking.filter(
		(el) => el.totalAverage >= 10
	).length;
	const classAverage =
		studentRanking
			.map((el) => el.totalAverage)
			.reduce((sum, cur) => sum + cur, 0) / studentRanking.length;
	let TOTAL_MARKS = 0;
	let TOTAL_COEF = 0;
	return (
		<div className={`result-info ${styles}`}>
			<table className="results mg-top">
				<thead>
					<tr>
						<th>Subjects</th>
						<th>{returnSequence(sequence)}</th>
						<th>Coef</th>
						<th>Av * Coef</th>
						<th>Position</th>
						<th>Class Avg</th>
						<th>Remark</th>
						<th>Signature</th>
					</tr>
				</thead>
				<tbody>
					{studentResult?.map((markInfo) => {
						TOTAL_MARKS +=
							markInfo.course.credit_value * markInfo[`${sequence}Exam`];
						TOTAL_COEF += markInfo.course.credit_value;
						return (
							<tr key={markInfo._id}>
								{/* <td>{markInfo.course}</td> */}
								<td>{markInfo.course.name}</td>
								<td>{markInfo[`${sequence}Exam`]}</td>
								<td>{markInfo.course.credit_value}</td>
								<td>
									{markInfo.course.credit_value * markInfo[`${sequence}Exam`]}
								</td>
								<td>{markInfo[`${sequence}ExamRank`]}</td>
								<td>{markInfo[`${sequence}ExamClassAverage`]?.toFixed(2)}</td>
								<td>{getGradeRemark(markInfo[`${sequence}Exam`])}</td>
								<td></td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="total-gpa"></div>
			<table className="results student-results border">
				<thead>
					<tr>
						<th colSpan={2}>Student's Results</th>
						<th>The Dean</th>
						<th>The Principal</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Total Marks</td>
						<td>
							{TOTAL_MARKS} /{20 * TOTAL_COEF}
						</td>
						<td>Total Coefficient</td>
						<td>{TOTAL_COEF}</td>
					</tr>
					<tr>
						<td>Average</td>
						<td>
							{studentRanking.length > 0 && (
								<span>{studentRank[0].totalAverage?.toFixed(2)}</span>
							)}
						</td>
						<td className="border-bt-none"></td>
						<td>Position</td>
						<td>
							{studentRanking.length > 0 && (
								<span>
									{studentRank[0].rank} / {studentRanking.length}
								</span>
							)}
						</td>
						<td className="border-bt-none"></td>
					</tr>
					<tr>
						<td>Max Average</td>
						<td>{maxAvg.toFixed(2)}</td>
						<td>Min Average</td>
						<td>{minAvg.toFixed(2)}</td>
						<td className="border-bt-none"></td>
					</tr>
					<tr>
						<td>Class Average</td>
						<td>{classAverage.toFixed(2)}</td>
						<td>% passed</td>
						<td>{((totalPassed / studentRanking.length) * 100).toFixed(2)}</td>
						<td className="border-bt-none"></td>
					</tr>
					<tr>
						<td>Conduct</td>
						<td></td>
						<td className="border-bt-none"></td>
					</tr>
					<tr>
						<td>Performance Remark</td>
						<td>
							{studentRanking.length > 0 && (
								<span>{getGradeRemark(studentRank[0].totalAverage)}</span>
							)}
						</td>
						<td className="border-bt-none"></td>
					</tr>
				</tbody>
			</table>
			{load.isLoading && <Loader />}
			{load.error === true && load.errorMessage && (
				<Failure message={load.errorMessage} />
			)}
		</div>
	);
}

export default TableResultsSequence;
