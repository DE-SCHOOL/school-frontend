import React, { useEffect } from 'react';
import { getDateFromDateObject } from '../../utilities/getDate';
import { academicTerm, semester } from '../../utilities/periodInfo';
import { useSelector, useDispatch } from 'react-redux';
import { lmuLogo } from './../../assets/logos';
import { getCurrentYear } from '../../store/academic year/academicYearSlice';
import { returnClassString } from '../../utilities/getClassString';

function StudentInfo({ student, styles = '', identify = '', isTerm = true }) {
	const academicYear = useSelector((state) => state.years.currentYear);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentYear());
	}, [dispatch]);
	return (
		<div className={`student-detail-results ${styles}`} key={identify}>
			<div className="stud-info">
				<div className="section">
					<div className="">
						<h3>Republiqe du Cameroon</h3>
						<h5>PAIX • TRAVAIL • PATRIE</h5>
					</div>
					<div className="">
						<h4>Ministere Des Enseignements Secondaire</h4>
						<h5>Delegation Regionale Du Sud-ouest</h5>
						<h5>Delegation Departmental De La Fako</h5>
					</div>
					<div className="">
						<h2>Lycee Bilingue De Mile 17</h2>
						<span>B.P: 222 Buea • Tel: 233 44 44 44</span>
					</div>
				</div>
				<img src={lmuLogo} alt="" className="school-logo" />
				<div className="section">
					<div className="">
						<h3>Republic of Cameroon</h3>
						<h5>PEACE • WORK • FATHERLAND</h5>
					</div>
					<div className="">
						<h4>Ministry of Secondary Education</h4>
						<h5>Regional Delegation of the South West</h5>
						<h5>Divisional Delegation of Fako</h5>
					</div>
					<div className="">
						<h2>GBHS Mile 17</h2>
						<span>PO BOX: 222 Buea • Phone: 233 44 44 44</span>
					</div>
				</div>
			</div>
			{/* <div className="stud-info mg-top">
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
			</div> */}
			<div className="line mg-bt mg-top"></div>
			<h5 className="center">
				ANNE SCOLAIRE / ACADEMIC YEAR {academicYear?.schoolYear}
			</h5>
			{isTerm && (
				<h2 className="header-secondary center mg-top-lg report-title">
					{academicTerm() === 't1' ? 'First Term' : ''}
					{academicTerm() === 't2' ? 'Second Term' : ''}
					{academicTerm() === 't3' ? 'Third Term' : ''} Report Card
				</h2>
			)}
			{isTerm === false && (
				<h2 className="header-secondary center mg-top-lg report-title">
					{semester() === 's1' ? 'First Sequence' : ''}
					{semester() === 's2' ? 'Second Sequence' : ''}
					{semester() === 's3' ? 'Third Sequence' : ''}
					{semester() === 's4' ? 'Fourth Sequence' : ''}
					{semester() === 's5' ? 'Fifth Sequence' : ''}
					{semester() === 's6' ? 'Sixth Sequence' : ''} Report Card
				</h2>
			)}
			<table className="results mg-top">
				<tbody>
					<tr>
						<td className="title title-border">full names</td>
						<td>{student.name}</td>
						<td className="title title-border">class</td>
						<td>{returnClassString(student.level)}</td>
					</tr>
					<tr>
						<td className="title title-border">registration number</td>
						<td>f1280373</td>
						<td className="title title-border">specialty</td>
						<td>{student.specialty.name}</td>
					</tr>
					<tr>
						<td className="title">date of birth</td>
						<td>{getDateFromDateObject(student.dob)}</td>
						<td className="title">gender</td>
						<td>{student.gender}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default StudentInfo;
