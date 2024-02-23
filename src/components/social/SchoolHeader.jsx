import React from 'react';
import { lmuLogo } from './../../assets/logos';

function SchoolHeader({ school }) {
	return (
		<React.Fragment>
			<div className="school-header line">
				<div className="section-1">
					<span className="name">{school.name}</span>
					<span className="">{school.box}</span>
					<span className="name">{school.region}</span>
					<span className="name">Tel: {school.tel}</span>
					<span className="name">Email: {school.email}</span>
				</div>
				<img src={lmuLogo} alt="The school logo" />
				<div className="section-2">
					<span className="name">{school.country}</span>
					<span className="name">{school.motto}</span>
					<span className="name">{school.ministry}</span>
				</div>
			</div>
		</React.Fragment>
	);
}

export default SchoolHeader;
