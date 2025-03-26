import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getCourses } from '../../store/courses/courseSlice';
import { getStaffs } from '../../store/staffs/staffSlice';
import { assignCourse } from '../../store/dashboard/dashboardSlice';

function StaffCourseForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses.data);
	const staffs = useSelector((state) => state.staffs.teachers.data);
	const staffCourse = useSelector((state) => state.dashboard);
	let sortedStaffs = [];
	let sortedCourses = [];
	if (staffs?.length > 0) {
		sortedStaffs = [...staffs];
	}
	sortedStaffs.sort((a, b) => (a.name > b.name ? 1 : -1));

	if (courses?.length > 0) {
		sortedCourses = [...courses];
	}
	sortedCourses.sort((a, b) => (a.name > b.name ? 1 : -1));

	//initialize the main hooks
	const staff = useRef();
	const course = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getCourses());
		dispatch(getStaffs());
	}, [dispatch]);

	//Execute this function when you click submit, to add a course
	const createCourse = (e) => {
		e.preventDefault();

		const options = course.current.selectedOptions;
		const courses = Array.from(options).map((option) => option.value);
		console.log(courses);

		const values = {
			courses,
			staff: staff.current.value,
		};
		// action creator to dispatch information to the database
		dispatch(assignCourse(values));

		// staff.current.value = null;
		course.current.value = null;
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={createCourse}
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Staff name <em>*</em>
					</span>
					<select name="staff" id="" ref={staff}>
						{sortedStaffs?.map((staf, index) => (
							<option value={staf._id} key={index}>
								{`${staf.name} (${staf.matricule})`}
							</option>
						))}
					</select>
				</div>
				<div className="form-item" style={{ width: '45%' }}>
					<span className="desc">
						Course name <em>*</em>
					</span>
					<select name="credit" id="" ref={course} multiple size="15">
						{sortedCourses?.map((course, index) => (
							<option value={course._id} key={index}>
								{`${course.name} (${course.code})`}
							</option>
						))}
					</select>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{staffCourse.error && staffCourse.errorMessage && (
				<Failure message={staffCourse.errorMessage} />
			)}
			{staffCourse.isLoading && <Loader />}
		</form>
	);
}

export default StaffCourseForm;
