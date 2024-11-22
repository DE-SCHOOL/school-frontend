import React from 'react';
import { notFound } from '../../assets/images';

function SectionNotFound({ text }) {
	return (
		<div className="not-found mg-top">
			<img src={notFound} alt="search not found" />
			<span>{text}</span>
		</div>
	);
}

export default SectionNotFound;
