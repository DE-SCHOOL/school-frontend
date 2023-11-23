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
			<Route path="/students">
				<Route
					path="list"
					element={
						<Protected restrict={RIGHTS.TO_ALL}>
							<StudentList />
						</Protected>
					}
				/>
				<Route
					path="view"
					element={
						<Protected restrict={RIGHTS.TO_ALL}>
							<StudentView />
						</Protected>
					}
				/>
				<Route
					path="add"
					element={
						<Protected restrict={RIGHTS.TO_ALL_OFFICE_STAFF}>
							<StudentAdd />
						</Protected>
					}
				/>
				<Route
					path="edit"
					element={
						<Protected restrict={RIGHTS.TO_ALL_OFFICE_STAFF}>
							<StudentAdd />
						</Protected>
					}
				/>
			</Route>
		</Routes>
	);
}

export default StudentRoute;
