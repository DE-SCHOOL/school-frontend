import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
	AdminDashboard,
	TeacherDashboard,
	StudentDashboard,
} from '../../../screens/pages/dashboards';

import { AsignStaffCourses, ViewAllStaffCourses } from './../../../screens/pages/staff courses';

import Protected from './../../../components/auth/Protected';
import * as RIGHT from './../../../utilities/restrict';

function DashboardRoute() {
	return (
		<Routes>
			<Route path="/dashboard">
				<Route
					path="admin"
					element={
						<Protected restrict={['admin']}>
							<AdminDashboard />
						</Protected>
					}
				/>
				<Route
					path="teacher"
					element={
						<Protected restrict={RIGHT.TO_ALL_STAFF}>
							<TeacherDashboard />
						</Protected>
					}
				/>
				<Route
					path="student"
					element={
						<Protected restrict={['student']}>
							<StudentDashboard />
						</Protected>
					}
				/>
				<Route
					path="course-assign"
					element={
						<Protected restrict={RIGHT.TO_MAIN_ADMIN}>
							<AsignStaffCourses />
						</Protected>
					}
				/>
				<Route
					path="staff-course"
					element={
						<Protected restrict={RIGHT.TO_MAIN_ADMIN}>
							<ViewAllStaffCourses />
						</Protected>
					}
				/>
			</Route>
		</Routes>
	);
}
export default DashboardRoute;
