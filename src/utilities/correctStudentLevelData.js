const correctStudentLevelData = (studentData, allStudents) => {
	if (studentData === undefined) return undefined;
	let studentInAll = allStudents.find(
		(student) => student._id === studentData._id
	);

	return studentInAll;
};

export { correctStudentLevelData };
