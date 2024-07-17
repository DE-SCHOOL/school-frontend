import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import {
	MarksAddCA,
	MarksAddExam,
	MarkList,
	MarksAddPreMock,
	MarksAddMock,
} from './../../../screens/pages/marks';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
import StudentMarks from '../../../screens/pages/exam center/StudentsMarks';
import StudentResult from '../../../screens/pages/exam center/StudentResult';
import { StudentResultAll } from '../../../screens/pages/exam center';
import CourseMarkList from '../../../screens/pages/marks/CourseMarkList';
import StudentResit from '../../../screens/pages/exam center/StudentResit';
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
				path="/marks/course/:courseID"
				element={
					<Protected restrict={['admin']}>
						<CourseMarkList />
					</Protected>
				}
			/>
			<Route
				path="/exam center/list"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<MarkList />
					</Protected>
				}
			/>
			<Route
				path="/exam center/student-resit"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<StudentResit />
					</Protected>
				}
			/>
			<Route
				path="/exam center/student-marks"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<StudentMarks />
					</Protected>
				}
			/>
			<Route
				path="/exam center/student-marks/:studentID"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<StudentResult />
					</Protected>
				}
			/>
			<Route
				path="/all/results"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<StudentResultAll />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default MarkRoute;
