const detectNewClassOnDemote = (currentClass) => {
	currentClass = Number(currentClass);

	let newClass;
	if (currentClass >= 300 && currentClass <= 500) {
		newClass = currentClass - 100;
	} else if (currentClass >= 602 && currentClass <= 603) {
		newClass = currentClass - 1;
	} else {
		newClass = currentClass;
	}

	return newClass;
};

export { detectNewClassOnDemote };
