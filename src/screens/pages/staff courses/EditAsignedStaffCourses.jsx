import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { StaffCourseFormEdit } from '../../../components/form';
import { useSelector } from 'react-redux';
import Failure from '../../../components/signal/Failure';
import Loader from '../../../components/loaders/Loader';

function EditAsignedStaffCourses() {
	const load = useSelector((state) => state.dashboard);
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
