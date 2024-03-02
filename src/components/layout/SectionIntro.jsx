import React from 'react';
import { semester } from '../../utilities/periodInfo';

//Styled in the the layout scss file in component styling

function SectionIntro({ title, main, sub }) {
	const sem = semester();
	return (
		<div className="section-intro">
			<h1 className="header-primary">{title}</h1>
			<h2 className="header-secondary">
				<span className="main sem">
					{sem === 's1' ? 'First' : 'Second'} Semester{' '}
				</span>
				<span className="main">{main}</span>
				<span> / </span>
				<span className="sub">{sub}</span>
			</h2>
		</div>
	);
}

export default SectionIntro;
