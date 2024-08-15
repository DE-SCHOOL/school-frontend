import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PromoteStudents } from '../../../screens/pages/promotions';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';

function Promotions() {
	return (
		<Routes>
			<Route
				path="/promotion/promote-students"
				element={
					<Protected restrict={RIGHTS.TO_MAIN_ADMIN}>
						<PromoteStudents />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default Promotions;
