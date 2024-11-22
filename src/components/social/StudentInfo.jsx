import React, { useEffect } from 'react';
import { getDateFromDateObject } from '../../utilities/getDate';
import { semester } from '../../utilities/periodInfo';
import { useSelector, useDispatch } from 'react-redux';
import { lmuLogo } from './../../assets/logos';
import { getCurrentYear } from '../../store/academic year/academicYearSlice';

function StudentInfo({ student, styles = '', identify = '', type = null }) {
	const academicYear = useSelector((state) => state.years.currentYear);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentYear());
	}, [dispatch]);

	return (
		<div className={`student-detail-results ${styles}`} key={identify}>
			<div className="stud-info">
				<div className="section">
					<div>
						<span className="prop">Name and surname</span>
						<span className="value">: {student?.name}</span>
					</div>
					<div>
						<span className="prop">Matricule</span>
						<span className="value">: {student?.matricule}</span>
					</div>
					<div>
						<span className="prop">Faculty</span>
						<span className="value">
							: {student?.specialty?.department?.program?.name}
						</span>
					</div>
					<div>
						<span className="prop">Specialty</span>
						<span className="value">: {student?.specialty?.name}</span>
					</div>
				</div>
				<img src={lmuLogo} alt="" className="school-logo" />
				<div className="section">
					<div>
						<span className="prop">Date and Place of birth</span>
						<span className="value">
							: {getDateFromDateObject(student?.dob)} at {student?.pob}
						</span>
					</div>
					<div>
						<span className="prop">Gender</span>
						<span className="value">: {student?.gender}</span>
					</div>
					<div>
						<span className="prop">Department</span>
						<span className="value">
							: {student?.specialty?.department?.name}
						</span>
					</div>
					<div>
						<span className="prop">Level</span>
						<span className="value">: {student?.level}</span>
					</div>
				</div>
			</div>
			<div className="line mg-bt mg-top"></div>
			{type === null && (
				<h2 className="header-secondary center mg-top-lg">
					{semester() === 's1' ? 'First Semester Results' : ''}
					{semester() === 's2' ? 'Second Semester Results' : ''}
					{academicYear?.schoolYear !== undefined &&
						` for ${academicYear?.schoolYear}`}
				</h2>
			)}
			{type === 'transcript' && (
				<>
					<h1 className="header-primary transcript-header center mg-top-lg border">
						Academic Result Slip
					</h1>
					<h2 className="header-secondary center mg-top-lg">
						First Semester Results
					</h2>
				</>
			)}
		</div>
	);
}

export default StudentInfo;
