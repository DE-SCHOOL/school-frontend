//react libraries and react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCoursesPerSpecialty } from '../../store/courses/courseSlice';
import {
	getAllStudentMarkSheetAllCourses,
	getAllStudentMarkSheetAllCoursesII,
} from '../../store/marks/markSlice';
import Loader from '../loaders/Loader';
import StudentInfo from '../social/StudentInfo';
import SchoolGrading from '../social/SchoolGrading';
import { correctStudentLevelData } from '../../utilities/correctStudentLevelData';
import SectionNotFound from '../layout/SectionNotFound';

function TableAllResultAcademicTranscript({ student, styles = '' }) {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	const realStudents = useSelector((state) => state.students.students);
	// const courses = useSelector((state) => state.courses.courses);
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const marksInfoII = useSelector(
		(state) => state.marks.studentsCoursesMarksII
	);
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
				semester: 's1',
			};
			const searchDataII = {
				academicYear: academicYear?.schoolYear,
				students: studIDs,
				semester: 's2',
			};
			dispatch(getAllStudentMarkSheetAllCourses(searchData));
			dispatch(getAllStudentMarkSheetAllCoursesII(searchDataII));
		}

		//eslint-disable-next-line
	}, [students?.length, academicYear?._id]);

	//If no student is found
	if (
		students?.length === 0 ||
		marksInfo?.length === 0
		// marksInfo?.flat()?.length === 0
	) {
		return <SectionNotFound text={'No students found!'} />;
	}
	return (
		<React.Fragment>
			{marksInfo.length === marksInfoII.length &&
				marksInfo.length !== 0 &&
				marksInfo?.map((studResults, index) => {
					if (studResults.length !== 0) {
						// const resultInfo  = {};
						let TCE = 0; // Total credit earned
						let TGP = 0; // Total grade points
						let TWP = 0; // Total weighted points
						let TCV = 0; // Total credit value
						let TCEII = 0; // Total credit earned
						let TGPII = 0; // Total grade points
						let TWPII = 0; // Total weighted points
						let TCVII = 0; // Total credit value
						let studentPersonalData = correctStudentLevelData(
							studResults[0]?.student,
							realStudents
						);
						return (
							<React.Fragment key={index}>
								{/* {studResults.length === 0 ? <h1>Student Result Not Available yet</h1>} */}
								<StudentInfo
									student={studentPersonalData}
									styles="no-position"
									identify={index}
									type="transcript"
								/>
								<div
									className={`result-info result-info-no__break ${styles} mg-bt`}
									// key={index}
								>
									<table className="results mg-top">
										<thead>
											<tr>
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
											</tr>
										</thead>
										<tbody>
											{studResults?.map((studResult) => {
												if (studResult.course) {
													TCE += studResult[`s1CreditEarned`];
													TGP += studResult[`s1GradePoint`];
													TWP += studResult[`s1WeightedPoints`];
													TCV += studResult.course?.credit_value || 0;
													return (
														<tr key={studResult.course?.code}>
															<td>{studResult.course?.code}</td>
															<td className="caps-upper">
																{studResult.course?.name}
															</td>
															<td>
																{studResult.course?.status === 'compulsory'
																	? 'C'
																	: 'E'}
															</td>
															<td>
																{studResult.course?.credit_value.toFixed(2)}
															</td>
															<td>{studResult[`s1CreditEarned`].toFixed(2)}</td>
															{!(
																studResults[0]?.student?.specialty?.name !==
																	'Software Engineering - SBT' &&
																studResults[0]?.student?.level === 300
															) && <td>{studResult[`s1CA`].toFixed(2)}</td>}
															{!(
																studResults[0]?.student?.specialty?.name !==
																	'Software Engineering - SBT' &&
																studResults[0]?.student?.level === 300
															) && <td>{studResult[`s1Exam`].toFixed(2)}</td>}
															{/* <td>{studResult[`s1CA`].toFixed(2)}</td>
														<td>{studResult[`s1Exam`].toFixed(2)}</td> */}
															<td>{studResult[`s1Total`].toFixed(2)}</td>
															<td>{studResult[`s1GradePoint`].toFixed(2)}</td>
															<td>
																{studResult[`s1WeightedPoints`].toFixed(2)}
															</td>
															<td>{studResult[`s1Grade`]}</td>
														</tr>
													);
												} else {
													return null;
												}
											})}
										</tbody>
									</table>
									<div className="total-gpa">
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
									</div>
									{load.isLoading && <Loader />}
								</div>
								<h2 className="header-secondary center mg-top-lg">
									Second Semester Results
								</h2>
								<div className={`result-info ${styles} mg-bt`}>
									<table className="results mg-top">
										<thead>
											<tr>
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
											</tr>
										</thead>
										<tbody>
											{marksInfoII[index]?.map((studResult) => {
												if (studResult.course) {
													TCEII += studResult[`s2CreditEarned`];
													TGPII += studResult[`s2GradePoint`];
													TWPII += studResult[`s2WeightedPoints`];
													TCVII += studResult.course?.credit_value || 0;
													return (
														<tr key={studResult._id}>
															<td className="caps-upper">
																{studResult.course?.code}
															</td>
															<td>{studResult.course?.name}</td>
															<td>
																{studResult.course?.status === 'compulsory'
																	? 'C'
																	: 'E'}
															</td>
															<td>
																{studResult.course?.credit_value.toFixed(2)}
															</td>
															<td>{studResult[`s2CreditEarned`].toFixed(2)}</td>
															{!(
																studResults[0]?.student?.specialty?.name !==
																	'Software Engineering - SBT' &&
																studResults[0]?.student?.level === 300
															) && <td>{studResult[`s2CA`].toFixed(2)}</td>}
															{!(
																studResults[0]?.student?.specialty?.name !==
																	'Software Engineering - SBT' &&
																studResults[0]?.student?.level === 300
															) && <td>{studResult[`s2Exam`].toFixed(2)}</td>}
															{/* <td>{studResult[`s2CA`].toFixed(2)}</td>
														<td>{studResult[`s2Exam`].toFixed(2)}</td> */}
															<td>{studResult[`s2Total`].toFixed(2)}</td>
															<td>{studResult[`s2GradePoint`].toFixed(2)}</td>
															<td>
																{studResult[`s2WeightedPoints`].toFixed(2)}
															</td>
															<td>{studResult[`s2Grade`]}</td>
														</tr>
													);
												} else {
													return null;
												}
											})}
										</tbody>
									</table>
									<div className="total-gpa">
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
													<td>{TCVII.toFixed(2)}</td>
													<td>{TCEII.toFixed(2)}</td>
													<td>{TGPII.toFixed(2)}</td>
													<td>{TWPII.toFixed(2)}</td>
												</tr>
											</tbody>
										</table>
										<table className="gpa mg-top">
											<thead>
												<tr>
													<th>GPA</th>
													<th className="gpa-value">
														{Number(TWPII / TCVII).toFixed(2)}
													</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
									</div>
									<div className="cummulative-gpa">
										<div className="item">
											<div className="title">Overall Credit Earned</div>
											<div className="value">{Number(TCVII) + Number(TCV)}</div>
										</div>
										<div className="item">
											<div className="title">Cummulative GPA</div>
											<div className="value">
												{(
													(
														Number(TWPII / (TCVII || 1)) +
														Number(TWP / (TCV || 1))
													).toFixed(2) / 2
												)?.toFixed(2)}
											</div>
										</div>
									</div>
									<SchoolGrading />
									{load.isLoading && <Loader />}
								</div>
							</React.Fragment>
						);
					} else {
						return null;
					}
				})}
			{/* <StudentInfo student={student} styles="no-position" key={student.id} /> */}
		</React.Fragment>
	);
}

export default TableAllResultAcademicTranscript;
