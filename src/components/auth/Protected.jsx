import React, { useEffect } from 'react';

//import location changer
import { Navigate, useNavigate } from 'react-router-dom';

function Protected({ children, restrict }) {
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem('loggedIn')) || null;

	// console.log(user, restrict.includes(user.role));

	useEffect(() => {
		if (!restrict.includes(user?.role)) {
			return navigate(-1);
		}
	}, [navigate]);

	return <>{children}</>;
}

export default Protected;
