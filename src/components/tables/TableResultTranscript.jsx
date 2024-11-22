//react libraries and react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCoursesPerSpecialty } from '../../store/courses/courseSlice';
import {
	getStudentMarkSheetAllCourses,
	getStudentMarkSheetAllCoursesII,
} from '../../store/marks/markSlice';
import Loader from '../loaders/Loader';
import { getCoursesPerSpecialtyPerLevel } from '../../store/courses/courseSlice';
import Failure from '../signal/Failure';

import * as periodInfo from './../../utilities/periodInfo';
import SchoolGrading from '../social/SchoolGrading';

function TableResultTranscript({ student, styles = '' }) {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses);
	const marksInfo = useSelector((state) => state.marks.studentCoursesMarks);
	const marksInfoII = useSelector((state) => state.marks.studentCoursesMarksII);
	const load = useSelector((state) => state.courses);
	const academicYear = useSelector((state) => state.years.currentYear);
	// let semester = periodInfo.semester();
	// console.log(marksInfo);

	// const resultInfo  = {};
	let TCE = 0; // Total credit earned
	let TGP = 0; // Total grade points
	let TWP = 0; // Total weighted points
	let TCV = 0; // Total credit value

	let TCEII = 0; // Total credit earned
	let TGPII = 0; // Total grade points
	let TWPII = 0; // Total weighted points
	let TCVII = 0; // Total credit value

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
	// console.log()

	//Get the coursesID and find the marksinformation of a particular student
	useEffect(() => {
		if (courses?.length > 0 && academicYear?._id !== undefined) {
			let courseIDs = [];
			let courseIDsII = [];
			courses.map((course) => {
				if (course.semester === 's1') {
					courseIDs.push(course._id);
				}
				if (course.semester === 's2') {
					courseIDsII.push(course._id);
				}
				return course;
			});
			// const academicYear = '2023/2024';
			const searchData = {
				academicYear: academicYear?.schoolYear,
				courses: courseIDs,
				studID: [student._id],
			};
			const searchDataII = {
				academicYear: academicYear?.schoolYear,
				courses: courseIDsII,
				studID: [student._id],
			};
			dispatch(getStudentMarkSheetAllCourses(searchData));
			dispatch(getStudentMarkSheetAllCoursesII(searchDataII));
		}
		//eslint-disable-next-line
	}, [courses?.length, academicYear?._id]);
	console.log();
	return (
		<div className={`result-info result-info-transcript ${styles}`}>
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
						TCE += markInfo[`s1CreditEarned`];
						TGP += markInfo[`s1GradePoint`];
						TWP += markInfo[`s1WeightedPoints`];
						TCV += markInfo.course.credit_value;
						return (
							<tr key={markInfo._id}>
								<td>{markInfo.course.code}</td>
								<td>{markInfo.course.name}</td>
								<td>{markInfo.course.status === 'compulsory' ? 'C' : 'E'}</td>
								<td>{markInfo.course.credit_value.toFixed(2)}</td>
								<td>{markInfo[`s1CreditEarned`].toFixed(2)}</td>
								<td>{markInfo[`s1CA`].toFixed(2)}</td>
								<td>{markInfo[`s1Exam`].toFixed(2)}</td>
								<td>{markInfo[`s1Total`].toFixed(2)}</td>
								<td>{markInfo[`s1GradePoint`].toFixed(2)}</td>
								<td>{markInfo[`s1WeightedPoints`].toFixed(2)}</td>
								<td>{markInfo[`s1Grade`]}</td>
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
			<div className="mg-top"></div>
			<h2 className="header-secondary center mg-top-lg">
				Second Semester Results
			</h2>
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
					{marksInfoII?.map((markInfo) => {
						TCEII += markInfo[`s2CreditEarned`];
						TGPII += markInfo[`s2GradePoint`];
						TWPII += markInfo[`s2WeightedPoints`];
						TCVII += markInfo.course.credit_value;
						return (
							<tr key={markInfo._id}>
								<td>{markInfo.course.code}</td>
								<td>{markInfo.course.name}</td>
								<td>{markInfo.course.status === 'compulsory' ? 'C' : 'E'}</td>
								<td>{markInfo.course.credit_value.toFixed(2)}</td>
								<td>{markInfo[`s2CreditEarned`].toFixed(2)}</td>
								<td>{markInfo[`s2CA`].toFixed(2)}</td>
								<td>{markInfo[`s2Exam`].toFixed(2)}</td>
								<td>{markInfo[`s2Total`].toFixed(2)}</td>
								<td>{markInfo[`s2GradePoint`].toFixed(2)}</td>
								<td>{markInfo[`s2WeightedPoints`].toFixed(2)}</td>
								<td>{markInfo[`s2Grade`]}</td>
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
								{Number(TWPII / (TCVII || 1)).toFixed(2)}
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
							(Number(TWPII / (TCVII || 1)) + Number(TWP / (TCV || 1))).toFixed(
								2
							) / 2
						)?.toFixed(2)}
					</div>
				</div>
			</div>
			<SchoolGrading />
			{load.isLoading && <Loader />}
			{load.error === true && load.errorMessage && (
				<Failure message={load.errorMessage} />
			)}
		</div>
	);
}

export default TableResultTranscript;
