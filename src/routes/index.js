import React from 'react';
import { Route, Routes } from 'react-router-dom';

//PAGES ROUTES
import StudentRoute from './pages/students';
import TeacherRoute from './pages/teachers';
import AuthRoute from './authentication';
import Loader from '../components/loaders/Loader';
import DashboardRoute from './pages/dashboards';
import DepartmentRoute from './pages/departments';
import SpecialtyRoute from './pages/specialties';

// import AdminDashboard from '../components/dashboards/AdminDashboard';

function Router() {
	return (
		<>
			<Routes>
				<Route path="/loader" element={<Loader />} />
				<Route path="/loader" element={<Loader />} />
				{/* <Route path="/admin" element={<AdminDashboard />} /> */}
			</Routes>
			<StudentRoute />
			<TeacherRoute />
			<DepartmentRoute />
			<AuthRoute />
			<DashboardRoute />
			<SpecialtyRoute />
		</>
	);
}

export default Router;
