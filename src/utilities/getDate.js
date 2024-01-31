//get date as MM-DD-YYYY

export const getDateFromDateObject = (Obj, spec = 0) => {
	let dateObj = new Date(Obj);
	const year = dateObj.getFullYear();

	//format month
	let month = dateObj.getMonth() + 1;
	month = month < 10 ? `0${month}` : month;

	//format day
	let day = dateObj.getDate();
	day = day < 10 ? `0${day + spec}` : day + spec;

	// console.log(`${year}-${month}-${day}`);
	if (spec === 0) return `${month}-${day}-${year}`;

	return `${year}-${month}-${day}`;
};
