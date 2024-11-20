//react libraries and react
import React from 'react';
import { useSelector } from 'react-redux';
// import { getCoursesPerSpecialty } from '../../store/courses/courseSlice';
import Loader from '../loaders/Loader';
import Failure from '../signal/Failure';

import * as periodInfo from '../../utilities/periodInfo';
import { getSequencePerTerm } from '../../utilities/getSequencePerTerm';
import { getGradeRemark } from '../../utilities/getGradeRemark';
import {
	calculateStudentAverages,
	rankStudentResults,
	rankStudents,
} from '../../utilities/resultFunctions';
import { returnSequence } from '../../utilities/returnSequence';

function TableResults({ student, styles = '' }) {
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const load = useSelector((state) => state.courses);

	let marksInfoNew = [];
	let studentAverages = [];
	let studentRanking = [];
	if (marksInfo.length > 0) {
		const data = JSON.parse(JSON.stringify([...marksInfo]));
		marksInfoNew = rankStudentResults(data);
		studentAverages = calculateStudentAverages(data);
		studentRanking = rankStudents(
			studentAverages,
			`${periodInfo.academicTerm()}TotalAverage`
		);
	}

	const studentResult =
		marksInfoNew.flat().filter((el) => el.student?._id === student._id) || [];
	const studentRank = studentRanking.filter(
		(el) => el.studentId === student._id
	);

	const sequence = getSequencePerTerm(periodInfo.academicTerm());
	let TOTAL_MARKS = 0;
	let TOTAL_COEF = 0;
	return (
		<div className={`result-info ${styles}`}>
			<table className="results mg-top">
				<thead>
					<tr>
						<th>Subjects</th>
						<th>{returnSequence(sequence.eval1)}</th>
						<th>{returnSequence(sequence.eval2)}</th>
						<th>AV / 20</th>
						<th>Coef</th>
						<th>Av * Coef</th>
						<th>Position</th>
						<th>Class Avg</th>
						<th>Remark</th>
					</tr>
				</thead>
				<tbody>
					{studentResult?.map((markInfo) => {
						TOTAL_MARKS +=
							markInfo.course.credit_value *
							markInfo[`${periodInfo.academicTerm()}Total`];
						TOTAL_COEF += markInfo.course.credit_value;
						return (
							<tr key={markInfo._id}>
								{/* <td>{markInfo.course}</td> */}
								<td>{markInfo.course.name}</td>
								<td>{markInfo[`${sequence.eval1}Exam`]}</td>
								<td>{markInfo[`${sequence.eval2}Exam`]}</td>
								<td>{markInfo[`${periodInfo.academicTerm()}Total`]}</td>
								<td>{markInfo.course.credit_value}</td>
								<td>
									{markInfo.course.credit_value *
										markInfo[`${periodInfo.academicTerm()}Total`]}
								</td>
								<td>{markInfo[`${periodInfo.academicTerm()}TotalRank`]}</td>
								<td>
									{markInfo[`${periodInfo.academicTerm()}TotalClassAverage`]}
								</td>
								<td>
									{getGradeRemark(
										markInfo[`${periodInfo.academicTerm()}Total`]
									)}
								</td>
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
						<th colSpan={2}>The Principal</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Average</td>
						<td>
							{studentRanking.length > 0 && (
								<span>{studentRank[0].totalAverage}</span>
							)}
						</td>
					</tr>
					<tr>
						<td>Position</td>
						<td>
							{studentRanking.length > 0 && (
								<span>
									{studentRank[0].rank} / {studentRanking.length}
								</span>
							)}
						</td>
					</tr>
					<tr>
						<td>Total Marks</td>
						<td>
							{TOTAL_MARKS} /{20 * TOTAL_COEF}
						</td>
					</tr>
					<tr>
						<td>Total Coefficient</td>
						<td>{TOTAL_COEF}</td>
					</tr>
					<tr>
						<td colSpan={2}>
							{studentRanking.length > 0 && (
								<span>{getGradeRemark(studentRank[0].totalAverage)}</span>
							)}
						</td>
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

export default TableResults;
