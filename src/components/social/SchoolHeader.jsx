import React from 'react';
import { lmuLogo } from './../../assets/logos';

function SchoolHeader({ school }) {
	return (
		<React.Fragment>
			<div className="school-header line">
				<div className="section-1">
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
				<img src={lmuLogo} alt="The school logo" />
				<div className="section-2">
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
		</React.Fragment>
	);
}

export default SchoolHeader;
