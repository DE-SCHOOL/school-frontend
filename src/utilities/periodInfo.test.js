import { afterEach, describe, expect, it } from 'vitest';
import { semester } from './periodInfo';

describe('semester', () => {
	afterEach(() => {
		localStorage.clear();
	});

	it('defaults to s1 and persists it to localStorage when nothing is set', () => {
		expect(localStorage.getItem('semester')).toBeNull();
		expect(semester()).toBe('s1');
		expect(JSON.parse(localStorage.getItem('semester'))).toEqual({ current: 's1' });
	});

	it('returns whatever semester is already persisted in localStorage', () => {
		localStorage.setItem('semester', JSON.stringify({ current: 's2' }));
		expect(semester()).toBe('s2');
	});

	it('does not overwrite an existing persisted value', () => {
		localStorage.setItem('semester', JSON.stringify({ current: 's2' }));
		semester();
		expect(JSON.parse(localStorage.getItem('semester'))).toEqual({ current: 's2' });
	});
});
