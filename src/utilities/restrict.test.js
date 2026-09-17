import { describe, expect, it } from 'vitest';
import {
	TO_ALL,
	TO_ALL_STAFF,
	TO_ALL_OFFICE_STAFF,
	TO_ALL_OFFICE_ADMIN,
	TO_MAIN_ADMIN,
	rolePriority,
} from './restrict';

describe('restrict role groups', () => {
	it('TO_ALL includes every real role, students included', () => {
		expect(TO_ALL).toEqual(['student', 'lecturer', 'secreteriat', 'hod', 'director', 'admin']);
	});

	it('TO_ALL_STAFF excludes students', () => {
		expect(TO_ALL_STAFF).not.toContain('student');
		expect(TO_ALL_STAFF).toEqual(['lecturer', 'secreteriat', 'hod', 'director', 'admin']);
	});

	it('each narrower group is a subset of the next-broader one', () => {
		for (const role of TO_MAIN_ADMIN) expect(TO_ALL_OFFICE_ADMIN).toContain(role);
		for (const role of TO_ALL_OFFICE_ADMIN) expect(TO_ALL_OFFICE_STAFF).toContain(role);
		for (const role of TO_ALL_OFFICE_STAFF) expect(TO_ALL_STAFF).toContain(role);
		for (const role of TO_ALL_STAFF) expect(TO_ALL).toContain(role);
	});

	it('TO_MAIN_ADMIN is only director and admin', () => {
		expect(TO_MAIN_ADMIN).toEqual(['director', 'admin']);
	});

	it('rolePriority ranks admin as the highest priority (lowest number)', () => {
		const admin = rolePriority.find((r) => r.role === 'admin');
		const lecturer = rolePriority.find((r) => r.role === 'lecturer');
		expect(admin.priority).toBeLessThan(lecturer.priority);
	});

	it('rolePriority has exactly one entry per staff role, no duplicates', () => {
		const roles = rolePriority.map((r) => r.role);
		expect(new Set(roles).size).toBe(roles.length);
		expect(roles.sort()).toEqual([...TO_ALL_STAFF].sort());
	});
});
