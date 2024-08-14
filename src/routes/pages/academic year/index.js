import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddYear } from '../../../screens/pages/academic year';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';

function AcademicYear() {
	return (
		<Routes>
			<Route
				path="/academic year/add-year"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<AddYear />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default AcademicYear;
