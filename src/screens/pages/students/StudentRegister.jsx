import React from 'react';
import { SectionIntro } from '../../../components/layout';
import { StudentForm } from '../../../components/form';

function StudentRegister() {
	return (
		<div className="stud-print" style={{ marginTop: '3rem' }}>
			<SectionIntro title="Registration" main="Student" sub="register" />
			<section className="students mg-top">
				<h2 className="header-secondary">Student Information</h2>
				<StudentForm styles="mg-top-md" type="self" />
			</section>
		</div>
	);
}

export default StudentRegister;
