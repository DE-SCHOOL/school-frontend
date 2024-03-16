import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Layout, SectionIntro } from '../../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse, getCourseStats } from '../../../store/courses/courseSlice';
import Loader from '../../../components/loaders/Loader';
import { semester } from '../../../utilities/periodInfo';

function CourseStats() {
	const params = useParams();
	const dispatch = useDispatch();
	const load = useSelector((state) => state.courses);
	const course = useSelector((state) => state.courses.course);
	const courseStats = useSelector((state) => state.courses.courseStats);

	useEffect(() => {
		dispatch(getCourse({ id: params.courseID }));
		dispatch(
			getCourseStats({
				id: params.courseID,
				semester: semester(),
				academicYear: '2023/2024',
			})
		);
	}, [params.courseID, dispatch]);
	return (
		<Layout>
			<SectionIntro
				title={course?.name || ''}
				main={course?.code || ''}
				sub="stats"
			/>
			<section className="statistics stat-container mg-top-lg">
				<div className="stat-block normal">
					<div className="heading">Total Student Offering</div>
					<div className="text normal">
						{courseStats !== undefined ? courseStats?.totalOffering : 0}
					</div>
				</div>
				<div className="stat-block normal-fair">
					<div className="heading normal-fair">
						Total Students with course marks
					</div>
					<div className="text normal-fair">
						{courseStats !== undefined ? courseStats?.totalSat : 0}
					</div>
				</div>
				<div className="stat-block success">
					<div className="heading success">Percentage passed</div>
					<div className="text success">
						{courseStats !== undefined ? courseStats?.percentPassed : 0}%
					</div>
				</div>
				<div className="stat-block success">
					<div className="heading success">Percentage Passed - boys</div>
					<div className="text success">
						{courseStats !== undefined ? courseStats?.percentPassedBoys : 0}%
					</div>
				</div>
				<div className="stat-block success">
					<div className="heading success">Percentage Passed - girls</div>
					<div className="text success">
						{courseStats !== undefined ? courseStats?.percentPassedGirls : 0}%
					</div>
				</div>
				<div className="stat-block danger">
					<div className="heading danger">Percentage Failed</div>
					<div className="text danger">
						{courseStats !== undefined ? courseStats?.percentFailed : 0}%
					</div>
				</div>
				<div className="stat-block primary-dark">
					<div className="heading primary-dark">Number of As</div>
					<div className="text primary-dark">
						{courseStats !== undefined ? courseStats?.totalAs : 0}
					</div>
				</div>
				<div className="stat-block primary-dark">
					<div className="heading primary-dark">
						Number of Bs<sup>+</sup>
					</div>
					<div className="text primary-dark">
						{courseStats !== undefined ? courseStats?.totalBplus : 0}
					</div>
				</div>
				<div className="stat-block primary">
					<div className="heading primary">Number of Bs</div>
					<div className="text primary">
						{courseStats !== undefined ? courseStats?.totalBs : 0}
					</div>
				</div>
				<div className="stat-block primary-light">
					<div className="heading primary-light">
						Number of Cs<sup>+</sup>
					</div>
					<div className="text primary-light">
						{courseStats !== undefined ? courseStats?.totalCplus : 0}
					</div>
				</div>
				<div className="stat-block primary-light">
					<div className="heading primary-light">Number of Cs</div>
					<div className="text primary-light">
						{courseStats !== undefined ? courseStats?.totalCs : 0}
					</div>
				</div>
				<div className="stat-block danger">
					<div className="heading danger">
						Number of Ds<sup>+</sup>
					</div>
					<div className="text danger">
						{courseStats !== undefined ? courseStats?.totalDplus : 0}
					</div>
				</div>
				<div className="stat-block danger">
					<div className="heading danger">Number of Ds</div>
					<div className="text danger">
						{courseStats !== undefined ? courseStats?.totalDs : 0}
					</div>
				</div>
				<div className="stat-block danger">
					<div className="heading danger">Number of Fs</div>
					<div className="text danger">
						{courseStats !== undefined ? courseStats?.totalFs : 0}
					</div>
				</div>

				<div className="stat-block danger">
					<div className="heading danger">Number of Marks less than 40</div>
					<div className="text danger">
						{courseStats !== undefined ? courseStats?.numMarksLess40 : 0}
					</div>
				</div>

				<div className="stat-block danger">
					<div className="heading danger">
						Number of Marks between 41 and 45
					</div>
					<div className="text danger">
						{courseStats !== undefined ? courseStats?.numMarksBtw41and45 : 0}
					</div>
				</div>
				<div className="stat-block danger">
					<div className="heading danger">
						Number of Marks between 46 and 49
					</div>
					<div className="text danger">
						{courseStats !== undefined ? courseStats?.numMarksBtw46and49 : 0}
					</div>
				</div>
			</section>

			{load.isLoading === true && <Loader />}
		</Layout>
	);
}

export default CourseStats;
