import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { StaffCourseFormEdit } from '../../../components/form';

function EditAsignedStaffCourses() {
	return (
		<Layout>
			<SectionIntro title="Edit assigned courses" main="review" sub="assign" />
			<section className="students mg-top">
				<h2 className="header-secondary">Assigning courses</h2>
				<StaffCourseFormEdit styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default EditAsignedStaffCourses;
