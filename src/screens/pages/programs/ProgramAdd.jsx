import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { ProgramForm } from '../../../components/form';

function ProgramAdd() {
	return (
		<Layout>
			<SectionIntro title="Add Programs" main="Program" sub="add" />
			<section className="students mg-top">
				<h2 className="header-secondary">Program Information</h2>
				<ProgramForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default ProgramAdd;
