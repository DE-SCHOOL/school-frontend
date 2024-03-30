import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffCourse } from '../../../store/dashboard/dashboardSlice';

//importing Ui/Ux components
import { Layout, SectionIntro } from '../../../components/layout';

//importing components
import { PaggingNumSelect, Paggination } from '../../../components/pagging';
import { TableStaffReview } from '../../../components/tables';
import Failure from '../../../components/signal/Failure';
import Loader from '../../../components/loaders/Loader';
import PlainHrefText from '../../../components/flex text/PlainHrefText';

//initializing table header information
const staffCourseHeader = {
	name: 'Staffs',
	courses: 'Courses',
	levels: 'Levels',
};

function AllStaffReview() {
	const staffCourse = useSelector((state) => state.dashboard.staffCourse.data);
	const load = useSelector((state) => state.dashboard);
	const dispatch = useDispatch();

	//Use Effect to dispatch getting staff actions
	useEffect(() => {
		dispatch(getStaffCourse());
	}, [dispatch]);
	return (
		<div className="stud-print" style={{ marginTop: '3rem' }}>
			<SectionIntro title="Review Staff" main="Staff" sub="Review" />
			<section className="teachers mg-top-lg">
				{staffCourse !== undefined && <PlainHrefText data={staffCourse} />}
			</section>
			{load.error === true && load.errorMessage !== '' && (
				<Failure message={load.errorMessage} />
			)}
			{load.isLoading && <Loader />}
		</div>
	);
}

export default AllStaffReview;
