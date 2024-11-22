import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import { ProgramEdit } from './../../../screens/pages/programs';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
import PollAdd from '../../../screens/pages/polls/PollAdd';
import PollList from '../../../screens/pages/polls/PollList';
import { PollEdit } from '../../../screens/pages/polls';
function ProgramRoute() {
	return (
		<Routes>
			<Route
				path="/poll/add"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_STAFF}>
						<PollAdd />
					</Protected>
				}
			/>
			<Route
				path="/poll/list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_STAFF}>
						<PollList />
					</Protected>
				}
			/>
			<Route
				path="/poll/edit/:id"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_STAFF}>
						<PollEdit />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default ProgramRoute;
