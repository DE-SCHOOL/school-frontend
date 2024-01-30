import React from 'react';
import { SectionIntro } from '../../../components/layout';
import { TeacherForm } from '../../../components/form';

function TeacherRegister() {
	return (
		// Application layout
		<div className="stud-print" style={{ marginTop: '3rem' }}>
			<SectionIntro title="Registration" main="staff" sub="register" />
			<section className="teachers mg-top">
				<h2 className="header-secondary">Staff Information</h2>

				{/* Form for the creation of teachers by the admin */}
				<TeacherForm type="self" />
			</section>
		</div>
	);
}

export default TeacherRegister;
