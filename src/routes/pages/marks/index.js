import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import {
	MarksAddCA,
	MarksAddExam,
	MarkList,
	MarksAddPreMock,
	MarksAddMock
} from './../../../screens/pages/marks';

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
			<Route
				path="/marks/:courseID/pre-mock/add"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<MarksAddPreMock />
					</Protected>
				}
			/>
			<Route
				path="/marks/:courseID/mock/add"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<MarksAddMock />
					</Protected>
				}
			/>
			<Route
				path="/marks/list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<MarkList />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default MarkRoute;
