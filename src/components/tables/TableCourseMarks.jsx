import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa6';

import { getMarkSheetsPerCoursePerStudents } from '../../store/marks/markSlice';
import Failure from './../signal/Failure';
import Loader from '../loaders/Loader';
import SchoolHeader from '../social/SchoolHeader';
import { schoolHeaderProp } from '../../utilities/appData';
// import { decideCourseGrade } from '../../utilities/decideCourseGrade';
import SectionNotFound from '../layout/SectionNotFound';
import { returnClassString } from '../../utilities/getClassString';
import { semester } from '../../utilities/periodInfo';
import { getGradeRemark } from '../../utilities/getGradeRemark';

function TableCourseMarks({ students, length, academicYear }) {
	//length is to help getMarkSheetsPerCoursePerStudents everytime this component is involved in any render

	let marks = useSelector((state) => state.marks);
	const dispatch = useDispatch();
	const params = useParams();
	const studentIDs = [];
	students.map((student) => {
		studentIDs.push(student._id);
		return student;
	});

	useEffect(() => {
		dispatch(
			getMarkSheetsPerCoursePerStudents({
				id: params.courseID,
				students: studentIDs,
				academicYear,
			})
		);
		//eslint-disable-next-line
	}, [params.courseID, dispatch, length]);
	const handleDownloadDoc = () => {
		window.print();
	};

	//return nothing if student sheet doesn't exist yet
	if (marks?.markSheet?.length === 0) {
		return <SectionNotFound text={'No marks yet.'} />;
	}

	const sequence = semester();
	// console.log(marks, sequence);
	return (
		<div className="table-form">
			<SchoolHeader school={schoolHeaderProp} />
			<table className="marks mg-top">
				<thead>
					<tr>
						<th>SN</th>
						<th>Name (Matricule)</th>
						<th>Class</th>
						<th>EXAM ( / 20)</th>
						<th>Remark</th>
					</tr>
				</thead>
				<tbody>
					{semester !== undefined &&
						marks?.markSheet?.map((sheet, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td className="stud-name">
										{sheet?.student.name} ({sheet?.student.matricule})
									</td>
									<td>{returnClassString(sheet?.student.level)}</td>
									<td>{sheet[`${sequence}Exam`]}</td>
									<td>{getGradeRemark(sheet[`${sequence}Exam`])}</td>
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

export default TableCourseMarks;
