import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import {
	DepartmentAdd,
	DepartmentList,
} from './../../../screens/pages/departments';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function DepartmentRoute() {
	return (
		<Routes>
			<Route path="/departments">
				<Route
					path="add"
					element={
						<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
							<DepartmentAdd />
						</Protected>
					}
				/>
				<Route
					path="list"
					element={
						<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
							<DepartmentList />
						</Protected>
					}
				/>
			</Route>
		</Routes>
	);
}

export default DepartmentRoute;
