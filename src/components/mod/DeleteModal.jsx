import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultDeleteEntity } from '../../store/ui-state/ui-stateSlice';
import { deleteStudent } from '../../store/students/studentSlice';
import { deleteStaff } from '../../store/staffs/staffSlice';
import { deleteSpecialty } from '../../store/specialty/specialtySlice';
import { deleteCourse } from '../../store/courses/courseSlice';
import { deleteDepartment } from '../../store/departments/departmentSlice';
import { deleteProgram } from '../../store/program/programSlice';
import { deleteQuestion } from '../../store/question/questionSlice';
import {
	deletePromotedStudent,
	getStudentPerAcademicYearNextStudents,
} from '../../store/academic year/academicYearSlice';
import { deleteGroup } from '../../store/messaging/messagingSlice';
import {
	deleteTimetable,
	getAllTimetables,
} from '../../store/timetable/timetableSlice';
import { deleteFormB, getAllFormBs } from '../../store/form b/formBSlice';

function DeleteModal({
	name,
	id,
	type,
	nextAcademicYear = '',
	newClass = null,
	fileUrl = '',
}) {
	const [modalText, setModalText] = useState('');
	const year = useSelector((state) => state.years.currentYear);
	const dispatch = useDispatch();
	// console.log(modalText, id);
	const handleRemoveModal = () => {
		dispatch(defaultDeleteEntity());
	};

	window.onclick = (e) => {
		// console.log(e.target.id);
		if (e.target.id === 'outer') {
			handleRemoveModal();
		}
	};
	let reactDeleteElement = (
		<div className="modal-text">
			Note: <span>{name}</span> is about to be deleted from the database. After
			this delete, the action would be irreversible. Type
			<span> {id}</span> in the field below to confirm deletion.
		</div>
	);
	if (type === 'promotion')
		reactDeleteElement = (
			<div className="modal-text">
				Note: <span>{name}</span> is about to be deleted from the
				{' ' + nextAcademicYear?.schoolYear} academic year. After this delete,
				the action would be irreversible. Type
				<span> {id}</span> in the field below to confirm deletion.
			</div>
		);

	const handleDeleteEntity = async () => {
		// alert('I would do the deletion');
		if (type === 'student') {
			if (year?._id !== undefined)
				dispatch(deleteStudent({ id, academicYearID: year._id }));
			else
				alert(
					"Student must be deleted from an academic year, switch to an academic year where you'll want to delete this student"
				);
		} else if (type === 'staff') {
			dispatch(deleteStaff({ id }));
		} else if (type === 'specialty') {
			dispatch(deleteSpecialty({ id }));
		} else if (type === 'course') {
			dispatch(deleteCourse({ id }));
		} else if (type === 'department') {
			dispatch(deleteDepartment({ id }));
		} else if (type === 'program') {
			dispatch(deleteProgram({ id }));
		} else if (type === 'question') {
			dispatch(deleteQuestion({ id }));
		} else if (type === 'promotion') {
			console.log({
				studentID: id,
				nextAcademicYearID: nextAcademicYear?._id,
				newClass,
				currentYearID: year?._id,
			});
			await dispatch(
				deletePromotedStudent({
					studentID: id,
					nextAcademicYearID: nextAcademicYear?._id,
					newClass,
					currentYearID: year?._id,
				})
			);
			await dispatch(
				getStudentPerAcademicYearNextStudents({ _id: nextAcademicYear?._id })
			);
		} else if (type === 'group') {
			dispatch(deleteGroup(id));
		} else if (type === 'timetable') {
			await dispatch(deleteTimetable({ id, fileUrl }));
			await dispatch(getAllTimetables());
		} else if (type === 'formb') {
			await dispatch(deleteFormB({ id, fileUrl }));
			await dispatch(getAllFormBs());
		}

		handleRemoveModal();
	};
	return (
		<div className={'mo'} id="outer">
			<div className="modal">
				{reactDeleteElement}
				<div className="input">
					<input
						type="text"
						className="modal-input"
						value={modalText}
						onChange={(e) => setModalText(e.target.value)}
						placeholder="Enter entity to be deleted"
					/>
				</div>

				<div className="action-btn">
					<button className="cancel" onClick={handleRemoveModal}>
						Cancel
					</button>
					<button
						className={`confirm ${modalText === id ? 'con-btn' : ''}`}
						disabled={modalText !== id}
						onClick={handleDeleteEntity}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteModal;
