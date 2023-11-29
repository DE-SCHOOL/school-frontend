import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
	AdminDashboard,
	TeacherDashboard,
	StudentDashboard,
} from '../../../screens/pages/dashboards';

function DashboardRoute() {
	return (
		<Routes>
			<Route path="/dashboard">
				<Route path="admin" element={<AdminDashboard />} />
				<Route path="teacher" element={<TeacherDashboard />} />
				<Route path="student" element={<StudentDashboard />} />
			</Route>
		</Routes>
	);
}
export default DashboardRoute;
