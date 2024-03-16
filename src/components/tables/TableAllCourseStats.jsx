import React from 'react';
import { useSelector } from 'react-redux';
import { FaArrowDown } from 'react-icons/fa6';

import Failure from './../signal/Failure';
import Loader from '../loaders/Loader';
import SchoolHeader from '../social/SchoolHeader';
import { schoolHeaderProp } from '../../utilities/appData';

function TableAllCourseStats({ coursesStats }) {
	//length is to help getMarkSheetsPerCoursePerStudents everytime this component is involved in any render
	// console.log(coursesStats);
	let marks = useSelector((state) => state.marks);

	const handleDownloadDoc = () => {
		window.print();
	};

	return (
		<div className="table-form table-form-modified">
			<SchoolHeader school={schoolHeaderProp} />
			<h1 className="title" style={{ textAlign: 'center' }}>
				All Course Statistics
			</h1>

			<table className="marks mg-top">
				<thead>
					<tr>
						<th>SN</th>
						<th>Course</th>
						<th>CC</th>
						<th>CV</th>
						<th>No Reg</th>
						<th>No Exam</th>
						<th>No Passed</th>
						<th>No Failed</th>
						<th>A</th>
						<th>B+</th>
						<th>B</th>
						<th>C+</th>
						<th>C</th>
						<th>D+</th>
						<th>D</th>
						<th>F</th>
					</tr>
				</thead>
				<tbody>
					{coursesStats?.map((courseStat, index) => {
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
								<td>{courseStat.percentPassed}%</td>
								<td>{courseStat.percentFailed}%</td>
								<td>{courseStat.totalAs}</td>
								<td>{courseStat.totalBplus}</td>
								<td>{courseStat.totalBs}</td>
								<td>{courseStat.totalCplus}</td>
								<td>{courseStat.totalCs}</td>
								<td>{courseStat.totalDplus}</td>
								<td>{courseStat.totalDs}</td>
								<td>{courseStat.totalFs}</td>
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
