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
import { semester } from '../../../utilities/periodInfo';
import SectionNotFound from '../../../components/layout/SectionNotFound';

function AllCourseStats() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses);
	const coursesStats = useSelector((state) => state.courses.allCourseStats);
	const load = useSelector((state) => state.courses);
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		let courseIDs = [];
		const SEMESTER = semester();
		if (courses?.data?.length > 0) {
			courses.data?.map((course) => {
				if (course.semester === SEMESTER) {
					courseIDs.push(course._id);
				}
				return course;
			});

			const dbOpt = {
				semester: SEMESTER,
				academicYear: '2023/2024',
				courseIDs,
			};
			// console.log(dbOpt);
			dispatch(getAllCourseStats(dbOpt));
		}
		//eslint-disable-next-line
	}, [dispatch, courses?.data?.length]);

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
