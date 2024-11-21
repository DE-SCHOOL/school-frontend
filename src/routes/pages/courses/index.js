import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { PDFViewer } from '@react-pdf/renderer';

//IMPORTING the different pages
import {
	CourseAdd,
	CourseEdit,
	CourseList,
	MyCourses,
} from './../../../screens/pages/courses';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function CourseRoute() {
	return (
		<Routes>
			<Route
				path="/subjects/add"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<CourseAdd />
					</Protected>
				}
			/>
			<Route
				path="/subjects/list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<CourseList />
					</Protected>
				}
			/>
			<Route
				path="/subjects/my-subjects"
				element={
					<Protected restrict={RIGHTS.TO_ALL_STAFF}>
						<MyCourses />
					</Protected>
				}
			/>
			<Route
				path="/subjects/edit/:id"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<CourseEdit />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default CourseRoute;
