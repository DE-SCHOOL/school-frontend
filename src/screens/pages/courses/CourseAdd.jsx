import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { CourseForm } from '../../../components/form';

function CourseAdd() {
	return (
		<Layout>
			<SectionIntro title="Add subject" main="subject" sub="add" />
			<section className="students mg-top">
				<h2 className="header-secondary">Subject Information</h2>
				<CourseForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default CourseAdd;
