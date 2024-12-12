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
	calculateStudentAverages,
	rankStudentResults,
	rankStudents,
} from '../../utilities/resultFunctions';
import { returnSequence } from '../../utilities/returnSequence';

function TableAllResultDataSequence({ student, styles = '' }) {
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
		return (
			<h1
				style={{ textAlign: 'center' }}
				className="mg-top-lg mg-bt-lg result-info no-position"
			>
				Student With Above Search Not Found!!
			</h1>
		);
	}
	const sequence = periodInfo.semester();
	let marksInfoNew = [];
	let studentAverages = [];
	let studentRanking = [];
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

	return (
		<React.Fragment>
			{marksInfoNew?.map((studResults, index) => {
				if (studResults.length !== 0) {
					let studentPersonalData = correctStudentLevelData(
						studResults[0]?.student,
						realStudents
					);
					const studentResult = studentRanking.filter(
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
								isTerm={false}
							/>
							<div className={`result-info ${styles} mg-bt`} key={index}>
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
										</tr>
									</thead>
									<tbody>
										{studResults?.map((studResult) => {
											TOTAL_MARKS +=
												studResult.course.credit_value *
												studResult[`${sequence}Exam`];
											TOTAL_COEF += studResult.course.credit_value;
											if (studResult.course) {
												return (
													<tr key={studResult._id}>
														{/* <td>{markInfo.course}</td> */}
														<td>{studResult.course.name}</td>
														<td>{studResult[`${sequence}Exam`]}</td>
														<td>{studResult.course.credit_value}</td>
														<td>
															{studResult.course.credit_value *
																studResult[`${sequence}Exam`]}
														</td>
														<td>{studResult[`${sequence}ExamRank`]}</td>
														<td>{studResult[`${sequence}ExamClassAverage`]}</td>
														<td>
															{getGradeRemark(studResult[`${sequence}Exam`])}
														</td>
													</tr>
												);
											} else {
												return null;
											}
										})}
									</tbody>
								</table>
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
											<td>{studentResult.totalAverage}</td>
										</tr>
										<tr>
											<td>Position</td>
											<td>
												{studentResult.rank} / {studentRanking.length}
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
												{getGradeRemark(studentResult.totalAverage)}
											</td>
										</tr>
									</tbody>
								</table>
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

export default TableAllResultDataSequence;
