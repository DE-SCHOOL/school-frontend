import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
	AdminDashboard,
	TeacherDashboard,
	StudentDashboard,
	MyStudents,
} from '../../../screens/pages/dashboards';

import {
	AsignStaffCourses,
	EditAsignedStaffCourses,
	ViewAllStaffCourses,
} from './../../../screens/pages/staff courses';

import Protected from './../../../components/auth/Protected';
import * as RIGHT from './../../../utilities/restrict';

function DashboardRoute() {
	return (
		<Routes>
			<Route
				path="/dashboard/admin"
				element={
					<Protected restrict={['admin']}>
						<AdminDashboard />
					</Protected>
				}
			/>
			<Route
				path="/dashboard/teacher"
				element={
					<Protected restrict={RIGHT.TO_ALL_STAFF}>
						<TeacherDashboard />
					</Protected>
				}
			/>
			<Route
				path="/dashboard/student"
				element={
					<Protected restrict={['student']}>
						<StudentDashboard />
					</Protected>
				}
			/>
			<Route
				path="/dashboard/course-assign"
				element={
					<Protected restrict={RIGHT.TO_ALL_OFFICE_ADMIN}>
						<AsignStaffCourses />
					</Protected>
				}
			/>
			<Route
				path="/dashboard/staff-course"
				element={
					<Protected restrict={RIGHT.TO_ALL_OFFICE_ADMIN}>
						<ViewAllStaffCourses />
					</Protected>
				}
			/>
			<Route
				path="/dashboard/staff-course/edit/:teacherID"
				element={
					<Protected restrict={RIGHT.TO_ALL_OFFICE_ADMIN}>
						<EditAsignedStaffCourses />
					</Protected>
				}
			/>
			<Route
				path="/dashboard/my-students"
				element={
					<Protected restrict={RIGHT.TO_ALL_STAFF}>
						<MyStudents />
					</Protected>
				}
			/>
		</Routes>
	);
}
export default DashboardRoute;
