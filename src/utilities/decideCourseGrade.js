export const decideCourseGrade = (CourseMark) => {
	if (CourseMark >= 80) {
		return 'A';
	} else if (CourseMark >= 70 && CourseMark < 80) {
		return 'B+';
	} else if (CourseMark >= 60 && CourseMark < 70) {
		return 'B';
	} else if (CourseMark >= 55 && CourseMark < 60) {
		return 'C+';
	} else if (CourseMark >= 50 && CourseMark < 55) {
		return 'C';
	} else if (CourseMark >= 40 && CourseMark < 50) {
		return 'D';
	} else if (CourseMark < 40) {
		return 'F';
	}
};
