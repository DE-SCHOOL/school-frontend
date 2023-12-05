import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { SpecialtyForm } from '../../../components/form';

function SpecialtyAdd() {
	return (
		<Layout>
			<SectionIntro title="Add Specialties" main="Specialty" sub="add" />
			<section className="specialty mg-top">
				<h2 className="header-secondary">Specialty Information</h2>
				<SpecialtyForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default SpecialtyAdd;
