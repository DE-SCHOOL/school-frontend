import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { CourseFormEdit } from '../../../components/form';

function CourseAdd() {
	return (
		<Layout>
			<SectionIntro title="Edit courses" main="course" sub="edit" />
			<section className="students mg-top">
				<h2 className="header-secondary">Course Information</h2>
				<CourseFormEdit styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default CourseAdd;
