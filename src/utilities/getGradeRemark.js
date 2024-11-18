export function getGradeRemark(grade) {
	let remark = '';

	if (grade >= 18) {
		remark = 'Excellent';
	} else if (grade >= 16) {
		remark = 'Very Good';
	} else if (grade >= 14) {
		remark = 'Good';
	} else if (grade >= 11) {
		remark = 'Fair';
	} else if (grade >= 10) {
		remark = 'Average';
	} else if (grade >= 8) {
		remark = 'Poor';
	} else if (grade < 8) {
		remark = 'Very Poor';
	}

	return remark;
}
