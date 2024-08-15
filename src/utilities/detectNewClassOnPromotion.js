const detectNewClassOnPromotion = (currentClass) => {
	currentClass = Number(currentClass);

	let newClass;
	if (currentClass <= 400) {
		newClass = currentClass + 100;
	} else {
		newClass = currentClass + 1;
	}

	return newClass;
};

export { detectNewClassOnPromotion };
