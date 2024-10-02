import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import {
	AddGroup,
	GroupEdit,
	GroupList,
	Messaging,
} from '../../../screens/pages/messaging';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function MessagingRoute() {
	return (
		<Routes>
			<Route
				path="/communication/add-group"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<AddGroup />
					</Protected>
				}
			/>
			<Route
				path="/communication/group-messaging"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<Messaging />
					</Protected>
				}
			/>
			<Route
				path="/communication/group-list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<GroupList />
					</Protected>
				}
			/>
			<Route
				path="/communication/group/edit/:id"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<GroupEdit />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default MessagingRoute;
