import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//importing the useSelector  and dispatchers
import { useDispatch, useSelector } from 'react-redux';

import AuthAnimator from '../../components/auth/AuthAnimator';

//importing the action creator function
import { login } from '../../store/auth/authSlice';

function Signin() {
	//initializing states for email and password
	const [signInEmail, setSignInEmail] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

	//creating dispatch function and getting API info;
	const dispatch = useDispatch();
	const logInData = useSelector((state) => state.auth);

	//creating location changer
	const navigate = useNavigate();

	function handleSignIn(e) {
		e.preventDefault();
		const data = {
			email: signInEmail,
			password: signInPassword,
		};
		//execute the login functions
		dispatch(login(data));

		// ? clear the form after the data has been submitted
		// setSignInEmail('');
		// setSignInPassword('');
	}

	//PREFERABLE TO USE THE USEeFFECT HOOK here -------------------------------------------<<<<<<<<<<<
	// On successful login, redirect user to new page
	if (logInData.isLoggedIn || logInData.user) {
		// console.log('User successfully logged in');
		navigate('/teachers/add');
	}

	return (
		<div className="auth">
			<AuthAnimator />

			<div className="form">
				<form onSubmit={handleSignIn}>
					<h1>Login</h1>
					<p>Enter your email and password to access your account</p>

					<div className="email">
						<label htmlFor="email">Email: </label>
						<input
							type="email"
							name="email"
							value={signInEmail}
							placeholder="your@email.com"
							onChange={(e) => setSignInEmail(e.target.value)}
							autoComplete="email"
						/>
					</div>

					<div className="password">
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={signInPassword}
							onChange={(e) => setSignInPassword(e.target.value)}
						/>
					</div>

					<div className="forgot">
						<button>Login</button>
						<a href="./forgot-password">Forgot Password?</a>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signin;
