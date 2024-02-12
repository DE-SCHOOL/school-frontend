import React from 'react';
import { getDateFromDateObject } from '../../utilities/getDate';
import { semester } from '../../utilities/periodInfo';

function StudentInfo({ student, styles = '' }) {
	return (
		<div className={`student-detail-results ${styles}`}>
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
						<span className="prop">Program</span>
						<span className="value">
							: {student?.specialty?.department?.program?.name}
						</span>
					</div>
					<div>
						<span className="prop">Specialty</span>
						<span className="value">: {student?.specialty?.name}</span>
					</div>
				</div>
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
			<h2 className="header-secondary center mg-top-lg">
				{semester() === 's1' ? 'First Semester Results' : ''}
				{semester() === 's2' ? 'Second Semester Results' : ''}
			</h2>
		</div>
	);
}

export default StudentInfo;
