import { describe, expect, it } from 'vitest';
import data from './leftNavigationData';

describe('leftNavigationData', () => {
	it('combines the main, management and others menus, in that order', () => {
		expect(data.map((section) => section.menu)).toEqual([
			'main',
			'management',
			'others',
		]);
	});

	it('preserves every item from each menu section after the split into per-section files', () => {
		const itemsByMenu = Object.fromEntries(
			data.map((section) => [section.menu, section.items.map((item) => item.item)])
		);

		expect(itemsByMenu.main).toEqual([
			'dashboard',
			'students',
			'teachers',
			'programs',
			'departments',
			'specialties',
			'courses',
			'exam-center',
			'statistics',
			'academic-year',
			'promotion',
		]);
		expect(itemsByMenu.management).toEqual([
			'communication',
			'time table',
			'form-bs',
			'human-resource',
			'poll',
			'accounts',
			'holiday',
			'exam list',
			'events',
			'library',
			'blog',
			'settings',
		]);
		expect(itemsByMenu.others).toEqual(['hostel', 'transport', 'logout']);
	});

	it('gives every item an icon and a visibleRight role list', () => {
		for (const section of data) {
			for (const item of section.items) {
				expect(item.icon).toBeTruthy();
				expect(Array.isArray(item.visibleRight)).toBe(true);
				expect(item.visibleRight.length).toBeGreaterThan(0);
			}
		}
	});
});
