//react libraries and react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCoursesPerSpecialty } from '../../store/courses/courseSlice';
import { getStudentMarkSheetAllCourses } from '../../store/marks/markSlice';
import Loader from '../loaders/Loader';
import { getCoursesPerSpecialtyPerLevel } from '../../store/courses/courseSlice';
import Failure from '../signal/Failure';

import * as periodInfo from './../../utilities/periodInfo';

function TableResults({ student, styles = '' }) {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses);
	const marksInfo = useSelector((state) => state.marks.studentCoursesMarks);
	const load = useSelector((state) => state.courses);
	let semester = periodInfo.semester();
	// console.log(marksInfo);

	// const resultInfo  = {};
	let TCE = 0; // Total credit earned
	let TGP = 0; // Total grade points
	let TWP = 0; // Total weighted points
	let TCV = 0; // Total credit value

	useEffect(() => {
		//get courses per specialty (all courses a student in a particular specialty does)
		dispatch(
			getCoursesPerSpecialtyPerLevel({
				id: student?.specialty?._id,
				level: student?.level,
			})
		);
		//s1, semester is set manually here.
		//Get all courses that fall under the student's specialty depending on the student's current level

		//eslint-disable-next-line
	}, [dispatch, student?.specialty?._id]);

	//Get the coursesID and find the marksinformation of a particular student
	useEffect(() => {
		if (courses?.length > 0) {
			let courseIDs = [];
			courses.map((course) => {
				if (course.semester === semester) {
					courseIDs.push(course._id);
				}
				return course;
			});
			const academicYear = '2023/2024';
			const searchData = {
				academicYear,
				courses: courseIDs,
				studID: [student._id],
			};
			dispatch(getStudentMarkSheetAllCourses(searchData));
		}
		//eslint-disable-next-line
	}, [courses?.length]);
	return (
		<div className={`result-info ${styles}`}>
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
					{marksInfo?.map((markInfo) => {
						TCE += markInfo[`${semester}CreditEarned`];
						TGP += markInfo[`${semester}GradePoint`];
						TWP += markInfo[`${semester}WeightedPoints`];
						TCV += markInfo.course.credit_value;
						return (
							<tr key={markInfo._id}>
								<td>{markInfo.course.code}</td>
								<td>{markInfo.course.name}</td>
								<td>{markInfo.course.status === 'compulsory' ? 'C' : 'E'}</td>
								<td>{markInfo.course.credit_value.toFixed(2)}</td>
								<td>{markInfo[`${semester}CreditEarned`].toFixed(2)}</td>
								<td>{markInfo[`${semester}CA`].toFixed(2)}</td>
								<td>{markInfo[`${semester}Exam`].toFixed(2)}</td>
								<td>{markInfo[`${semester}Total`].toFixed(2)}</td>
								<td>{markInfo[`${semester}GradePoint`].toFixed(2)}</td>
								<td>{markInfo[`${semester}WeightedPoints`].toFixed(2)}</td>
								<td>{markInfo[`${semester}Grade`]}</td>
							</tr>
						);
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
								{Number(TWP / (TCV || 1)).toFixed(2)}
							</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
			{load.isLoading && <Loader />}
			{load.error === true && load.errorMessage && (
				<Failure message={load.errorMessage} />
			)}
		</div>
	);
}

export default TableResults;
