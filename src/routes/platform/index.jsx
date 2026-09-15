import { Routes, Route } from 'react-router-dom';
import PlatformLogin from '../../screens/platform/PlatformLogin';
import PlatformDashboard from '../../screens/platform/PlatformDashboard';
import PlatformProtected from '../../components/platform/PlatformProtected';

function PlatformRoute() {
	return (
		<Routes>
			<Route path="/platform/login" element={<PlatformLogin />} />
			<Route
				path="/platform/dashboard"
				element={
					<PlatformProtected>
						<PlatformDashboard />
					</PlatformProtected>
				}
			/>
		</Routes>
	);
}

export default PlatformRoute;
