import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getCourses, myCourses } from '../../store/courses/courseSlice';
import { getStaffs } from '../../store/staffs/staffSlice';
import { editAssignedCourses } from '../../store/dashboard/dashboardSlice';

function StaffCourseForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses.data);
	const staffCourses = useSelector((state) => state.courses.myCourses.data);
	const staffCourse = useSelector((state) => state.dashboard);
	// const staffs = useSelector((state) => state.staffs.teachers.data);

	//courseIDs of selected staff
	let courseIDs = [];
	if (staffCourses !== undefined) {
		staffCourses.courses.map((course) => {
			courseIDs.push(course._id);
			return course;
		});
	}

	const param = useParams();

	//initialize the main hooks
	const course = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getCourses());
		dispatch(getStaffs());
		dispatch(myCourses({ teacherID: param.teacherID }));
	}, [dispatch, param.teacherID]);
	// console.log(staffCourses, courses);

	//Execute this function when you click submit, to add a course
	const editAssignedCourse = (e) => {
		e.preventDefault();

		const options = course.current.selectedOptions;
		const courses = Array.from(options).map((option) => option.value);
		// console.log(courses);

		const values = {
			courses,
			staffID: param.teacherID,
		};
		// action creator to dispatch information to the database
		dispatch(editAssignedCourses(values));

		// console.log(values);
	};

	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={editAssignedCourse}
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Staff name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter matricule"
						name="matricule"
						required
						value={staffCourses?.staff.name}
						disabled
					/>
				</div>
				{courseIDs?.length > 0 && (
					<div className="form-item" style={{ width: '50%' }}>
						<span className="desc">
							Course name <em>*</em>
						</span>
						<select name="credit" id="" ref={course} multiple size="5">
							{courses?.map((course, index) => (
								<option
									value={course._id}
									key={index}
									selected={courseIDs.includes(course._id)}
								>
									{`${course.name} (${course.code})`}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
			<button className="button-main button-main-medium mg-top-md">
				Modify
			</button>
			{staffCourse.error && staffCourse.errorMessage && (
				<Failure message={staffCourse.errorMessage} />
			)}
			{staffCourse.isLoading && <Loader />}
		</form>
	);
}

export default StaffCourseForm;
