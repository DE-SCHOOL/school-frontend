import React from 'react';
import { useSelector } from 'react-redux';

import { MainNav, LeftNav } from '../../navigations';

function Layout({ children }) {
	const stateUi = useSelector((state) => state.uiState.leftNavResponsive);

	return (
		<>
			<MainNav />
			<LeftNav />
			<main className={`main from-left ${stateUi === true ? 'from-left-responsive': ''}`}>
				<br />
				<br />
				{/* <br /> */}
				<br />
				{children}
			</main>
		</>
	);
}

export default Layout;
