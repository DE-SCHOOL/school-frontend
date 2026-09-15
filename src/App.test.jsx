import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import App from './App';
import store from './store/';

// A minimal smoke test: renders the whole app (routing tree included)
// the same way index.js does, and asserts it mounts without throwing.
// There was no test coverage at all before this migration — the
// @testing-library packages in package.json were installed but never
// wired up (no setupTests.js, no test files). This is a starting point,
// not full coverage.
describe('App', () => {
	it('renders without crashing', () => {
		const { container } = render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		expect(container).toBeInTheDocument();
	});
});
