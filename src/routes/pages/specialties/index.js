import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import {
	SpecialtyAdd,
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
			<Route path="/specialties">
				<Route
					path="add"
					element={
						<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
							<SpecialtyAdd />
						</Protected>
					}
				/>
				<Route
					path="list"
					element={
						<Protected restrict={RIGHTS.TO_ALL_STAFF}>
							<SpecialtyList />
						</Protected>
					}
				/>
				<Route
					path="view/:id"
					element={
						<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
							<SpecialtyView />
						</Protected>
					}
				/>
			</Route>
		</Routes>
	);
}

export default SpecialtyRoute;
