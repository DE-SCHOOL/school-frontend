//SET DEFAULT SEMESTER
export const semester = () => {
	let period = JSON.parse(localStorage.getItem('semester')) || undefined;
	// console.log(period, 11);

	//if semester is not defined in local storage, set it to semester 1
	if (period === undefined) {
		period = { current: 's1' };
		localStorage.setItem('semester', JSON.stringify(period));
	}
	// console.log(period, 22);
	return period.current;
};

export const year = () => {
	const period = JSON.parse(localStorage.getItem('academicYear'));

	return period.current;
};
