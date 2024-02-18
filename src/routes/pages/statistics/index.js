import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
	CourseStats,
	CourseStatsList,
	SpecialtyStats,
	SpecialtyStatsList,
} from '../../../screens/pages/statistics';
import Protected from '../../../components/auth/Protected';

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
				path="/statistics/specialty-stats/:courseID"
				element={
					<Protected restrict={['admin']}>
						<SpecialtyStats />
					</Protected>
				}
			/>
		</Routes>
	);
}

export default StatisticRoute;
