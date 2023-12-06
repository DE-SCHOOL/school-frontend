import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CommingSoon } from '../../screens/errors';
import { commingUp } from '../../utilities/navLinks';

function ErrorRoute() {
	return (
		<Routes>
			{commingUp.map((link, index) => (
				<Route path={`${link}`} element={<CommingSoon />} key={index} />
			))}
		</Routes>
	);
}

export default ErrorRoute;
