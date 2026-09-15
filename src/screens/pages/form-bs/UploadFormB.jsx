import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { FormBsForm } from '../../../components/form';

function UploadFormB() {
	return (
		<Layout>
			<SectionIntro title="Add Form B's" main="Form B" sub="add" />
			<section className="students mg-top">
				<h2 className="header-secondary">Form B Information</h2>
				<FormBsForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default UploadFormB;
