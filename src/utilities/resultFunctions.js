export const rankStudentResults = (data) => {
	// Function to rank an array of scores and add rank to the corresponding student object
	const rankScores = (students, key) => {
		const scores = students
			.map((student) => ({
				student,
				score: student[key],
			}))
			.sort((a, b) => b.score - a.score); // Sort by score descending

		let rank = 1;
		for (let i = 0; i < scores.length; i++) {
			if (i > 0 && scores[i].score < scores[i - 1].score) {
				rank = i + 1;
			}
			scores[i].student[`${key}Rank`] = rank;
		}
	};

	// Function to calculate class average for a given field and add to all students in the course
	const calculateClassAverage = (students, key) => {
		const total = students.reduce((sum, student) => sum + student[key], 0);
		const average = total / students.length;
		students.forEach((student) => {
			student[`${key}ClassAverage`] = average;
		});
	};

	// Flatten the data into a single array of all course records
	const allRecords = data.flat();

	// Group the records by course ID
	const courses = {};
	allRecords.forEach((record) => {
		const courseId = record.course._id;
		if (!courses[courseId]) {
			courses[courseId] = [];
		}
		courses[courseId].push(record);
	});

	// Rank students and calculate class averages for each course
	Object.values(courses).forEach((students) => {
		// Rank by each sequence exam
		['s1Exam', 's2Exam', 's3Exam', 's4Exam', 's5Exam', 's6Exam'].forEach(
			(key) => {
				rankScores(students, key);
				calculateClassAverage(students, key);
			}
		);

		// Rank by term totals
		['t1Total', 't2Total', 't3Total'].forEach((key) => {
			rankScores(students, key);
			calculateClassAverage(students, key);
		});
	});

	return data;
};

export const calculateStudentAverages = (data) => {
	// Helper function to calculate weighted average for a field
	const calculateWeightedAverage = (records, key) => {
		let totalWeightedScore = 0;
		let totalCredits = 0;

		records.forEach((record) => {
			const creditValue = record.course.credit_value || 1; // Default credit value is 1 if not provided
			const score = record[key] || 0; // Default score is 0 if not provided
			totalWeightedScore += score * creditValue;
			totalCredits += creditValue;
		});

		return totalCredits === 0 ? 0 : totalWeightedScore / totalCredits; // Avoid division by zero
	};

	// Process each student's data
	return data.map((studentRecords) => {
		// const student = studentRecords[0].student; // All records in a group belong to the same student
		const averages = {};

		// Calculate weighted averages for all relevant fields
		[
			's1Exam',
			's2Exam',
			's3Exam',
			's4Exam',
			's5Exam',
			's6Exam',
			't1Total',
			't2Total',
			't3Total',
		].forEach((key) => {
			averages[`${key}Average`] = calculateWeightedAverage(studentRecords, key);
		});

		// Add the averages back to each record for this student
		return studentRecords.map((record) => ({
			...record,
			...averages,
		}));
	});
};

export const rankStudents = (data, averageKey) => {
	// Extract and rank students based on the given average key
	const rankings = data.map((studentCourses) => {
		// Pick the first entry to get the student's ID, name, and the target averageKey value
		const { student, [averageKey]: totalAverage } = studentCourses[0];
		return {
			studentId: student._id,
			studentName: student.name,
			totalAverage,
			level: student.level,
			matricule: student.matricule,
			specialty: student.specialty?.name,
			gender: student.gender,
		};
	});

	// Sort by totalAverage in descending order
	rankings.sort((a, b) => b.totalAverage - a.totalAverage);

	// Assign ranks based on sorted order
	rankings.forEach((student, index) => {
		student.rank = index + 1;
	});

	return rankings;
};

// export function calculateAverages(data) {
// 	// Step 1: Calculate class averages for each course
// 	const coursesWithClassAverages = data.map(studentCourses => {
// 			return studentCourses.map(course => {
// 					const yearTotalSum = studentCourses.reduce((sum, c) => sum + (c.yearTotal || 0), 0);
// 					const classAverage = yearTotalSum / studentCourses.length;
// 					return {
// 							...course,
// 							classAverage // Add the class average of yearTotal for this course
// 					};
// 			});
// 	});

// 	// Step 2: Calculate each student's overall average using yearTotal
// 	const studentAverages = coursesWithClassAverages.map(studentCourses => {
// 			const { student } = studentCourses[0]; // Student info is the same across all courses
// 			const totalYearTotal = studentCourses.reduce((sum, course) => sum + (course.yearTotal || 0), 0);
// 			const overallAverage = totalYearTotal / studentCourses.length;
// 			return {
// 					studentId: student._id,
// 					studentName: student.name,
// 					overallAverage
// 			};
// 	});

