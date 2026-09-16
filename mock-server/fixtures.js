// Entirely fictional data — no real school, staff, or student anywhere
// in this file. Shaped to match what school-backend actually returns
// (see the real models in ../../school-backend/models/), just enough
// for the pages that read it to render something real-looking instead
// of a blank or crashed screen.

const SCHOOL = {
	_id: 'mock-school-id',
	name: 'DE-SCHOOL Demo Secondary School',
	slug: 'demo-school',
	contactEmail: 'contact@demo-school.cm',
	contactPhone: '677000000',
	address: 'Molyko, Buea, South West Region',
	logo: 'n/a',
	themeColor: '#000000',
	status: 'active',
	poBox: 'P.O Box 1, Buea',
	region: 'South West Region, Cameroon',
	country: 'REPUBLIC OF CAMEROON',
	motto: 'Knowledge, Discipline, Excellence',
	ministry: 'Ministry of Secondary Education',
};

const STAFF = [
	{
		_id: 'mock-staff-1',
		name: 'Demo Admin',
		matricule: 'ADMIN-001',
		email: 'admin@demo-school.cm',
		role: 'admin',
		gender: 'female',
		tel: 677000001,
		high_certificate: 'Master of Education',
	},
	{
		_id: 'mock-staff-2',
		name: 'Emmanuel Fru',
		matricule: 'STAFF-002',
		email: 'emmanuel.fru@demo-school.cm',
		role: 'lecturer',
		gender: 'male',
		tel: 677000002,
		high_certificate: 'Bachelor of Science',
	},
];

const DEPARTMENTS = [
	{ _id: 'mock-dept-1', name: 'Sciences', hod: STAFF[1], program: 'mock-program-1' },
];

const PROGRAMS = [
	{ _id: 'mock-program-1', name: 'General Secondary Education', director: STAFF[0], deputyDirector: STAFF[1] },
];

const SPECIALTIES = [
	{ _id: 'mock-specialty-1', name: 'Science', department: DEPARTMENTS[0], level: 100 },
	{ _id: 'mock-specialty-2', name: 'Arts', department: DEPARTMENTS[0], level: 100 },
];

const STUDENTS = [
	{
		_id: 'mock-student-1',
		name: 'Achu Divine',
		matricule: 'DEMO-24-001',
		gender: 'male',
		level: 100,
		specialty: SPECIALTIES[0],
		parent_name: "Achu's Parent",
		parent_tel: 677000010,
	},
	{
		_id: 'mock-student-2',
		name: 'Besong Comfort',
		matricule: 'DEMO-24-002',
		gender: 'female',
		level: 100,
		specialty: SPECIALTIES[0],
		parent_name: "Besong's Parent",
		parent_tel: 677000011,
	},
];

const COURSES = [
	{
		_id: 'mock-course-1',
		name: 'Mathematics',
		code: 'MATH-100',
		specialty: [SPECIALTIES[0]],
		levels: [100],
		credit_value: 4,
		status: 'compulsory',
	},
];

const ACADEMIC_YEARS = [
	{ _id: 'mock-year-1', schoolYear: '2025/2026', isCurrent: true },
	{ _id: 'mock-year-2', schoolYear: '2024/2025', isCurrent: false },
];

const CURRENT_YEAR = ACADEMIC_YEARS[0];

export { SCHOOL, STAFF, DEPARTMENTS, PROGRAMS, SPECIALTIES, STUDENTS, COURSES, ACADEMIC_YEARS, CURRENT_YEAR };
