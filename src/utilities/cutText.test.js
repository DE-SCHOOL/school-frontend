import { describe, expect, it } from 'vitest';
import { cutText } from './cutText';

describe('cutText', () => {
	it('truncates and appends an ellipsis when text exceeds maxLength', () => {
		expect(cutText('a very long piece of text', 10)).toBe('a very lon...');
	});

	it('returns the original text unchanged when within maxLength', () => {
		expect(cutText('short', 10)).toBe('short');
	});

	it('returns the original text when exactly at maxLength', () => {
		expect(cutText('1234567890', 10)).toBe('1234567890');
	});

	it('handles an empty string', () => {
		expect(cutText('', 5)).toBe('');
	});
});
