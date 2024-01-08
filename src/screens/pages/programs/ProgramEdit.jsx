import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { ProgramFormEdit } from '../../../components/form';

function ProgramAdd() {
	return (
		<Layout>
			<SectionIntro title="Edit Programs" main="Program" sub="edit" />
			<section className="students mg-top">
				<h2 className="header-secondary">Program Information</h2>
				<ProgramFormEdit styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default ProgramAdd;
