import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import {
	SpecialtyAdd,
	SpecialtyEdit,
	SpecialtyList,
	SpecialtyView,
} from './../../../screens/pages/specialties/';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function SpecialtyRoute() {
	return (
		<Routes>
			<Route
				path="/specialties/add"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<SpecialtyAdd />
					</Protected>
				}
			/>
			<Route
				path="/specialties/list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_STAFF}>
						<SpecialtyList />
					</Protected>
				}
			/>
			<Route
				path="/specialties/view/:id"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<SpecialtyView />
					</Protected>
				}
			/>
			<Route
				path="/specialties/edit/:id"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<SpecialtyEdit />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default SpecialtyRoute;
