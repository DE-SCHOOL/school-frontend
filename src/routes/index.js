import React from 'react';
import { Route, Routes } from 'react-router-dom';

//PAGES
import StudentRoute from './pages/students';
import TeacherRoute from './pages/teachers';
import AuthRoute from './authentication';
import Loader from '../components/loaders/Loader';
import DepartmentRoute from './pages/departments';

function Router() {
	return (
		<>
			<Routes>
				<Route path="/loader" element={<Loader />} />
			</Routes>
			<StudentRoute />
			<TeacherRoute />
			<DepartmentRoute />
			<AuthRoute />
		</>
	);
}

export default Router;
