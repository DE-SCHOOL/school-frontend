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

function TableAcademicStats({ student, styles = '' }) {
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
	console.log(marksInfoNewII, studentRanks, marksInfo);
	// return (
	// 	<React.Fragment>
	// 		{marksInfoNewII?.map((studResults, index) => {
	// 			if (studResults.length !== 0) {
	// 				let studentPersonalData = correctStudentLevelData(
	// 					studResults[0]?.student,
	// 					realStudents
	// 				);
	// 				const studentResult = studentRanks.filter(
	// 					(student) => student.studentId === studentPersonalData?._id
	// 				)[0];
	// 				let TOTAL_MARKS = 0;
	// 				let TOTAL_COEF = 0;
	// 				return (
	// 					<React.Fragment key={index}>
	// 						{/* {studResults.length === 0 ? <h1>Student Result Not Available yet</h1>} */}
	// 						<div className={`result-info ${styles} mg-bt`} key={index}>
	// 							{/* <table className="results mg-top">
	// 								<thead>
	// 									<tr>
	// 										<th>Student</th>
	// 										<th>Term 1 Av</th>
	// 										<th>Term 2 Av</th>
	// 										<th>Term 3 Av</th>
	// 										<th>Annual Av</th>
	// 										<th>Annual Rank</th>
	// 										<th>Annual Class Avg</th>
	// 									</tr>
	// 								</thead>
	// 								<tbody>
	// 									{studResults?.map((studResult) => {
	// 										TOTAL_MARKS +=
	// 											studResult.course.credit_value *
	// 											studResult[`yearTotal`];
	// 										TOTAL_COEF += studResult.course.credit_value;
	// 										if (studResult.course) {
	// 											return (
	// 												<tr key={studResult._id}>
	// 													<td>{studResult.course.name}</td>
	// 													<td>{studResult[`s1Exam`]}</td>
	// 													<td>{studResult[`s2Exam`]}</td>
	// 													<td>{studResult[`s3Exam`]}</td>
	// 													<td>{studResult[`s4Exam`]}</td>
	// 													<td>{studResult[`s5Exam`]}</td>
	// 													<td>{studResult[`s6Exam`]}</td>

	// 													<td>{studResult[`yearTotal`].toFixed(2)}</td>
	// 													<td>{studResult.course.credit_value}</td>
	// 													<td>
	// 														{(
	// 															studResult.course.credit_value *
	// 															studResult[`yearTotal`]
	// 														).toFixed(2)}
	// 													</td>
	// 													<td>{studResult.rank}</td>
	// 													<td>
	// 														{courseAverages[
	// 															studResult.course._id
	// 														]?.classAverage?.toFixed(2)}
	// 													</td>
	// 													<td>{getGradeRemark(studResult[`yearTotal`])}</td>
	// 													<td></td>
	// 												</tr>
	// 											);
	// 										} else {
	// 											return null;
	// 										}
	// 									})}
	// 								</tbody>
	// 							</table> */}
	// 							{/* <table className="results student-results border">
	// 								<thead>
	// 									<tr>
	// 										<th colSpan={4}>Student's Results</th>
	// 										<th colSpan={2}>The Dean</th>
	// 										<th colSpan={2}>The Principal</th>
	// 									</tr>
	// 								</thead>
	// 								<tbody>
	// 									<tr>
	// 										<td>Total Marks</td>
	// 										<td>
	// 											{TOTAL_MARKS} /{20 * TOTAL_COEF}
	// 										</td>
	// 										<td>Total Coefficient</td>
	// 										<td>{TOTAL_COEF}</td>
	// 										<td className="border-bt-none" colSpan={2}></td>
	// 									</tr>
	// 									<tr>
	// 										<td>Average</td>
	// 										<td>{studentResult.overallAverage?.toFixed(2)}</td>
	// 										<td>Position</td>
	// 										<td>
	// 											{studentResult.rank} / {studentRanks.length}
	// 										</td>
	// 										<td className="border-bt-none" colSpan={2}></td>
	// 									</tr>
	// 									<tr>
	// 										<td>Max Average</td>
	// 										<td>{maxAvg.toFixed(2)}</td>
	// 										<td>Min Average</td>
	// 										<td>{minAvg.toFixed(2)}</td>
	// 										<td className="border-bt-none" colSpan={2}></td>
	// 									</tr>
	// 									<tr>
	// 										<td>Class Average</td>
	// 										<td>{classAverage.toFixed(2)}</td>
	// 										<td>% passed</td>
	// 										<td>
	// 											{((totalPassed / studentRanks.length) * 100).toFixed(2)}
	// 										</td>
	// 										<td className="border-bt-none" colSpan={2}></td>
	// 									</tr>
	// 									<tr>
	// 										<td>Performance Remark</td>
	// 										<td>
	// 											{studentRanks.length > 0 && (
	// 												<span>
	// 													{getGradeRemark(studentResult.overallAverage)}
	// 												</span>
	// 											)}
	// 										</td>
	// 										<td>Conduct</td>
	// 										<td></td>
	// 										<td colSpan={2} className="border-bt-none"></td>
	// 									</tr>
	// 									<tr>
	// 										<td colSpan={4}>
	// 											<span className="caps">
	// 												Assessment of Conduct: Excellent/V. Good/Fair/Poor
	// 											</span>
	// 											<br />
	// 											<span className="caps">
	// 												Final Class Council Decision: Honour
	// 												Roll/Passed/Failed/Warned/Expelled
	// 											</span>
	// 										</td>
	// 										<td className="border-bt-none" colSpan={2}></td>
	// 									</tr>
	// 								</tbody>
	// 							</table> */}

	// 							{/* <SchoolGrading /> */}
	// 							{load.isLoading && <Loader />}
	// 						</div>
	// 					</React.Fragment>
	// 				);
	// 			} else {
	// 				return (
	// 					<h1
	// 						style={{ textAlign: 'center' }}
	// 						className="mg-top-lg mg-bt-lg result-info no-position"
	// 						key={index}
	// 					>
	// 						Student Not Available Anymore, was dismissed
	// 					</h1>
	// 				);
	// 			}
	// 		})}
	// 		{/* <StudentInfo student={student} styles="no-position" key={student.id} /> */}
	// 	</React.Fragment>
	// );
	// return (
	// 	<React.Fragment>
	// 		<table className="results mg-top">
	// 			<thead>
	// 				<tr>
	// 					<th>Student</th>
	// 					<th>Term 1 Average</th>
	// 					<th>Term 2 Average</th>
	// 					<th>Term 3 Average</th>
	// 					<th>Annual Average</th>
	// 					<th>Annual Rank</th>
	// 				</tr>
	// 			</thead>
	// 			<tbody>
	// 				{studentRanks?.map((stud) => (
	// 					<tr key={stud._id}>
	// 						{/* <td>{markInfo.course}</td> */}
	// 						<td>{stud.studentName}</td>
	// 						<td>000</td>
	// 						<td>000</td>
	// 						<td>000</td>
	// 						<td>{stud.overallAverage}</td>
	// 						<td>{stud.rank}</td>
	// 					</tr>
	// 				))}
	// 			</tbody>
	// 		</table>
	// 	</React.Fragment>
	// );
	return (
		<React.Fragment>
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
						console.log(
							studArr,
							'JEFF',
							TOTAL_MARKS_T1,
							TOTAL_MARKS_T2,
							TOTAL_MARKS_T3,
							TOTAL_COEF,
							student
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
