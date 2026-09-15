import React from 'react';
import { SectionIntro } from '../../../components/layout';
import { StaffReviewForm } from '../../../components/form';

function StaffReview() {
	return (
		<div className="stud-print" style={{ marginTop: '3rem' }}>
			<SectionIntro title="Reviews" main="Staff" sub="Reviews" />
			<section className="students mg-top">
				{/* <StudentForm styles="mg-top-md" /> */}
				<StaffReviewForm />
			</section>
		</div>
	);
}

export default StaffReview;
