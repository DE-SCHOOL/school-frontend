import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { StudentFormEdit } from '../../../components/form';

function StudentEdit() {
	return (
		<Layout>
			<SectionIntro title="Edit Students" main="Student" sub="edit" />
			<section className="students mg-top">
				<h2 className="header-secondary">Student Information</h2>
				<StudentFormEdit styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default StudentEdit;
