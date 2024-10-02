import React from 'react';
// import { useSelector } from 'react-redux';

import { MainNav } from '../../navigations';

function LayoutMainNav({ children }) {
	// const stateUi = useSelector((state) => state.uiState.leftNavResponsive);

	return (
		<>
			<MainNav styleClass="main-nav__only" />
			{/* <LeftNav /> */}
			{/* <main
				className={`main from-left ${
					stateUi === true ? 'from-left-responsive' : ''
				}`}
			> */}
			<br />
			<br />
			{/* <br /> */}
			<br />
			<br />
			{children}
			{/* </main> */}
		</>
	);
}

export default LayoutMainNav;
