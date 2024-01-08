import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import {
	ProgramAdd,
	ProgramList,
	ProgramView,
	ProgramEdit,
} from './../../../screens/pages/programs';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function ProgramRoute() {
	return (
		<Routes>
			<Route
				path="/programs/add"
				element={
					<Protected restrict={['admin']}>
						<ProgramAdd />
					</Protected>
				}
			/>
			<Route
				path="/programs/list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_STAFF}>
						<ProgramList />
					</Protected>
				}
			/>
			<Route
				path="/programs/view/:id"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<ProgramView />
					</Protected>
				}
			/>
			<Route
				path="/programs/edit/:id"
				element={
					<Protected restrict={['admin']}>
						<ProgramEdit />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default ProgramRoute;
