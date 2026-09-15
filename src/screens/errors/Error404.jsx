import React from 'react';
import ErrorPage from './ErrorPage';

function Error404() {
	return (
		<ErrorPage
			codeMessage={'Oops! page not found.'}
			message={'The requested page does not exist.'}
		/>
	);
}

export default Error404;
