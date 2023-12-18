import React from 'react';

//PAGES ROUTES
import StudentRoute from './pages/students';
import TeacherRoute from './pages/teachers';
import AuthRoute from './authentication';
import DashboardRoute from './pages/dashboards';
import DepartmentRoute from './pages/departments';
import ProgramRoute from './pages/programs';
import SpecialtyRoute from './pages/specialties';
import CourseRoute from './pages/courses';
import ErrorRoute from './errors';

function Router() {
	return (
		<React.Fragment>
			<StudentRoute />
			<TeacherRoute />
			<DepartmentRoute />
			<ProgramRoute />
			<AuthRoute />
			<DashboardRoute />
			<SpecialtyRoute />
			<CourseRoute />
			<ErrorRoute />
		</React.Fragment>
	);
}

export default Router;
