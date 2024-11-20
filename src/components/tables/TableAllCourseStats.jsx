import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowDown } from 'react-icons/fa6';

import Failure from './../signal/Failure';
import Loader from '../loaders/Loader';
import SchoolHeader from '../social/SchoolHeader';
import { schoolHeaderProp } from '../../utilities/appData';
import SearchCourses from '../search/SearchCourses';
import { getSequencePerTerm } from '../../utilities/getSequencePerTerm';
import { academicTerm } from '../../utilities/periodInfo';
import {
	calculateStudentAverages,
	rankStudentResults,
	rankStudents,
} from '../../utilities/resultFunctions';
import { getAllStudentMarkSheetAllCourses } from '../../store/marks/markSlice';

function TableAllCourseStats({ coursesStats }) {
	//length is to help getMarkSheetsPerCoursePerStudents everytime this component is involved in any render
	// console.log(coursesStats);
	let marks = useSelector((state) => state.marks);
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const students = useSelector((state) => state.exams.students);
	const academicYear = useSelector((state) => state.years.currentYear);
	const dispatch = useDispatch();
	const handleDownloadDoc = () => {
		window.print();
	};

	useEffect(() => {
		if (academicYear?._id !== undefined) {
			let studIDs = [];
			students.map((student) => {
				studIDs.push(student._id);
				return student;
			});

			//searching  data
			const searchData = {
				academicYear: academicYear?.schoolYear,
				students: studIDs,
			};
			dispatch(getAllStudentMarkSheetAllCourses(searchData));
		}
	}, [academicYear?._id, academicYear?.schoolYear, dispatch, students]);

	const sequence = getSequencePerTerm(academicTerm());
	let marksInfoNew = [];
	let studentAverages = [];
	let studentRanking = [];
	let neededCourses = [];
	if (marksInfo.length > 0) {
		const data = JSON.parse(JSON.stringify([...marksInfo]));
		marksInfoNew = rankStudentResults(data);
		studentAverages = calculateStudentAverages(data);
		studentRanking = rankStudents(
			studentAverages,
			`${academicTerm()}TotalAverage`
		);

		let extractedCourses = [];

		studentAverages.flat().map((studAverage) => {
			if (!extractedCourses.includes(studAverage.course?._id)) {
				neededCourses.push(studAverage);
			}

			extractedCourses.push(studAverage.course?._id);
			return studAverage;
		});
	}

	console.log(neededCourses, 'JASIO JASIO');

	return (
		<div className="table-form table-form-modified">
			<SchoolHeader school={schoolHeaderProp} />
			{/* <h1 className="title" style={{ textAlign: 'center' }}>
				All Course Statistics
			</h1> */}
			<br />
			<br />
			<SearchCourses form="COURSE STATISTICS" type="print" />

			<table className="marks mg-top">
				<thead>
					<tr>
						<th>SN</th>
						<th>Subject</th>
						<th>CC</th>
						<th>Coef</th>
						<th>No Reg</th>
						<th>No Exam</th>
						<th>Average</th>
						<th>% Passed</th>
						<th>% Failed</th>
						<th>18+</th>
						<th>16+</th>
						<th>14+</th>
						<th>11+</th>
						<th>10+</th>
						<th>8+</th>
						<th>8-</th>
					</tr>
				</thead>
				<tbody>
					{coursesStats?.map((courseStat, index) => {
						const courseAverage = neededCourses.filter(
							(item) => item.course?._id === courseStat.courseInfo?._id
						);
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td style={{ textAlign: 'left' }}>
									{courseStat.courseInfo?.name}
								</td>
								<td>{courseStat.courseInfo?.code}</td>
								<td>{courseStat.courseInfo?.credit_value}</td>
								<td>{courseStat.totalOffering}</td>
								<td>{courseStat.totalSat}</td>
								<td>
									{courseAverage.length > 0
										? courseAverage[0][`${academicTerm()}TotalClassAverage`]
										: '-'}
								</td>
								<td>{courseStat.percentPassed}%</td>
								<td>{courseStat.percentFailed}%</td>
								<td>{courseStat.totalAs}</td>
								<td>{courseStat.totalBplus}</td>
								<td>{courseStat.totalBs}</td>
								<td>{courseStat.totalCplus}</td>
								<td>{courseStat.totalCs}</td>
								<td>{courseStat.totalDs}</td>
								<td>{courseStat.totalEs}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="mg-top button-marks">
				<button
					type="button"
					className="button-main button-main-medium caps mg-top button-marks__flex"
					onClick={handleDownloadDoc}
				>
					<FaArrowDown />
					<span className="text">Download</span>
				</button>
			</div>

			{marks.error === true && marks.errorMessage && (
				<Failure message={marks.errorMessage} />
			)}
			{/* {marks.error === false && setStaffData(defaultInfo)} */}
			{marks.isLoading && <Loader />}
		</div>
	);
}

export default TableAllCourseStats;
