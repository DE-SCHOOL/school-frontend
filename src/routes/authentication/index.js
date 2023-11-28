import { Routes, Route } from 'react-router-dom';
import { SignIn, ForgotPassword} from '../../screens/authentication';

function AuthRoute() {
	return (
		<Routes>
			<Route path="/auth">
				{/* <Route path="register" element={< Register />} /> */}
				<Route path="signin" element={<SignIn />} />
				<Route path="forgot-password" element={<ForgotPassword />} />
			</Route>
		</Routes>
	);
}

export default AuthRoute;
