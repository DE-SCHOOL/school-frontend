import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { StaffCourseForm } from '../../../components/form';

function AsignStaffCourses() {
	return (
		<Layout>
			<SectionIntro title="Assign courses" main="course" sub="assign" />
			<section className="students mg-top">
				<h2 className="header-secondary">Assigning courses</h2>
				<StaffCourseForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default AsignStaffCourses;
