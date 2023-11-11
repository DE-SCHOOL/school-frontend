import React from 'react';

//PAGES
import StudentRoute from './pages/students';
import TeacherRoute from './pages/teachers';
import AuthRoute from './authentication';

function Router() {
	return (
		<>
			<StudentRoute />
			<TeacherRoute />
			<AuthRoute />
		</>
	);
}

export default Router;
