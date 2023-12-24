import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import { MarksAddCA, MarksAddExam } from './../../../screens/pages/marks';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function MarkRoute() {
	return (
		<Routes>
			<Route
				path="/marks/:courseID/ca/add"
				element={
					<Protected restrict={RIGHTS.TO_ALL_STAFF}>
						<MarksAddCA />
					</Protected>
				}
			/>
			<Route
				path="/marks/:courseID/exam/add"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<MarksAddExam />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default MarkRoute;
