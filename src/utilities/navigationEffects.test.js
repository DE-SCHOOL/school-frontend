import { describe, expect, it, vi } from 'vitest';
import HandleNavEffects from './navigationEffects';

describe('HandleNavEffects', () => {
	it('dispatches the logout action and navigates to signin on "logout"', () => {
		const dispatcher = vi.fn();
		const actionCreator = vi.fn(() => ({ type: 'user/logout' }));
		const navigate = vi.fn();

		HandleNavEffects('logout', dispatcher, actionCreator, navigate);

		expect(actionCreator).toHaveBeenCalledOnce();
		expect(dispatcher).toHaveBeenCalledWith({ type: 'user/logout' });
		expect(navigate).toHaveBeenCalledWith('/auth/signin');
	});

	it('does nothing for any other item', () => {
		const dispatcher = vi.fn();
		const actionCreator = vi.fn();
		const navigate = vi.fn();

		HandleNavEffects('profile', dispatcher, actionCreator, navigate);

		expect(dispatcher).not.toHaveBeenCalled();
		expect(actionCreator).not.toHaveBeenCalled();
		expect(navigate).not.toHaveBeenCalled();
	});
});
