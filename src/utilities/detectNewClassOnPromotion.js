const detectNewClassOnPromotion = (currentClass) => {
	currentClass = Number(currentClass);

	let newClass;
	if (currentClass <= 400) {
		newClass = currentClass + 100;
	} else if (currentClass >= 601 && currentClass < 603) {
		newClass = currentClass + 1;
	} else {
		newClass = currentClass;
	}

	return newClass;
};

export { detectNewClassOnPromotion };
