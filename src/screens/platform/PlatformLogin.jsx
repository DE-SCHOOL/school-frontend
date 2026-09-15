import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { platformLogin } from '../../store/platform/platformAuthSlice';

function PlatformLogin() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, isLoggedIn, error, errorMessage } = useSelector((state) => state.platformAuth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		const existing = JSON.parse(localStorage.getItem('platformLoggedIn'));
		if (isLoggedIn || existing?.token) {
			navigate('/platform/dashboard');
		}
	}, [isLoggedIn, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(platformLogin({ email, password }));
	};

	return (
		<div className="platform-login-page">
			<div className="platform-login-card">
				<h1>Platform Console</h1>
				<p className="form-sub">Internal DE-SCHOOL operations login — not for school staff.</p>

				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="you@deschool.cm"
						autoComplete="email"
						required
					/>

					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						autoComplete="current-password"
						required
					/>

					<div className="form-actions">
						<button type="submit" className="btn btn-solid btn-full" disabled={isLoading}>
							{isLoading ? 'Signing in…' : 'Sign in'}
						</button>
					</div>

					{error && <div className="inline-error">{errorMessage}</div>}
				</form>

				<p className="form-sub" style={{ marginTop: '2.5rem' }}>
					Looking for your school's login instead? <Link to="/auth/signin">Go there</Link>.
				</p>
			</div>
		</div>
	);
}

export default PlatformLogin;
