import { Routes, Route } from 'react-router-dom';
import { SignIn, ForgotPassword } from '../../screens/authentication';

function AuthRoute() {
	return (
		<Routes>
			{/* <Route path="register" element={< Register />} /> */}
			<Route path="/auth/signin" element={<SignIn />} />
			<Route path="/auth/forgot-password" element={<ForgotPassword />} />
			<Route path="/" element={<SignIn />} />
		</Routes>
	);
}

export default AuthRoute;
