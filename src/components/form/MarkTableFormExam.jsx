import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa6';

import { getMarkSheetsPerCoursePerStudents } from '../../store/marks/markSlice';
import Failure from './../signal/Failure';
import Loader from '../loaders/Loader';
import { updateStudentsMark } from '../../store/marks/markSlice';
import SchoolHeader from '../social/SchoolHeader';
import { schoolHeaderProp } from '../../utilities/appData';

function MarkTableFormExam({ students, length, semester }) {
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
			})
		);
		//eslint-disable-next-line
	}, [params.courseID, dispatch, length]);

	const handleSubmitMarks = (e) => {
		e.preventDefault();

		//Get information about the form elements
		const elements = Array.from(e.target);

		//Get an array of all the marks entered in the same order as the student names
		let studentsMark = [];
		elements.map((el, index) => {
			if (index + 1 !== elements.length) {
				studentsMark.push(el.value * 1);
			}
			return el;
		});

		let studentIDs = [];
		marks?.markSheet?.map((sheet) => {
			studentIDs.push(sheet?.student?._id);
			return sheet?.student?.name;
		});

		dispatch(
			updateStudentsMark({
				id: params.courseID,
				marks: studentsMark, //array of students marks
				students: studentIDs, //array of students id
				markType: `${semester}Exam`, //semester definition
			})
		);
	};
	const handleDownloadDoc = () => {
		window.print();
	};
	return (
		<div className="table-form">
			<form
				action=""
				className="table-form mg-top"
				onSubmit={handleSubmitMarks}
			>
				<SchoolHeader school={schoolHeaderProp} />
				<table className="marks mg-top">
					<thead>
						<tr>
							<th>SN</th>
							<th>Name (Matricule)</th>
							<th>Level</th>
							{semester === 's1' && (
								<th>
									1<sup>st</sup> Semester Exam
								</th>
							)}
							{semester === 's2' && (
								<th>
									2<sup>nd</sup> Semester Exam
								</th>
							)}
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
										<td>{sheet?.student.level}</td>
										<td>
											<input
												type="number"
												// required
												name={sheet?.student._id}
												defaultValue={
													semester === 's1' ? sheet?.s1Exam : sheet?.s2Exam
												}
												autoComplete={`${sheet?.student._id}`}
												max={70}
												min={0}
											/>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
				<div className="mg-top button-marks">
					<button
						className="button-main button-main-medium caps mg-top"
						type="submit"
					>
						Submit Marks
					</button>
					<button
						type="button"
						className="button-main button-main-medium caps mg-top button-marks__flex"
						onClick={handleDownloadDoc}
					>
						<FaArrowDown />
						<span className="text">Download</span>
					</button>
				</div>
			</form>
			{marks.error === true && marks.errorMessage && (
				<Failure message={marks.errorMessage} />
			)}
			{/* {marks.error === false && setStaffData(defaultInfo)} */}
			{marks.isLoading && <Loader />}
		</div>
	);
}

export default MarkTableFormExam;
