import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { CourseForm } from '../../../components/form';

function CourseAdd() {
	return (
		<Layout>
			<SectionIntro title="Add courses" main="course" sub="add" />
			<section className="students mg-top">
				<h2 className="header-secondary">Course Information</h2>
				<CourseForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default CourseAdd;
