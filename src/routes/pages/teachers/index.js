import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
	TeacherAdd,
	TeacherList,
	TeacherView,
} from '../../../screens/pages/teachers';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';

function TeacherRoute() {
	return (
		<Routes>
			<Route path="/teachers">
				<Route
					path="add"
					element={
						<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
							<TeacherAdd />
						</Protected>
					}
				/>
				<Route
					path="list"
					element={
						<Protected restrict={RIGHTS.TO_ALL_STAFF}>
							<TeacherList />
						</Protected>
					}
				/>
				<Route
					path="view"
					element={
						<Protected restrict={RIGHTS.TO_ALL_STAFF}>
							<TeacherView />
						</Protected>
					}
				/>
			</Route>
		</Routes>
	);
}

export default TeacherRoute;
