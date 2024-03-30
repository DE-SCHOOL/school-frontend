import { Routes, Route } from 'react-router-dom';
import {
	AllStaffReview,
	StaffReview,
	StaffReviewCourses,
} from '../../../screens/pages/human resource';

function HumanResourceRoutes() {
	return (
		<Routes>
			<Route path="/human resource/review-staff" element={<AllStaffReview />} />
			<Route
				path="/human resource/review-staff/:courseID"
				element={<StaffReview />}
			/>
			<Route
				path="/human resource/staff-courses/:staffID"
				element={<StaffReviewCourses />}
			/>
		</Routes>
	);
}

export default HumanResourceRoutes;
