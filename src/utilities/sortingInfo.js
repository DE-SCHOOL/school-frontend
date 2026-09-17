//staffData, setStaffData ---> state Data, setting state Data
//field ---> field to sortBy
//fieldOpt ---> optional field, in case of department or specialty or sth

//setIsSortedBy --> to set state in order to show the currently sorted field, with blue color

export const sortArrayObject = (
	data,
	setData,
	setSortedBy,
	field,
	fieldOpt
) => {
	const tempData = data.map((dt) => dt);

	if (field && fieldOpt) {
		tempData.sort((a, b) => {
			let first = a[field][fieldOpt] || null;
			let second = b[field][fieldOpt] || null;

			if (first < second) {
				return -1;
			}
			if (second < first) {
				return 1;
			}
			return 0;
		});
	} else {
		tempData.sort((a, b) => {
			let first = a[field];
			let second = b[field];

			if (first < second) {
				return -1;
			}
			if (second < first) {
				return 1;
			}
			return 0;
		});
	}

	setData(tempData);
	setSortedBy(field);
};
