import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SchoolHeader from '../../../components/social/SchoolHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse, getCourseStats } from '../../../store/courses/courseSlice';
import Loader from '../../../components/loaders/Loader';
import { academicTerm } from '../../../utilities/periodInfo';

import { schoolHeaderProp } from '../../../utilities/appData';
import { FaArrowDown } from 'react-icons/fa';
import { getCurrentYear } from '../../../store/academic year/academicYearSlice';

function CourseStats() {
	const params = useParams();
	const dispatch = useDispatch();
	const load = useSelector((state) => state.courses);
	const course = useSelector((state) => state.courses.course);
	const courseStats = useSelector((state) => state.courses.courseStats);
	const academicYear = useSelector((state) => state.years.currentYear);

	useEffect(() => {
		dispatch(getCurrentYear());
		if (academicYear?.schoolYear) {
			dispatch(getCourse({ id: params.courseID }));
			dispatch(
				getCourseStats({
					id: params.courseID,
					term: academicTerm(),
					academicYear: academicYear?.schoolYear,
				})
			);
		}
	}, [params.courseID, dispatch, academicYear?.schoolYear]);
	return (
		<React.Fragment>
			{/* School header */}
			<div className="container-stats">
				<SchoolHeader school={schoolHeaderProp} />
				{/* <div className="line mg-top"></div> */}
				<p>Course Name: {course?.name || ''}</p>
				<p>Course Code: {course?.code || ''}</p>
				<section className="doc-stats mg-top-lg">
					<div className="text normal">
						Total Student Offering:{' '}
						{courseStats !== undefined ? courseStats?.totalOffering : 0}
					</div>

					<div className="text normal-fair">
						Total Students with course marks:{' '}
						{courseStats !== undefined ? courseStats?.totalSat : 0}
					</div>

					<div className="text success">
						Percentage passed:{' '}
						{courseStats !== undefined ? courseStats?.percentPassed : 0}%
					</div>

					<div className="text success">
						Percentage Passed - boys:{' '}
						{courseStats !== undefined ? courseStats?.percentPassedBoys : 0}%
					</div>

					<div className="text success">
						Percentage Passed - girls:{' '}
						{courseStats !== undefined ? courseStats?.percentPassedGirls : 0}%
					</div>

					<div className="text danger">
						Percentage Failed:{' '}
						{courseStats !== undefined ? courseStats?.percentFailed : 0}%
					</div>

					<div className="text primary-dark">
						Number of 18 - 20:{' '}
						{courseStats !== undefined ? courseStats?.totalAs : 0}
					</div>

					<div className="text primary-dark">
						Number of 16 - 17.9:{' '}
						{courseStats !== undefined ? courseStats?.totalBplus : 0}
					</div>

					<div className="text primary">
						Number of 14 - 15.9:{' '}
						{courseStats !== undefined ? courseStats?.totalBs : 0}
					</div>

					<div className="text primary-light">
						Number of 11 - 13.9:{' '}
						{courseStats !== undefined ? courseStats?.totalCplus : 0}
					</div>

					<div className="text primary-light">
						Number of 10 - 10.9:{' '}
						{courseStats !== undefined ? courseStats?.totalCs : 0}
					</div>

					<div className="text danger">
						Number of 8 - 9.9:{' '}
						{courseStats !== undefined ? courseStats?.totalDs : 0}
					</div>

					<div className="text danger">
						Number of 0 - 8:{' '}
						{courseStats !== undefined ? courseStats?.totalEs : 0}
					</div>

					<p className="v-download mg-top">
						<span>Verified and Signed By: _____________________</span>
						<button className={`arrow-up btm-right`} onClick={window.print}>
							<FaArrowDown />
						</button>
					</p>
					{load.isLoading === true && <Loader />}
				</section>
			</div>
		</React.Fragment>
	);
}

export default CourseStats;
