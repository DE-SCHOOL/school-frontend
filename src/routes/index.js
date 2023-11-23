import React from 'react';
import { Route, Routes } from 'react-router-dom';

//PAGES
import StudentRoute from './pages/students';
import TeacherRoute from './pages/teachers';
import AuthRoute from './authentication';
import Loader from '../components/loaders/Loader';
import DashboardRoute from './pages/dashboards';



function Router() {
	return (
		<>
			<Routes>
				<Route path='/loader' element={<Loader />} />
			</Routes>
			<StudentRoute />
			<TeacherRoute />
			<AuthRoute />
			<DashboardRoute />
		</>
	);
}

export default Router;
