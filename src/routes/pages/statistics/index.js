import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
	AllCourseStats,
	CourseStats,
	CourseStatsDoc,
	CourseStatsList,
	SpecialtyStats,
	SpecialtyStatsList,
} from '../../../screens/pages/statistics';
import Protected from '../../../components/auth/Protected';
import StudentStatistics from '../../../screens/pages/statistics/StudentStatistics';
import AcademicYearStatistics from '../../../screens/pages/statistics/AcademicYearStatistics';

function StatisticRoute() {
	return (
		<Routes>
			<Route
				path="/statistics/course-stats"
				element={
					<Protected restrict={['admin']}>
						<CourseStatsList />
					</Protected>
				}
			/>
			<Route
				path="/statistics/specialty-stats"
				element={
					<Protected restrict={['admin']}>
						<SpecialtyStatsList />
					</Protected>
				}
			/>
			<Route
				path="/statistics/course-stats/:courseID"
				element={
					<Protected restrict={['admin']}>
						<CourseStats />
					</Protected>
				}
			/>
			<Route
				path="/statistics/course-stats/doc/:courseID"
				element={
					<Protected restrict={['admin']}>
						<CourseStatsDoc />
					</Protected>
				}
			/>
			<Route
				path="/statistics/specialty-stats/:courseID"
				element={
					<Protected restrict={['admin']}>
						<SpecialtyStats />
					</Protected>
				}
			/>
			<Route
				path="/statistics/student-stats"
				element={
					<Protected restrict={['admin']}>
						<StudentStatistics />
					</Protected>
				}
			/>
			<Route
				path="/all/statistics"
				element={
					<Protected restrict={['admin']}>
						<AllCourseStats />
					</Protected>
				}
			/>
			<Route
				path="/statistics/academic-year"
				element={
					<Protected restrict={['admin']}>
						<AcademicYearStatistics />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default StatisticRoute;
