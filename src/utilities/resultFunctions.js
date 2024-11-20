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
		const student = studentRecords[0].student; // All records in a group belong to the same student
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

// export const rankStudents = (data, rankingKey) => {
// 	// Initialize a list to store students' total averages
// 	const rankings = data.map((studentData) => {
// 		// Extract the student ID and name (assuming all course entries are for the same student)
// 		const studentId = studentData[0].student._id;
// 		const studentName = studentData[0].student.name;

// 		// Calculate the total average for the given rankingKey across all courses
// 		const totalAverage = studentData.reduce((sum, course) => {
// 			return sum + (course[rankingKey] || 0);
// 		}, 0);

// 		return {
// 			studentId,
// 			studentName,
// 			totalAverage,
// 		};
// 	});

// 	// Sort the students by total average in descending order
// 	rankings.sort((a, b) => b.totalAverage - a.totalAverage);

// 	// Assign ranks
// 	rankings.forEach((student, index) => {
// 		student.rank = index + 1;
// 	});

// 	return rankings;
// };

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
			gender: student.gender
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
