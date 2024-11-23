import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffCourse } from '../../../store/dashboard/dashboardSlice';

//importing Ui/Ux components
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';

//importing components
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import { TableStaffCourse } from '../../../components/tables/';
import Failure from '../../../components/signal/Failure';
import Loader from '../../../components/loaders/Loader';
import SectionNotFound from '../../../components/layout/SectionNotFound';

//initializing table header information
const staffCourseHeader = {
	name: 'Staffs',
	courses: 'Courses',
	levels: 'Levels',
};

function StaffCourseList() {
	const staffCourse = useSelector((state) => state.dashboard.staffCourse.data);
	const load = useSelector((state) => state.dashboard);
	const dispatch = useDispatch();

	const [staffCourseState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(25);
	// console.log(staffCourse);

	//Use Effect to dispatch getting staff actions
	useEffect(() => {
		dispatch(getStaffCourse());
	}, [dispatch]);
	return (
		<Layout>
			<SectionIntro title="Assigned Subjects" main="Staff" sub="Subject" />
			<section className="teachers mg-top-lg">
				<SectionMainIntro
					title="Specialties"
					styles="mg-bt mg-top"
					link={'/dashboard/course-assign'}
				/>
				{<PaggingNumSelect setItemsPerPage={setNumPages} />}
				{staffCourse !== undefined && staffCourse?.length !== 0 && (
					<div className="main-table-container">
						<TableStaffCourse
							styles="mg-top"
							tableData={
								staffCourseState.length !== 0 ? staffCourseState : staffCourse
							}
							header={staffCourseHeader}
							paggingNum={Number(numPages)}
						/>
					</div>
				)}

				{/* Display paggination page only if staffs have been searched from db */}
				{staffCourse !== undefined && staffCourse?.length !== 0 && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse in the length if staff data is loaded or staff has been searched
						totalData={
							staffCourseState.length !== 0
								? staffCourseState.length
								: staffCourse.length
						}
					/>
				)}
			</section>
			{staffCourse?.length === 0 &&
				staffCourse !== undefined &&
				load.isLoading === false && (
					<SectionNotFound text={'No teacher assigned a subject yet'} />
				)}
			{load.error === true && load.errorMessage !== '' && (
				<Failure message={load.errorMessage} />
			)}
			{load.isLoading && <Loader />}
		</Layout>
	);
}

export default StaffCourseList;
