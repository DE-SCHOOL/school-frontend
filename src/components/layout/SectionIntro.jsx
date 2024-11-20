import React from 'react';
import { semester } from '../../utilities/periodInfo';
import { useSelector } from 'react-redux';
//Styled in the the layout scss file in component styling

function SectionIntro({ title, main, sub }) {
	const sem = semester();
	const academicYear = useSelector((state) => state.years.currentYear);
	return (
		<div className="section-intro">
			<h1 className="header-primary">{title}</h1>
			<h2 className="header-secondary">
				<span className="main sem">
					{sem === 's1' && (
						<span>
							1<sup>st</sup> Sequence Exam
						</span>
					)}
					{sem === 's2' && (
						<span>
							2<sup>nd</sup> Sequence Exam
						</span>
					)}
					{sem === 's3' && (
						<span>
							3<sup>rd</sup> Sequence Exam
						</span>
					)}
					{sem === 's4' && (
						<span>
							4<sup>th</sup> Sequence Exam
						</span>
					)}
					{sem === 's5' && (
						<span>
							5<sup>th</sup> Sequence Exam
						</span>
					)}
					{sem === 's6' && (
						<span>
							6<sup>th</sup> Sequence Exam
						</span>
					)}{' '}
					{academicYear?._id !== undefined && `${academicYear?.schoolYear}`}{' '}
					{main}
				</span>
				<span className="main-sub-title">
					<span className="main">{main}</span>
					<span> / </span>
					<span className="sub">{sub}</span>
				</span>
			</h2>
		</div>
	);
}

export default SectionIntro;
