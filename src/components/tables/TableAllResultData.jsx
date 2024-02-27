//react libraries and react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCoursesPerSpecialty } from '../../store/courses/courseSlice';
import { getAllStudentMarkSheetAllCourses } from '../../store/marks/markSlice';
import Loader from '../loaders/Loader';
import StudentInfo from '../social/StudentInfo';
import * as periodInfo from '../../utilities/periodInfo';

function TableAllResultData({ student, styles = '' }) {
	let semester = periodInfo.semester();

	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	// const courses = useSelector((state) => state.courses.courses);
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const load = useSelector((state) => state.courses);

	useEffect(() => {
		//Get the students whose results are to be displayed

		const academicYear = '2023/2024';

		//getting the student IDs
		let studIDs = [];
		students.map((student) => {
			studIDs.push(student._id);
			return student;
		});

		//searching  data
		const searchData = {
			academicYear,
			students: studIDs,
			semester,
		};
		console.log(students);
		dispatch(getAllStudentMarkSheetAllCourses(searchData));

		//eslint-disable-next-line
	}, [students?.length]);

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
	return (
		<React.Fragment>
			{marksInfo?.map((studResults, index) => {
				if (studResults.length !== 0) {
					// const resultInfo  = {};
					let TCE = 0; // Total credit earned
					let TGP = 0; // Total grade points
					let TWP = 0; // Total weighted points
					let TCV = 0; // Total credit value
					return (
						<React.Fragment>
							{/* {studResults.length === 0 ? <h1>Student Result Not Available yet</h1>} */}
							<StudentInfo
								student={studResults[0]?.student}
								styles="no-position"
								identify={index}
							/>
							<div className={`result-info ${styles} mg-bt`} key={index}>
								<table className="results mg-top">
									<thead>
										<tr>
											<th>Course Code</th>
											<th>Course Title</th>
											<th>Status</th>
											<th>Credit Value</th>
											<th>Credit Earned</th>
											<th>CA / 30</th>
											<th>Exam / 70</th>
											<th>Total / 100</th>
											<th>Grade Point</th>
											<th>Weighted points</th>
											<th>Grade</th>
										</tr>
									</thead>
									<tbody>
										{studResults?.map((studResult) => {
											if (studResult.course) {
												TCE += studResult[`${semester}CreditEarned`];
												TGP += studResult[`${semester}GradePoint`];
												TWP += studResult[`${semester}WeightedPoints`];
												TCV += studResult.course?.credit_value || 0;
												return (
													<tr key={studResult._id}>
														<td>{studResult.course?.code}</td>
														<td>{studResult.course?.name}</td>
														<td>
															{studResult.course?.status === 'compulsory'
																? 'C'
																: 'E'}
														</td>
														<td>
															{studResult.course?.credit_value.toFixed(2)}
														</td>
														<td>
															{studResult[`${semester}CreditEarned`].toFixed(2)}
														</td>
														<td>{studResult[`${semester}CA`].toFixed(2)}</td>
														<td>{studResult[`${semester}Exam`].toFixed(2)}</td>
														<td>{studResult[`${semester}Total`].toFixed(2)}</td>
														<td>
															{studResult[`${semester}GradePoint`].toFixed(2)}
														</td>
														<td>
															{studResult[`${semester}WeightedPoints`].toFixed(
																2
															)}
														</td>
														<td>{studResult[`${semester}Grade`]}</td>
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

export default TableAllResultData;
