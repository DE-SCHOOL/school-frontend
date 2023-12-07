import React from 'react';
import { useNavigate } from 'react-router-dom';

function CommingSoon() {
	const navigate = useNavigate();
	return (
		<div className="soon">
			<div className="text">
				Comming Soon{' '}
				<span className="main">
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</span>
				<br />
				<br />
				<button className="btn" onClick={() => navigate(-1)}>
					Previous . . .
				</button>
			</div>
		</div>
	);
}

export default CommingSoon;
