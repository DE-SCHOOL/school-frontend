import { describe, expect, it } from 'vitest';
import { studentFormSchema, staffFormSchema, firstValidationError } from './validation';

const validStudent = {
	matricule: 'LMU-24SWE231',
	name: 'Chi John Brown',
	address: 'Buea',
	dob: '2005-10-22',
	pob: 'Buea',
	email: 'student@example.cm',
	tel: '677000000',
	parent_name: 'Parent Name',
	parent_email: 'parent@example.cm',
	parent_tel: '677000001',
	entry_certificate: 'A Level',
	specialty: 'spec1',
	gender: 'male',
	level: '200',
};

const validStaff = {
	name: 'New Staff',
	address: 'Buea',
	matricule: 'S-001',
	dob: '1990-01-01',
	pob: 'Buea',
	tel: '677000000',
	high_certificate: 'BSc',
	email: 'staff@school.cm',
	password: 'password123',
	confirmPassword: 'password123',
	gender: 'male',
	marital_status: 'not married',
	role: 'lecturer',
};

describe('studentFormSchema', () => {
	it('accepts a fully valid payload', () => {
		expect(studentFormSchema.safeParse(validStudent).success).toBe(true);
	});

	it('rejects a phone number that does not start with 6', () => {
		const result = studentFormSchema.safeParse({ ...validStudent, tel: '577000000' });
		expect(result.success).toBe(false);
	});

	it('rejects a phone number with the wrong length', () => {
		const result = studentFormSchema.safeParse({ ...validStudent, parent_tel: '67700' });
		expect(result.success).toBe(false);
	});

	it('rejects an invalid email address', () => {
		const result = studentFormSchema.safeParse({ ...validStudent, email: 'not-an-email' });
		expect(result.success).toBe(false);
	});

	it('rejects a level outside the real backend enum', () => {
		const result = studentFormSchema.safeParse({ ...validStudent, level: '999' });
		expect(result.success).toBe(false);
	});

	it('rejects an empty required field', () => {
		const result = studentFormSchema.safeParse({ ...validStudent, name: '' });
		expect(result.success).toBe(false);
	});
});

describe('staffFormSchema', () => {
	it('accepts a fully valid payload', () => {
		expect(staffFormSchema.safeParse(validStaff).success).toBe(true);
	});

	it('rejects a password shorter than 8 characters', () => {
		const result = staffFormSchema.safeParse({ ...validStaff, password: 'short', confirmPassword: 'short' });
		expect(result.success).toBe(false);
	});

	it('rejects when password and confirmPassword do not match', () => {
		const result = staffFormSchema.safeParse({ ...validStaff, confirmPassword: 'somethingElse123' });
		expect(result.success).toBe(false);
		expect(result.error.issues[0].path).toEqual(['confirmPassword']);
	});

	it('rejects an invalid marital_status value', () => {
		const result = staffFormSchema.safeParse({ ...validStaff, marital_status: 'engaged' });
		expect(result.success).toBe(false);
	});
});

describe('firstValidationError', () => {
	it('returns null for a valid payload', () => {
		expect(firstValidationError(studentFormSchema, validStudent)).toBeNull();
	});

	it('returns a real, human-readable message for an invalid payload', () => {
		const message = firstValidationError(studentFormSchema, { ...validStudent, tel: '123' });
		expect(message).toBe('Phone number must start with 6 and be exactly 9 digits');
	});

	it('returns the password-mismatch message for staff forms', () => {
		const message = firstValidationError(staffFormSchema, { ...validStaff, confirmPassword: 'different123' });
		expect(message).toBe('Password and confirm password do not match');
	});
});