// 	return { coursesWithClassAverages, studentAverages };
// }

export function calculateYearlyCourseAverages(data) {
	// Step 1: Calculate class averages for each course
	const courseAverages = {};

	// Flatten the data to process courses across all students
	const allCourses = data.flat();

	allCourses.forEach((course) => {
		const courseId = course.course._id;

		if (!courseAverages[courseId]) {
			courseAverages[courseId] = {
				courseName: course.course.name,
				creditValue: course.course.credit_value,
				yearTotalSum: 0,
				studentCount: 0,
			};
		}

		courseAverages[courseId].yearTotalSum += course.yearTotal || 0;
		courseAverages[courseId].studentCount += 1;
	});

	// Calculate class average for each course
	Object.keys(courseAverages).forEach((courseId) => {
		const course = courseAverages[courseId];
		course.classAverage = course.yearTotalSum / course.studentCount;
	});

	// Step 2: Calculate each student's weighted average using course credit values
	const studentAverages = data.map((studentCourses) => {
		const student = studentCourses[0].student; // Student info is the same for all their courses
		let totalWeightedSum = 0;
		let totalCredits = 0;

		studentCourses.forEach((course) => {
			const creditValue = course.course.credit_value || 1; // Default to 1 if credit_value is missing
			totalWeightedSum += (course.yearTotal || 0) * creditValue;
			totalCredits += creditValue;
		});

		return {
			studentId: student._id,
			studentName: student.name,
			overallAverage: totalWeightedSum / totalCredits,
		};
	});

	return { courseAverages, studentAverages };
}

export function calculateStudentYearlyCourseRank(data) {
	const courseRanks = {};

	// Step 1: Flatten data and group by course ID
	const allCourses = data.flat();

	allCourses.forEach((course) => {
		const courseId = course.course._id;
		if (!courseRanks[courseId]) {
			courseRanks[courseId] = [];
		}

		courseRanks[courseId].push({
			studentId: course.student._id,
			studentName: course.student.name,
			yearTotal: course.yearTotal || 0,
		});
	});

	// Step 2: Sort scores and assign ranks
	Object.keys(courseRanks).forEach((courseId) => {
		const students = courseRanks[courseId];

		// Sort by yearTotal in descending order
		students.sort((a, b) => b.yearTotal - a.yearTotal);

		// Assign ranks (handle ties)
		let rank = 1;
		for (let i = 0; i < students.length; i++) {
			if (i > 0 && students[i].yearTotal < students[i - 1].yearTotal) {
				rank = i + 1; // Increment rank only if the score is different
			}
			students[i].rank = rank;
		}
	});

	// Step 3: Map ranks back to the original data
	data.forEach((studentCourses) => {
		studentCourses.forEach((course) => {
			const courseId = course.course._id;
			const studentRankData = courseRanks[courseId].find(
				(student) => student.studentId === course.student._id
			);
			course.rank = studentRankData.rank; // Add rank to the course data
		});
	});

	return data;
}

export function calculateStudentsFinalYearlyRank(students) {
	// Sort by overallAverage in descending order
	students.sort((a, b) => b.overallAverage - a.overallAverage);

	// Assign ranks (handle ties)
	let rank = 1;
	for (let i = 0; i < students.length; i++) {
		if (i > 0 && students[i].overallAverage < students[i - 1].overallAverage) {
			rank = i + 1; // Increment rank only if the score is different
		}
		students[i].rank = rank;
	}

	return students;
}

/**
 * Calculate per-sequence weighted averages and annual rank for all students.
 *
 * @param {Array[][]} data  - 2D array: outer array per student, inner array of
 *                            mark records (each has s1Exam–s6Exam and course.credit_value)
 * @returns {{ studentSequenceAverages: Array }} flat array of one object per student
 */
