import { describe, expect, it } from 'vitest';
import { detectNewClassOnDemote } from './detectNewClassOnDemote';

describe('detectNewClassOnDemote', () => {
	it.each([
		[300, 200],
		[400, 300],
		[500, 400],
		[602, 601],
		[603, 602],
	])('demotes level %i to %i', (input, expected) => {
		expect(detectNewClassOnDemote(input)).toBe(expected);
	});

	it('leaves a level outside the demotable ranges unchanged', () => {
		expect(detectNewClassOnDemote(100)).toBe(100);
		expect(detectNewClassOnDemote(200)).toBe(200);
		expect(detectNewClassOnDemote(601)).toBe(601);
	});

	it('coerces a string level to a number before comparing', () => {
		expect(detectNewClassOnDemote('300')).toBe(200);
	});
});
