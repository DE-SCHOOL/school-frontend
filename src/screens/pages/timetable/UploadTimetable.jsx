import React from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { TimetableForm } from '../../../components/form';

function UploadTimetable() {
	return (
		<Layout>
			<SectionIntro title="Add Timetables" main="Timetable" sub="add" />
			<section className="students mg-top">
				<h2 className="header-secondary">Timetable Information</h2>
				<TimetableForm styles="mg-top-md" />
			</section>
		</Layout>
	);
}

export default UploadTimetable;
