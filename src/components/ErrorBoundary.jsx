import React from 'react';
import * as Sentry from '@sentry/react';

// Errors thrown during render previously had nowhere to go but the browser
// console and a blank page. This is the one place in the tree that can both
// show the user something other than a blank page and forward the error
// somewhere a developer will actually see it.
class ErrorBoundary extends React.Component {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.error(error, info);
		Sentry.captureException(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="signal failed">
					<div className="content">
						<span>Something went wrong.</span>
						<span className="msg">
							Please refresh the page and try again.
						</span>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
