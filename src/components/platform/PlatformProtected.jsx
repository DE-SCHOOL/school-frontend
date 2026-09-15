import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mirrors components/auth/Protected.jsx's pattern, against the
// platform's own separate session key — a school staff session
// ('loggedIn') must never grant access here, and vice versa.
function PlatformProtected({ children }) {
	const navigate = useNavigate();
	const platformStaff = JSON.parse(localStorage.getItem('platformLoggedIn')) || null;

	useEffect(() => {
		if (!platformStaff?.token) {
			navigate('/platform/login');
		}
		// eslint-disable-next-line
	}, [navigate]);

	if (!platformStaff?.token) return null;

	return <>{children}</>;
}

export default PlatformProtected;
