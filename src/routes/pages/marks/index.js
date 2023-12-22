import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import { MarksAdd } from './../../../screens/pages/marks';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function MarkRoute() {
	return (
		<Routes>
			<Route
				path="/marks/:courseID/add"
				element={
					<Protected restrict={RIGHTS.TO_ALL_STAFF}>
						<MarksAdd />
					</Protected>
				}
			/>
			{/* <Route
				path="/programs/list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_STAFF}>
						<ProgramList />
					</Protected>
				}
			/>
			<Route
				path="/programs/view/:id"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<ProgramView />
					</Protected>
				}
			/> */}
		</Routes>
	);
}

export default MarkRoute;
