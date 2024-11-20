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
						<h4>Republic of Cameroon</h4>
						<h4>PEACE • WORK • FATHERLAND</h4>
					</div>
					<div className="">
						<h4>Ministry of Secondary Education</h4>
						<h4>
							REGIONAL DELEGATION OF SECONDARY EDUCATION FOR THE SOUTH WEST
						</h4>
						<h4>DIVISIONAL DELEGATION OF SECONDARY EDUCATION FOR FAKO</h4>
					</div>
					<div className="">
						<h4>GOVERNMENT TEACHERS TRAINING COLLEGE</h4>
						<h5>GTTC BUEA</h5>
						<span>
							PO BOX: 222 Buea •{' '}
							<a href="#nothing" style={{ textTransform: 'lowercase' }}>
								www.gttcbuea.com
							</a>
						</span>
					</div>
				</div>
				<img src={lmuLogo} alt="" className="school-logo" />
				<div className="section">
					<div className="">
						<h4>Republiqe du Cameroon</h4>
						<h4>PAIX • TRAVAIL • PATRIE</h4>
					</div>
					<div className="">
						<h4>Ministere Des Enseignements Secondaire</h4>
						<h4>
							DELEGATION REGIONALE DES ENSEIGNEMENTS SECONDAIRES DU SUD- OUEST
						</h4>
						<h4>
							DELEGATION DEPARTMENTALE DES ENSEIGNEMENTS SECONDAIRES DE FAKO
						</h4>
					</div>
					<div className="">
						<h4>ECOLE NORMALE D’INSTITUTEURS DE L’ENSEIGNEMENT GÉNÉRAL</h4>
						<h5>(ENIEG) DE BUÉA</h5>
						<span>
							B.P: 222 Buea • {'  '}
							<a href="#nothing" style={{ textTransform: 'lowercase' }}>
								info@gttcbuea.com
							</a>
						</span>
					</div>
				</div>
			</div>
			<div className="line mg-bt mg-top"></div>
			<h4 className="center">
				ANNE SCOLAIRE / ACADEMIC YEAR {academicYear?.schoolYear}
			</h4>
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
