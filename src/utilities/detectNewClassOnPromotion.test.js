import { describe, expect, it } from 'vitest';
import { detectNewClassOnPromotion } from './detectNewClassOnPromotion';

describe('detectNewClassOnPromotion', () => {
	it.each([
		[100, 200],
		[200, 300],
		[300, 400],
		[400, 500],
		[601, 602],
		[602, 603],
	])('promotes level %i to %i', (input, expected) => {
		expect(detectNewClassOnPromotion(input)).toBe(expected);
	});

	it('leaves a level outside the promotable ranges unchanged', () => {
		expect(detectNewClassOnPromotion(500)).toBe(500);
		expect(detectNewClassOnPromotion(603)).toBe(603);
	});

	it('coerces a string level to a number before comparing', () => {
		expect(detectNewClassOnPromotion('100')).toBe(200);
	});
});
