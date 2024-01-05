import React from 'react';
import { FaArrowDown, FaPlus } from 'react-icons/fa6';
import { BsRepeat } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

//importing link
import { Link } from 'react-router-dom';

//Styled in the layout sass file in components stying

//Sections name, download button, refresh button and Add button
function SectionMainIntro({ title, styles, link }) {
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
					<span className="text">Download</span>
				</button>
				<Link to={link}>
					<button className="button-main button-main-small">
						<FaPlus />
						<span className="text">Add</span>
					</button>
				</Link>
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

export default SectionMainIntro;
