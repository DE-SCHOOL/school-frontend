import { z } from 'zod';

// Mirrors real, confirmed constraints from school-backend's own Mongoose
// schemas (models/students.model.js, models/staff.model.js) - not
// invented client-side rules. Catching these before dispatch means a
// bad phone number or mismatched password never costs a round trip to
// the API to discover; it's still enforced server-side regardless, this
// is purely a faster/friendlier failure for the person filling the form.
const cameroonPhone = z
	.string()
	.regex(/^6\d{8}$/, 'Phone number must start with 6 and be exactly 9 digits');

export const studentFormSchema = z.object({
	matricule: z.string().trim().min(1, 'Matricule is required'),
	name: z.string().trim().min(1, 'Student name is required'),
	address: z.string().trim().min(1, 'Address is required'),
	dob: z.string().trim().min(1, 'Date of birth is required'),
	pob: z.string().trim().min(1, 'Place of birth is required'),
	email: z.string().trim().email('Enter a valid email address'),
	tel: cameroonPhone,
	parent_name: z.string().trim().min(1, "Parent's name is required"),
	parent_email: z.string().trim().email("Enter a valid parent's email address"),
	parent_tel: cameroonPhone,
	entry_certificate: z.string().trim().min(1, 'Highest education level is required'),
	specialty: z.string().trim().min(1, 'Choose a specialty'),
	gender: z.enum(['male', 'female']),
	level: z.enum(['100', '200', '300', '400', '500', '601', '602', '603']),
});

export const staffFormSchema = z
	.object({
		name: z.string().trim().min(1, 'Full name is required'),
		address: z.string().trim().min(1, 'Address is required'),
		matricule: z.string().trim().min(1, 'Matricule is required'),
		dob: z.string().trim().min(1, 'Date of birth is required'),
		pob: z.string().trim().min(1, 'Place of birth is required'),
		tel: cameroonPhone,
		high_certificate: z.string().trim().min(1, 'Highest certificate is required'),
		email: z.string().trim().email('Enter a valid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(1, 'Confirm the password'),
		gender: z.enum(['male', 'female']),
		marital_status: z.enum(['married', 'not married', 'seperated', 'devorced']),
		role: z.string().trim().min(1),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password and confirm password do not match',
		path: ['confirmPassword'],
	});

// Returns the first validation error message, or null if the payload is
// valid - the forms using this only ever show one error at a time
// (matching the existing single-message Failure component), so there's
// no need to surface the full per-field error list here.
export function firstValidationError(schema, payload) {
	const result = schema.safeParse(payload);
	if (result.success) return null;
	return result.error.issues[0]?.message || 'Please check the form for errors';
}
