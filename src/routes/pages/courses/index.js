import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';

//IMPORTING the different pages
import { CourseAdd, CourseList } from './../../../screens/pages/courses';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function CourseRoute() {
	return (
		<Routes>
			<Route path="/courses">
				<Route
					path="add"
					element={
						<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
							<CourseAdd />
						</Protected>
					}
				/>
				<Route
					path="list"
					element={
						<Protected restrict={RIGHTS.TO_ALL_STAFF}>
							<CourseList />
						</Protected>
					}
				/>
			</Route>
		</Routes>
	);
}

export default CourseRoute;
