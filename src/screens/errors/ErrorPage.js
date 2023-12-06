import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

function ErrorPage({ codeMessage, message }) {
	return (
		<div className="page">
			<div className="error">
				<div className="error--icon">
					<AiOutlineHome />
				</div>
				<h1 className="header--primary">{codeMessage}</h1>
				<span className="text">{message}</span>
				<center>
					<Link className="link" to="/">
						<button className="btn btn--err">
							<span>Back Home</span>
							<AiOutlineHome />
						</button>
					</Link>
				</center>
			</div>
		</div>
	);
}

export default ErrorPage;
