import React from 'react';
import { FaArrowDown } from 'react-icons/fa6';
import { BsRepeat } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

//Styled in the layout sass file in components stying

//Sections name, download button, refresh button and Add button
function SectionStatsIntro({ title, styles }) {
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
					<Link
						to={'/all/statistics'}
						target="_blank"
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						<span className="text">Download All Statistics</span>
					</Link>
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

export default SectionStatsIntro;
