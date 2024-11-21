import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../components/loaders/Loader';
import Button from '../../../components/buttons/Button';
import { TableAllCourseStats } from '../../../components/tables';
import Failure from '../../../components/signal/Failure';
import {
	getAllCourseStats,
	getCourses,
} from '../../../store/courses/courseSlice';
import { academicTerm } from '../../../utilities/periodInfo';
import {
	getCurrentYear,
} from '../../../store/academic year/academicYearSlice';
import { getStudentsExam } from '../../../store/exams/examSlice';
import SectionNotFound from '../../../components/layout/SectionNotFound';

function AllCourseStats() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses);
	const coursesStats = useSelector((state) => state.courses.allCourseStats);
	const load = useSelector((state) => state.courses);
	const [scroll, setScroll] = useState(0);
	const year = useSelector((state) => state.years);

	console.log(year, year.currentYear?.schoolYear);
	useEffect(() => {
		dispatch(getCourses());
		dispatch(getCurrentYear());
	}, [dispatch]);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		let courseIDs = [];
		const TERM = academicTerm();
		if (
			courses?.data?.length > 0 &&
			year.currentYear?.schoolYear !== undefined
		) {
			courses.data?.map((course) => {
				courseIDs.push(course._id);

				return course;
			});

			const dbOpt = {
				semester: TERM,
				academicYear: year.currentYear?.schoolYear,
				courseIDs,
			};
			console.log(dbOpt, 111111111111111111111);
			dispatch(getAllCourseStats(dbOpt));
			dispatch(getStudentsExam(year.currentYear?._id));
		}
		//eslint-disable-next-line
	}, [dispatch, courses?.data?.length, year]);

	window.onscroll = () => {
		if (window.scrollY > 200) {
			setScroll(1);
		} else {
			setScroll(0);
		}
	};

	return (
		<div className="stud-print">
			<section className="students">
				{coursesStats !== undefined && coursesStats?.length !== 0 && (
					<TableAllCourseStats
						coursesStats={coursesStats}
						styles="no-position"
					/>
				)}
			</section>
			{coursesStats?.length === 0 &&
				coursesStats !== undefined &&
				load.isLoading === false && (
					<SectionNotFound text={'No subject statistics yet'} />
				)}
			<Button styles={scroll} />
			{load.isLoading && <Loader />}
			{load.error === true && load.errorMessage && (
				<Failure message={load.errorMessage} />
			)}
			{/* {load.error === false && setStaffData(defaultInfo)} */}
		</div>
	);
}

export default AllCourseStats;
