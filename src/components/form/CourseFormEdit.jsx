import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getSpecialties } from '../../store/specialty/specialtySlice';
import { editCourse, getCourse } from '../../store/courses/courseSlice';
import { useParams } from 'react-router-dom';

function CourseForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const courseState = useSelector((state) => state.courses);
	const course = useSelector((state) => state.courses.course);
	const specialties = useSelector((state) => state.specialty.specialties.data);

	let courseSpecialties = [];

	course?.specialty?.map((el) => {
		courseSpecialties.push(el._id);
		return el;
	});

	//initialize the main hooks
	const param = useParams();
	const specialty = useRef();
	const levels = useRef();
	const semester = useRef();
	const status = useRef();
	const credits = useRef();
	const name = useRef();
	const code = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getSpecialties());
		dispatch(getCourse({ id: param.id }));
	}, [dispatch, param.id]);

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
			name: name.current.value,
			code: code.current.value,
			specialty: specialties,
		};

		//action creator to dispatch information to the database
		dispatch(editCourse({ values, id: param.id }));
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
						defaultValue={course?.name}
						ref={name}
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
						<option value="200" selected={course?.levels?.includes(200)}>
							200
						</option>
						<option value="300" selected={course?.levels?.includes(300)}>
							300
						</option>
						<option value="400" selected={course?.levels?.includes(400)}>
							400
						</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Credit Value <em>*</em>
					</span>
					<select name="credit" id="" ref={credits}>
						{Array.from({ length: 20 }).map((_, index) => (
							<option
								value={`${index + 1}`}
								key={index}
								selected={course?.credit_value === index + 1}
							>
								{index + 1}
							</option>
						))}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Semester <em>*</em>
					</span>
					<select name="semester" id="" ref={semester}>
						<option value="s1" selected={course?.semester === 's1'}>
							First Semester
						</option>
						<option value="s2" selected={course?.semester === 's2'}>
							Second Semester
						</option>
					</select>
				</div>
				{(courseSpecialties.length > 0 || specialties?.length > 0) && (
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
									<option
										key={specialty._id}
										value={specialty._id}
										selected={courseSpecialties.includes(specialty._id)}
									>
										{specialty.name}
									</option>
								);
							})}
						</select>
					</div>
				)}
				<div className="form-item">
					<span className="desc">
						Status <em>*</em>
					</span>
					<select name="status" id="" ref={status}>
						<option
							value="compulsory"
							selected={course?.status === 'compulsory'}
						>
							Compulsory
						</option>
						<option value="elective" selected={course?.status === 'elective'}>
							Elective
						</option>
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
						defaultValue={course?.code}
						ref={code}
						autoComplete="code"
					/>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{courseState.error && courseState.errorMessage && (
				<Failure message={courseState.errorMessage} />
			)}
			{courseState.isLoading && <Loader />}
		</form>
	);
}

export default CourseForm;
