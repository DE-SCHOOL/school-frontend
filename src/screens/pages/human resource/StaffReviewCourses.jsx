import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getStaffCourse } from '../../../store/dashboard/dashboardSlice';

//importing Ui/Ux components
import { Layout, SectionIntro } from '../../../components/layout';

//importing components
import Failure from '../../../components/signal/Failure';
import Loader from '../../../components/loaders/Loader';
import PlainHrefTextCourses from '../../../components/flex text/PlainHrefTextCourses';

function AllStaffReview() {
	const staffCourse = useSelector((state) => state.dashboard.staffCourse.data);
	const load = useSelector((state) => state.dashboard);
	const dispatch = useDispatch();
	const params = useParams();

	//Use Effect to dispatch getting staff actions
	useEffect(() => {
		dispatch(getStaffCourse());
	}, [dispatch]);
	let staffLectures = null;
	let data;
	if (staffCourse !== undefined) {
		data = staffCourse.filter((data) => data.staff?._id === params.staffID)[0];

		staffLectures = data.courses;
	}
	return (
		<div className="stud-print" style={{ marginTop: '3rem' }}>
			<SectionIntro title="Review Staff" main="Staff" sub="Review" />
			<section className="teachers mg-top-lg">
				{staffCourse !== undefined && (
					<h3 className="mg-bt-lg center">{data.staff?.name}</h3>
				)}
				{staffCourse !== undefined && (
					<PlainHrefTextCourses data={staffLectures} staff={data.staff?.name} />
				)}

				<Link to={'/human resource/review-staff'}>
					<h3 className="center mg-top-lg">All Staffs</h3>
				</Link>
			</section>
			{load.error === true && load.errorMessage !== '' && (
				<Failure message={load.errorMessage} />
			)}
			{load.isLoading && <Loader />}
		</div>
	);
}

export default AllStaffReview;
