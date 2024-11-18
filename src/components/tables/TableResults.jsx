//react libraries and react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCoursesPerSpecialty } from '../../store/courses/courseSlice';
import { getStudentMarkSheetAllCourses } from '../../store/marks/markSlice';
import Loader from '../loaders/Loader';
import { getCoursesPerSpecialtyPerLevel } from '../../store/courses/courseSlice';
import Failure from '../signal/Failure';

import * as periodInfo from './../../utilities/periodInfo';
import { getSequencePerTerm } from '../../utilities/getSequencePerTerm';
import { getGradeRemark } from '../../utilities/getGradeRemark';

function TableResults({ student, styles = '' }) {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses);
	const marksInfo = useSelector((state) => state.marks.studentCoursesMarks);
	const load = useSelector((state) => state.courses);
	const academicYear = useSelector((state) => state.years.currentYear);

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
			courses.map((course) => {
				courseIDs.push(course._id);
				return course;
			});
			// const academicYear = '2023/2024';
			const searchData = {
				academicYear: academicYear?.schoolYear,
				courses: courseIDs,
				studID: [student._id],
			};
			dispatch(getStudentMarkSheetAllCourses(searchData));
		}
		//eslint-disable-next-line
	}, [courses?.length, academicYear?._id]);

	const sequence = getSequencePerTerm(periodInfo.academicTerm());
	return (
		<div className={`result-info ${styles}`}>
			<table className="results mg-top">
				<thead>
					<tr>
						<th>Subjects</th>
						<th>Eval1</th>
						<th>Eval2</th>
						<th>AV / 20</th>
						<th>Coef</th>
						<th>Av * Coef</th>
						<th>Position</th>
						<th>Remark</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
					</tr>
					<tr>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
					</tr>
					<tr>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
					</tr>
					<tr>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
						<td>10</td>
					</tr>
					{marksInfo?.map((markInfo) => {
						console.log(
							sequence.eval1,
							markInfo.course[`s4Exam`],
							markInfo.course
						);
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
								<td>0.0</td>
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
			<table className="results student-results mg-top border">
				<thead>
					<tr>
						<th colSpan={2}>Student's Results</th>
						<th colSpan={2}>The Principal</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Average</td>
						<td>18.69</td>
					</tr>
					<tr>
						<td>Position</td>
						<td>2 / 58</td>
					</tr>
					<tr>
						<td>Total Marks</td>
						<td>850.86 / 1000</td>
					</tr>
					<tr>
						<td>Total Coefficient</td>
						<td>60</td>
					</tr>
					<tr>
						<td colSpan={2}>Very Good</td>
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
