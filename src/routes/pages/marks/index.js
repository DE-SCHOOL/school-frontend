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

import StudentResultAllSequence from '../../../screens/pages/exam center/StudentResultAllSequence';
import StudentResultAllTerm from '../../../screens/pages/exam center/StudentResultAllTerm';
import StudentResultSequence from '../../../screens/pages/exam center/StudentResultSequence';
import StudentResultTerm from '../../../screens/pages/exam center/StudentResultTerm';
import StudentsResults from '../../../screens/pages/exam center/StudentsResults';
import StudentsResultsYear from '../../../screens/pages/exam center/StudentsResultsYear';
import CourseMarkList from '../../../screens/pages/marks/CourseMarkList';
import StudentResit from '../../../screens/pages/exam center/StudentResit';

import AllResit from '../../../screens/pages/exam center/AllResit';
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
					<Protected restrict={RIGHTS.TO_ALL_STAFF}>
						{' '}
						{/**Was to main_admin */}
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
				path="/exam center/all-resit"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<AllResit />
					</Protected>
				}
			/>
			<Route
				path="/exam center/student-results"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<StudentsResults />
					</Protected>
				}
			/>
			<Route
				path="/exam center/term/student-results/:studentID"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<StudentResultTerm />
					</Protected>
				}
			/>
			<Route
				path="/exam center/sequence/student-results/:studentID"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<StudentResultSequence />
					</Protected>
				}
			/>
			<Route
				path="/all/results/term"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<StudentResultAllTerm />
					</Protected>
				}
			/>
			<Route
				path="/all/results/sequence"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<StudentResultAllSequence />
					</Protected>
				}
			/>
			<Route
				path="/all/results/year"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<StudentsResultsYear />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default MarkRoute;
