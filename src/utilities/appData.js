// Fallback only — rendered for the brief window before the real,
// authenticated tenant's own School profile has loaded (see
// store/school/schoolSlice.js). Every printed document (mark sheets,
// transcripts, statistics reports) used to hardcode these exact values
// for every school on the platform; now each school sees its own.
export const schoolHeaderPropFallback = {
	name: 'Landmark Metropolitan University Institute',
	box: 'P.O Box 318, Buea',
	region: 'South West Region, Cameroon',
	tel: '673034195 / 670836477 / 672339570',
	email: 'lucbuea@gmail.com',
	country: 'REPUBLIC OF CAMEROON',
	motto: 'PEACE - WORK - FATHERLAND',
	ministry: 'Ministry of Higher Education',
};

// Maps the real, per-tenant School document (models/school.model.js on
// the backend) into the shape every report component already expects,
// so those components only need their data source swapped, not their
// rendering logic. Falls back field-by-field while `school` is still
// null/loading, so a report generated in that brief window still prints
// something reasonable instead of blank fields.
export const mapSchoolToHeaderProp = (school) => ({
	name: school?.name || schoolHeaderPropFallback.name,
	box: school?.poBox || schoolHeaderPropFallback.box,
	region: school?.region || schoolHeaderPropFallback.region,
	tel: school?.contactPhone || schoolHeaderPropFallback.tel,
	email: school?.contactEmail || schoolHeaderPropFallback.email,
	country: school?.country || schoolHeaderPropFallback.country,
	motto: school?.motto || schoolHeaderPropFallback.motto,
	ministry: school?.ministry || schoolHeaderPropFallback.ministry,
});

export const gradeAndRange = [
	{
		grade1: 'A',
		range1: '80 - 100',
		grade2: 'C',
		range2: '50 - 54',
	},
	{
		grade1: 'B+',
		range1: '70 - 79',
		grade2: 'D+',
		range2: '45 - 49',
	},
	{
		grade1: 'B',
		range1: '60 - 69',
		grade2: 'D',
		range2: '40 - 44',
	},
	{
		grade1: 'C+',
		range1: '55 - 59',
		grade2: 'F',
		range2: '0 - 39',
	},
];