export function calculateSequenceAverages(data) {
	const SEQUENCES = ['s1Exam', 's2Exam', 's3Exam', 's4Exam', 's5Exam', 's6Exam'];

	// Helper: compute weighted average of a single sequence key across all courses
	const weightedAvg = (records, key) => {
		let totalWeighted = 0;
		let totalCredits = 0;
		records.forEach((record) => {
			const credit = record.course?.credit_value || 1;
			const score = record[key] || 0;
			totalWeighted += score * credit;
			totalCredits += credit;
		});
		return totalCredits === 0 ? 0 : totalWeighted / totalCredits;
	};

	// Build one summary object per student
	const studentSequenceAverages = data.map((studentRecords) => {
		const student = studentRecords[0]?.student;

		const seqAverages = {};
		SEQUENCES.forEach((seq) => {
			seqAverages[seq] = weightedAvg(studentRecords, seq);
		});

		// Annual average = average of all 6 sequence weighted averages
		const annualAvg =
			SEQUENCES.reduce((sum, seq) => sum + seqAverages[seq], 0) /
			SEQUENCES.length;

		return {
			studentId: student?._id,
			studentName: student?.name,
			matricule: student?.matricule,
			level: student?.level,
			gender: student?.gender,
			specialty: student?.specialty?.name,
			s1Avg: seqAverages.s1Exam,
			s2Avg: seqAverages.s2Exam,
			s3Avg: seqAverages.s3Exam,
			s4Avg: seqAverages.s4Exam,
			s5Avg: seqAverages.s5Exam,
			s6Avg: seqAverages.s6Exam,
			annualAvg,
		};
	});

	// Sort by annualAvg descending and assign ranks (ties get same rank)
	studentSequenceAverages.sort((a, b) => b.annualAvg - a.annualAvg);
	let rank = 1;
	for (let i = 0; i < studentSequenceAverages.length; i++) {
		if (
			i > 0 &&
			studentSequenceAverages[i].annualAvg <
				studentSequenceAverages[i - 1].annualAvg
		) {
			rank = i + 1;
		}
		studentSequenceAverages[i].rank = rank;
	}

	return { studentSequenceAverages };
}

/**
 * Calculate combined sequence + term weighted averages and annual rank for all students.
 *
 * Produces columns in display order:
 *   Seq 1, Seq 2, Term 1, Seq 3, Seq 4, Term 2, Seq 5, Seq 6, Term 3, Annual Avg, Rank
 *
 * @param {Array[][]} data  - 2D array: outer array per student, inner array of
 *                            mark records (each has s1Exam–s6Exam, t1Total–t3Total,
 *                            and course.credit_value)
 * @returns {{ studentOverallAverages: Array }} flat array, one object per student
 */
export function calculateOverallAverages(data) {
	const FIELDS = [
		's1Exam',
		's2Exam',
		't1Total',
		's3Exam',
		's4Exam',
		't2Total',
		's5Exam',
		's6Exam',
		't3Total',
	];

	// Credit-weighted average of a single field across all of a student's courses
	const weightedAvg = (records, key) => {
		let totalWeighted = 0;
		let totalCredits = 0;
		records.forEach((record) => {
			const credit = record.course?.credit_value || 1;
			const score = record[key] || 0;
			totalWeighted += score * credit;
			totalCredits += credit;
		});
		return totalCredits === 0 ? 0 : totalWeighted / totalCredits;
	};

	// Build one summary object per student
	const studentOverallAverages = data.map((studentRecords) => {
		const student = studentRecords[0]?.student;

		const avgs = {};
		FIELDS.forEach((field) => {
			avgs[field] = weightedAvg(studentRecords, field);
		});

		// Annual average = mean of the six sequence weighted averages
		const SEQUENCES = ['s1Exam', 's2Exam', 's3Exam', 's4Exam', 's5Exam', 's6Exam'];
		const annualAvg =
			SEQUENCES.reduce((sum, seq) => sum + avgs[seq], 0) / SEQUENCES.length;

		return {
			studentId: student?._id,
			studentName: student?.name,
			matricule: student?.matricule,
			level: student?.level,
			gender: student?.gender,
			specialty: student?.specialty?.name,
			// Sequences
			s1Avg: avgs.s1Exam,
			s2Avg: avgs.s2Exam,
			s3Avg: avgs.s3Exam,
			s4Avg: avgs.s4Exam,
			s5Avg: avgs.s5Exam,
			s6Avg: avgs.s6Exam,
			// Terms
			t1Avg: avgs.t1Total,
			t2Avg: avgs.t2Total,
			t3Avg: avgs.t3Total,
			// Annual
			annualAvg,
		};
	});

	// Sort by annualAvg descending and assign ranks (ties share the same rank)
	studentOverallAverages.sort((a, b) => b.annualAvg - a.annualAvg);
	let rank = 1;
	for (let i = 0; i < studentOverallAverages.length; i++) {
		if (
			i > 0 &&
			studentOverallAverages[i].annualAvg <
				studentOverallAverages[i - 1].annualAvg
		) {
			rank = i + 1;
		}
		studentOverallAverages[i].rank = rank;
	}

	return { studentOverallAverages };
}

