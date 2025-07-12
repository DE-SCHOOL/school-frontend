import React from 'react';

import { lmuLogo } from '../../assets/logos';
import leftNavData from './../../assets/data/leftNavigationData';
import LeftNavSection from './LeftNavSection';

//height auto, 0, transition
import './../styles/left-nav.scss';

import { useSelector } from 'react-redux';
function LeftNav() {
	const stateUi = useSelector((state) => state.uiState.leftNavResponsive);
	return (
		<nav
			className={`left-nav ${stateUi === true ? 'left-nav-responsive' : ''}`}
		>
			<header className="header-logo">
				<img src={lmuLogo} alt="Glo Skul Logo" className="logo-pic rounded" />
				<span className="logo">glo skul</span>
			</header>
			<br />
			<br />
			<br />
			<br />
			{leftNavData.map((item, index) => {
				return (
					<LeftNavSection menu={item.menu} items={item.items} key={index} />
				);
			})}
		</nav>
	);
}

export default LeftNav;
