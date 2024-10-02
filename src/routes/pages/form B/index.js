import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import { FormBList, UploadFormB } from '../../../screens/pages/form Bs';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function FormBRoute() {
	return (
		<Routes>
			<Route
				path="/form bs/formb-list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<FormBList />
					</Protected>
				}
			/>
			<Route
				path="/form bs/upload-form-bs"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<UploadFormB />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default FormBRoute;
