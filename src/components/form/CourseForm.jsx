import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getSpecialties } from '../../store/specialty/specialtySlice';
import { createCourse as newCourse } from '../../store/courses/courseSlice';

//initialize default information
const defaultInfo = {
	name: '',
	specialty: '',
	code: '',
	semester: '',
	level: '',
	status: '',
	credit_value: '',
};

function CourseForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const course = useSelector((state) => state.courses);
	const specialties = useSelector((state) => state.specialty.specialties.data);

	//initialize the main hooks
	const [courseData, setCourseData] = useState(defaultInfo);
	const specialty = useRef();
	const levels = useRef();
	const semester = useRef();
	const status = useRef();
	const credits = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getSpecialties());
	}, [dispatch]);

	//Execute this function when you click submit, to add a course
	const createCourse = (e) => {
		e.preventDefault();

		// Get all the selected specialties as an array
		const options1 = specialty.current.selectedOptions;
		const specialties = Array.from(options1).map((option) => option.value);

		//Get all the selected level as an array
		const options2 = levels.current.selectedOptions;
		const allLevels = Array.from(options2).map((option) => option.value);

		//Courses object
		const values = {
			levels: allLevels,
			semester: semester.current.value,
			credit_value: credits.current.value,
			status: status.current.value,
			name: courseData.name,
			code: courseData.code,
			specialty: specialties,
		};

		//action creator to dispatch information to the database
		dispatch(newCourse(values));

		// Setting values back to initial
		setCourseData(defaultInfo);
		specialty.current.value = null;
		levels.current.value = null;
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
						Course name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter course name"
						required
						name="name"
						value={courseData.name}
						onChange={(e) =>
							setCourseData((prev) => {
								return { ...prev, name: e.target.value };
							})
						}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						levels <em>*</em>
					</span>
					<select
						name="levels"
						id=""
						ref={levels}
						multiple
						size="3"
						required
						title="use the CTRL key to select multiple options"
					>
						<option value="200">200</option>
						<option value="300">300</option>
						<option value="400">400</option>
						<option value="601">600 I</option>
						<option value="602">600 II</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Credit Value <em>*</em>
					</span>
					<select name="credit" id="" ref={credits}>
						{Array.from({ length: 20 }).map((_, index) => (
							<option value={`${index + 1}`} key={index}>
								{index + 1}
							</option>
						))}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Semester <em>*</em>
					</span>
					<select
						name="semester"
						id=""
						ref={semester}
						onChange={(e) =>
							setCourseData((prev) => {
								return { ...prev, semester: e.target.value };
							})
						}
						value={courseData.semester}
					>
						<option value="s1">First Semester</option>
						<option value="s2">Second Semester</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Specialty <em>*</em>
					</span>
					<select
						name="specialty"
						id=""
						ref={specialty}
						multiple
						size="3"
						required
						title="use the CTRL key to select multiple options"
					>
						{specialties?.map((specialty) => {
							return (
								<option key={specialty._id} value={specialty._id}>
									{specialty.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Status <em>*</em>
					</span>
					<select name="status" id="" ref={status}>
						<option value="compulsory">Compulsory</option>
						<option value="elective">Elective</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Course code <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter course code"
						required
						name="code"
						value={courseData.code}
						onChange={(e) =>
							setCourseData((prev) => {
								return { ...prev, code: e.target.value };
							})
						}
						autoComplete="code"
					/>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{course.error && course.errorMessage && (
				<Failure message={course.errorMessage} />
			)}
			{course.isLoading && <Loader />}
		</form>
	);
}

export default CourseForm;
