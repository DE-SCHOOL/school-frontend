import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { DepartmentFormEdit } from '../../../components/form';

function DepartmentEdit() {
	return (
		<Layout>
			<SectionIntro title="Edit Departments" main="Department" sub="edit" />
			<section className="students mg-top">
				<h2 className="header-secondary">Department Information</h2>
				<DepartmentFormEdit styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default DepartmentEdit;
