import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { SpecialtyFormEdit } from '../../../components/form';

function SpecialtyAdd() {
	return (
		<Layout>
			<SectionIntro title="Edit Specialties" main="Specialty" sub="edit" />
			<section className="students mg-top">
				<h2 className="header-secondary">Specialty Information</h2>
				<SpecialtyFormEdit styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default SpecialtyAdd;
