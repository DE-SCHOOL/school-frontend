//SET DEFAULT SEMESTER
export const semester = () => {
	let period = JSON.parse(localStorage.getItem('semester')) || undefined;

	//if semester is not defined in local storage, set it to semester 1
	if (period === undefined) {
		period = { current: 's1' };
		localStorage.setItem('semester', JSON.stringify(period));
	}
	return period.current;
};
