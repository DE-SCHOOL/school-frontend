import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import AcademicYearForm from '../../../components/form/AcademicYearForm';

function YearAdd() {
	return (
		<Layout>
			<SectionIntro title="Add Year" main="Year" sub="add" />
			<section className="students mg-top">
				<h2 className="header-secondary">Academic Year Information</h2>
				<AcademicYearForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default YearAdd;
