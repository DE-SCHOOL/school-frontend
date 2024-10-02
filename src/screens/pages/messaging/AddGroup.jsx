import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { GroupForm } from '../../../components/form';

function AddGroup() {
	return (
		<Layout>
			<SectionIntro title="Add Groups" main="Group" sub="add" />
			<section className="students mg-top">
				<h2 className="header-secondary">Group Information</h2>
				<GroupForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default AddGroup;
