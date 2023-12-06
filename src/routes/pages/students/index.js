import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import {
	StudentAdd,
	StudentList,
	StudentView,
} from '../../../screens/pages/students';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function StudentRoute() {
	return (
		<Routes>
			<Route
				path="/students/list"
				element={
					<Protected restrict={RIGHTS.TO_ALL}>
						<StudentList />
					</Protected>
				}
			/>
			<Route
				path="/students/view"
				element={
					<Protected restrict={RIGHTS.TO_ALL}>
						<StudentView />
					</Protected>
				}
			/>
			<Route
				path="/students/add"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_STAFF}>
						<StudentAdd />
					</Protected>
				}
			/>
			<Route
				path="/students/edit"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_STAFF}>
						<StudentAdd />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default StudentRoute;
