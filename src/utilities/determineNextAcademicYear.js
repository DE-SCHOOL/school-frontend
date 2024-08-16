const determineNextAcademicYear = (currentSchoolYear, allAcademicYear) => {
	const currentYear = currentSchoolYear.split('/');
	let nextYear = [];
	nextYear[0] = Number(currentYear[0]) + 1;
	nextYear[1] = Number(currentYear[1]) + 1;

	nextYear = nextYear.join('/');

	nextYear = allAcademicYear.filter((years) => years.schoolYear === nextYear);

	return nextYear[0];
};

export { determineNextAcademicYear };
