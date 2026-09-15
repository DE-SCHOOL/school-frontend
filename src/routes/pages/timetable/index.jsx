import React from 'react';
import { Routes, Route } from 'react-router-dom';

//IMPORTING the different pages
import { TimetableList, UploadTimetable } from '../../../screens/pages/timetable';

//importing a protector component
import Protected from '../../../components/auth/Protected';

// importing different rights
import * as RIGHTS from './../../../utilities/restrict';
function TimetableRoute() {
	return (
		<Routes>
			<Route
				path="/time table/upload-timetable"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<UploadTimetable />
					</Protected>
				}
			/>
			<Route
				path="/time table/timetable-list"
				element={
					<Protected restrict={RIGHTS.TO_ALL_OFFICE_ADMIN}>
						<TimetableList />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default TimetableRoute;
