import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { DepartmentForm } from '../../../components/form';

function DepartmentAdd() {
	return (
		<Layout>
			<SectionIntro title="Add Departments" main="Department" sub="add" />
			<section className="students mg-top">
				<h2 className="header-secondary">Department Information</h2>
				<DepartmentForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default DepartmentAdd