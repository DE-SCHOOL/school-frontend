//react libraries and react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCoursesPerSpecialty } from '../../store/courses/courseSlice';
import { getAllStudentMarkSheetAllCourses } from '../../store/marks/markSlice';
import Loader from '../loaders/Loader';
import StudentInfo from '../social/StudentInfo';
import * as periodInfo from '../../utilities/periodInfo';
import { correctStudentLevelData } from '../../utilities/correctStudentLevelData';
import { getGradeRemark } from '../../utilities/getGradeRemark';
import {
	calculateStudentsFinalYearlyRank,
	calculateStudentYearlyCourseRank,
	calculateYearlyCourseAverages,
	rankStudentResults,
} from '../../utilities/resultFunctions';
import SectionNotFound from '../layout/SectionNotFound';

function TableAllResultDataYear({ student, styles = '' }) {
	let semester = periodInfo.semester();

	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	const realStudents = useSelector((state) => state.students.students);
	// const courses = useSelector((state) => state.courses.courses);
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const load = useSelector((state) => state.courses);
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
	let courseAverages = null;
	let studentRanks = null;
	let maxAvg, minAvg, totalPassed, classAverage;
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

		courseAverages = calculateYearlyCourseAverages(marksInfo).courseAverages;
		studentRanks = calculateYearlyCourseAverages(marksInfo).studentAverages;
		calculateStudentsFinalYearlyRank(studentRanks);
		maxAvg = Math.max(...studentRanks.map((el) => el.overallAverage));
		minAvg = Math.min(...studentRanks.map((el) => el.overallAverage));
		totalPassed = studentRanks.filter((el) => el.overallAverage >= 10).length;
		classAverage =
			studentRanks
				.map((el) => el.overallAverage)
				.reduce((sum, cur) => sum + cur, 0) / studentRanks.length;
	}
	console.log(studentRanks);
	return (
		<React.Fragment>
			{marksInfoNewII?.map((studResults, index) => {
				if (studResults.length !== 0) {
					let studentPersonalData = correctStudentLevelData(
						studResults[0]?.student,
						realStudents
					);
					const studentResult = studentRanks.filter(
						(student) => student.studentId === studentPersonalData?._id
					)[0];
					let TOTAL_MARKS = 0;
					let TOTAL_COEF = 0;
					return (
						<React.Fragment key={index}>
							{/* {studResults.length === 0 ? <h1>Student Result Not Available yet</h1>} */}
							<StudentInfo
								student={studentPersonalData}
								styles="no-position"
								identify={index}
								isTerm={null}
							/>
							<div className={`result-info ${styles} mg-bt`} key={index}>
								<table className="results mg-top">
									<thead>
										{/* <tr>
											<th>Course Code</th>
											<th>Course Title</th>
											<th>Status</th>
											<th>Credit Value</th>
											<th>Credit Earned</th>
											{!(
												studResults[0]?.student?.specialty?.name !==
													'Software Engineering - SBT' &&
												studResults[0]?.student?.level === 300
											) && <th>CA / 30</th>}
											{!(
												studResults[0]?.student?.specialty?.name !==
													'Software Engineering - SBT' &&
												studResults[0]?.student?.level === 300
											) && <th>Exam / 70</th>}
											<th>Total / 100</th>
											<th>Grade Point</th>
											<th>Weighted points</th>
											<th>Grade</th>
										</tr> */}
										<tr>
											<th>Subjects</th>
											<th>Seq 1</th>
											<th>Seq 2</th>
											<th>Seq 3</th>
											<th>Seq 4</th>
											<th>Seq 5</th>
											<th>Seq 6</th>
											<th>AV / 20</th>
											<th>Coef</th>
											<th>Av * Coef</th>
											<th>Position</th>
											<th>Class Avg</th>
											<th>Remark</th>
											<th>Signature</th>
										</tr>
									</thead>
									<tbody>
										{studResults?.map((studResult) => {
											TOTAL_MARKS +=
												studResult.course.credit_value *
												studResult[`yearTotal`];
											TOTAL_COEF += studResult.course.credit_value;
											if (studResult.course) {
												return (
													// <tr key={studResult._id}>
													// 	<td>{studResult.course?.code}</td>
													// 	<td>{studResult.course?.name}</td>
													// 	<td>
													// 		{studResult.course?.status === 'compulsory'
													// 			? 'C'
													// 			: 'E'}
													// 	</td>
													// 	<td>
													// 		{studResult.course?.credit_value.toFixed(2)}
													// 	</td>
													// 	<td>
													// 		{studResult[`${semester}CreditEarned`].toFixed(2)}
													// 	</td>
													// 	{!(
													// 		studResults[0]?.student?.specialty?.name !==
													// 			'Software Engineering - SBT' &&
													// 		studResults[0]?.student?.level === 300
													// 	) && (
													// 		<td>{studResult[`${semester}CA`].toFixed(2)}</td>
													// 	)}
													// 	{!(
													// 		studResults[0]?.student?.specialty?.name !==
													// 			'Software Engineering - SBT' &&
													// 		studResults[0]?.student?.level === 300
													// 	) && (
													// 		<td>
													// 			{studResult[`${semester}Exam`].toFixed(2)}
													// 		</td>
													// 	)}
													// 	{/* <td>{studResult[`${semester}CA`].toFixed(2)}</td>
													// 	<td>{studResult[`${semester}Exam`].toFixed(2)}</td> */}
													// 	<td>{studResult[`${semester}Total`].toFixed(2)}</td>
													// 	<td>
													// 		{studResult[`${semester}GradePoint`].toFixed(2)}
													// 	</td>
													// 	<td>
													// 		{studResult[`${semester}WeightedPoints`].toFixed(
													// 			2
													// 		)}
													// 	</td>
													// 	<td>{studResult[`${semester}Grade`]}</td>
													// </tr>
													<tr key={studResult._id}>
														{/* <td>{markInfo.course}</td> */}
														<td>{studResult.course.name}</td>
														<td>{studResult[`s1Exam`]}</td>
														<td>{studResult[`s2Exam`]}</td>
														<td>{studResult[`s3Exam`]}</td>
														<td>{studResult[`s4Exam`]}</td>
														<td>{studResult[`s5Exam`]}</td>
														<td>{studResult[`s6Exam`]}</td>

														<td>{studResult[`yearTotal`].toFixed(2)}</td>
														<td>{studResult.course.credit_value}</td>
														<td>
															{(
																studResult.course.credit_value *
																studResult[`yearTotal`]
															).toFixed(2)}
														</td>
														<td>{studResult.rank}</td>
														<td>
															{courseAverages[
																studResult.course._id
															]?.classAverage?.toFixed(2)}
														</td>
														<td>{getGradeRemark(studResult[`yearTotal`])}</td>
														<td></td>
													</tr>
												);
											} else {
												return null;
											}
										})}
									</tbody>
								</table>
								{/* <div className="total-gpa">
									<table className="results-total mg-top">
										<thead>
											<tr>
												<th></th>
												<th>Credit Value</th>
												<th>Credit Earned</th>
												<th>Grade Point</th>
												<th>Weighted Points</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th rowSpan={2}>Total</th>
												<td>{TCV.toFixed(2)}</td>
												<td>{TCE.toFixed(2)}</td>
												<td>{TGP.toFixed(2)}</td>
												<td>{TWP.toFixed(2)}</td>
											</tr>
										</tbody>
									</table>
									<table className="gpa mg-top">
										<thead>
											<tr>
												<th>GPA</th>
												<th className="gpa-value">
													{Number(TWP / TCV).toFixed(2)}
												</th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
								</div> */}
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
										<tr></tr>
										<tr>
											<td>Average</td>
											<td>{studentResult.overallAverage?.toFixed(2)}</td>
											<td className="border-bt-none"></td>
											<td>Position</td>
											<td>
												{studentResult.rank} / {studentRanks.length}
											</td>
											<td className="border-bt-none"></td>
										</tr>
										<tr>
											<td>Max Average</td>
											<td>{maxAvg.toFixed(2)}</td>
											<td>Min Average</td>
											<td>{minAvg.toFixed(2)}</td>
										</tr>
										<tr>
											<td>Class Average</td>
											<td>{classAverage.toFixed(2)}</td>
											<td>% passed</td>
											<td>
												{((totalPassed / studentRanks.length) * 100).toFixed(2)}
											</td>
											<td className="border-bt-none"></td>
										</tr>
										<tr>
											<td colSpan={4}>
												{studentRanks.length > 0 && (
													<span>
														{getGradeRemark(studentResult.overallAverage)}
													</span>
												)}
											</td>
										</tr>
									</tbody>
								</table>

								{/* <SchoolGrading /> */}
								{load.isLoading && <Loader />}
							</div>
						</React.Fragment>
					);
				} else {
					return (
						<h1
							style={{ textAlign: 'center' }}
							className="mg-top-lg mg-bt-lg result-info no-position"
							key={index}
						>
							Student Not Available Anymore, was dismissed
						</h1>
					);
				}
			})}
			{/* <StudentInfo student={student} styles="no-position" key={student.id} /> */}
		</React.Fragment>
	);
}

export default TableAllResultDataYear;
