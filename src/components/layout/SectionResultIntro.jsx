import React from 'react';
import { FaArrowDown } from 'react-icons/fa6';
import { BsRepeat } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

//Styled in the layout sass file in components stying

//Sections name, download button, refresh button and Add button
function SectionResultIntro({ title, styles }) {
	const loc = useLocation();
	const handleRefresh = () => {
		window.location = loc.pathname;
		// console.log(loc);
	};
	return (
		<div className={`section-main-intro ${styles ? styles : ''}`}>
			<h2 className="header-secondary">{title}</h2>
			<div className="actions">
				<button className="button-main button-main-small">
					<FaArrowDown />
					<span className="text">Download All Results</span>
				</button>
				<button
					className="button-main button-main-small"
					onClick={handleRefresh}
				>
					<BsRepeat />
				</button>
			</div>
		</div>
	);
}

export default SectionResultIntro;
