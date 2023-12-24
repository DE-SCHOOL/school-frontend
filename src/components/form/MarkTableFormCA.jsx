import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMarkSheetsPerCoursePerStudents } from '../../store/marks/markSlice';
import Failure from '../signal/Failure';
import Loader from '../loaders/Loader';
import { updateStudentsMark } from '../../store/marks/markSlice';

function MarkTableFormCA({ students, length, semester }) {
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
				// if (el.value * 1 > 30 || el.value * 1 < 0) {
				// 	marks = {
				// 		...marks,
				// 		error: true,
				// 		errorMessage:
				// 			'All CA marks should be positive numbers less than 30',
				// 	};
				// }
				studentsMark.push(el.value * 1);
			}
			return el;
		});

		dispatch(
			updateStudentsMark({
				id: params.courseID,
				marks: studentsMark, //array of students marks
				students: studentIDs, //array of students id
				markType: `${semester}CA`, //semester definition
			})
		);
	};
	return (
		<div className="table-form">
			<form
				action=""
				className="table-form mg-top"
				onSubmit={handleSubmitMarks}
			>
				<table className="marks mg-top">
					<thead>
						<tr>
							<th>SN</th>
							<th>Name (Matricule)</th>
							{semester === 's1' && (
								<th>
									1<sup>st</sup> Semester CA
								</th>
							)}
							{semester === 's2' && (
								<th>
									2<sup>nd</sup> Semester CA
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
										<td>
											{sheet?.student.name} ({sheet?.student.matricule})
										</td>
										<td>
											<input
												type="number"
												// required
												name={sheet?.student._id}
												defaultValue={
													semester === 's1' ? sheet?.s1CA : sheet?.s2CA
												}
												autoComplete={`${sheet?.student._id}`}
												max={30}
												min={0}
											/>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
				<div className="mg-top">
					<button className="button-main button-main-medium caps mg-top">
						Submit Marks
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

export default MarkTableFormCA;
