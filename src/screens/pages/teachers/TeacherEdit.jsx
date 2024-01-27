import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { TeacherFormEdit } from '../../../components/form';

function TeacherEdit() {
	return (
		// Application layout
		<Layout>
			<SectionIntro title="Edit Teachers" main="Teacher" sub="edit" />
			<section className="teachers mg-top">
				<h2 className="header-secondary">Teacher Information</h2>

				{/* Form for the creation of teachers by the admin */}
				<TeacherFormEdit />
			</section>
		</Layout>
	);
}

export default TeacherEdit;
