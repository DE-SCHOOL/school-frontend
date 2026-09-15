import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { StaffCourseFormEdit } from '../../../components/form';
import { useSelector } from 'react-redux';
import Failure from '../../../components/signal/Failure';
import Loader from '../../../components/loaders/Loader';
import { useParams } from 'react-router-dom';

function EditAsignedStaffCourses() {
	const load = useSelector((state) => state.dashboard);
	const param = useParams();

	if (param.teacherID === 'undefined')
		return (
			<Layout>
				<div
					style={{
						height: '85vh',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column'
					}}
				>
					<h2>
						The Teacher that was assigned these course(s) must have been deleted
					</h2>
					<span>Re-assign this course to another lecturer</span>
				</div>
			</Layout>
		);
	return (
		<Layout>
			<SectionIntro title="Edit assigned courses" main="review" sub="assign" />
			<section className="students mg-top">
				<h2 className="header-secondary">Assigning courses</h2>
				<StaffCourseFormEdit styles="mg-top-md" />
			</section>
			{load.error === true && load.errorMessage !== '' && (
				<Failure message={load.errorMessage} />
			)}
			{load.isLoading && <Loader />}
		</Layout>
	);
}

export default EditAsignedStaffCourses;
