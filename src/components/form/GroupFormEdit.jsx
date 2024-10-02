import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//import action creator slices
import { getSpecialties } from '../../store/specialty/specialtySlice';
import { editStudent } from '../../store/students/studentSlice';

import { getDateFromDateObject } from '../../utilities/getDate';

//import reactions
import Failure from '../signal/Failure';
import Loader from '../loaders/Loader';
import { editGroup, getGroup } from '../../store/messaging/messagingSlice';
import { getPrograms } from '../../store/program/programSlice';
import { getDepartments } from '../../store/departments/departmentSlice';

//initialize default information

function StudentFormEdit({ styles }) {
	//Get student id
	const param = useParams();
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const specialties = useSelector((state) => state.specialty.specialties.data);
	const studentss = useSelector((state) => state.students);
	const group = useSelector((state) => state.groupChat.group);
	const user = useSelector((state) => state.auth.user);
	const academicYears = useSelector((state) => state.years.academicYears);
	const departments = useSelector(
		(state) => state.departments.departments.data
	);
	const programs = useSelector((state) => state.programs.programs.data);

	console.log(group, 'GROUPPPPP');

	//initialize the main hooks
	const specialty = useRef();
	const department = useRef();
	const name = useRef();
	const program = useRef();
	const years = useRef();
	const description = useRef();
	const level = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getSpecialties());
		dispatch(getDepartments());
		dispatch(getPrograms());
		dispatch(getGroup(param.id));
	}, [dispatch, param.id]);

	//Execute this function when you click submit, to add a student
	const modifyGroup = (e) => {
		e.preventDefault();

		const specialtyOpts = Array.from(specialty.current.selectedOptions).map(
			(item) => item.value
		);

		let data = {
			specialty: specialtyOpts.length !== 0 ? specialtyOpts : null,
			specialtyNames:
				specialtyOpts.length !== 0
					? specialties
							.filter((spec) => specialtyOpts.includes(spec._id))
							.map((item) => item.name)
					: null,
			department: department.current.value || null,
			departmentName:
				departments.filter(
					(depart) => depart._id === department.current.value
				)[0]?.name || null,
			program: program.current.value || null,
			programName:
				programs.filter((school) => school._id === program.current.value)[0]
					?.name || null,
			academicYear: years.current.value,
			academicYearName: academicYears.filter(
				(year) => year._id === years.current.value
			)[0]?.schoolYear,
			time: new Date().toISOString(),
			lastMessage: `${name.current.value} was just edited!`,
			createdAt: new Date().toISOString(),
			createdBy: user.name,
			level: level.current.value,
			description: description.current.value,
			name: name.current.value,
		};
		console.log(data);
		dispatch(editGroup(param.id, data));
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={modifyGroup}
		>
			{/* <div className="form">
				<div className="form-item">
					<span className="desc">
						Matricule <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter matricule"
						name="matricule"
						required
						// value={studentData.matricule}
						defaultValue={student?.matricule}
						ref={matricule}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Student name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter student name"
						required
						name="name"
						defaultValue={student?.name}
						// value={studentData.name}
						ref={name}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Address <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter address"
						name="address"
						required
						// value={studentData.address}
						defaultValue={student?.address}
						ref={address}
						autoComplete="address"
					/>
				</div>
				{student?.dob && (
					<div className="form-item">
						<span className="desc">
							Date of Birth <em>*</em>
						</span>
						<input
							type="date"
							placeholder="Enter date of birth"
							required
							name="date-of-birth"
							ref={DOB}
							autoComplete="date-of-birth"
							defaultValue={getDateFromDateObject(dob, -1)}
							value={dobN !== '' ? dobN : getDateFromDateObject(dob, -1)}
							onChange={(e) => setDOB(e.target.value)}
						/>
					</div>
				)}
				<div className="form-item">
					<span className="desc">
						Place of birth <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter place of birth"
						required
						name="place-of-birth"
						defaultValue={student?.pob}
						ref={pob}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Email <em>*</em>
					</span>
					<input
						type="email"
						placeholder="Enter email"
						name="email"
						required
						defaultValue={student?.email}
						autoComplete="email"
						ref={email}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Student Tel <em>*</em>
					</span>
					<input
						type="number"
						placeholder="Enter student tel"
						required
						name="student-tel"
						defaultValue={student?.tel}
						autoComplete="first-name"
						ref={tel}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Parent name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter parent name"
						required
						name="parent-name"
						defaultValue={student?.parent_name}
						ref={parent_name}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Parent email <em>*</em>
					</span>
					<input
						type="email"
						placeholder="Enter parent email"
						required
						name="parent-email"
						defaultValue={student?.parent_email}
						ref={parent_email}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Parent tel <em>*</em>
					</span>
					<input
						type="number"
						placeholder="Enter parent tel"
						required
						name="parent-tel"
						defaultValue={student?.parent_tel}
						autoComplete="parent tel"
						ref={parent_tel}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Highest education level <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter highest education level"
						required
						name="entry-level"
						defaultValue={student?.entry_certificate}
						ref={entry_certificate}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Gender <em>*</em>
					</span>
					<select
						name="gender"
						id=""
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, gender: e.target.value };
							})
						}
						ref={gender}
					>
						<option
							value="male"
							selected={student?.gender === 'male' ? true : false}
						>
							Male
						</option>
						<option
							value="female"
							selected={student?.gender === 'female' ? true : false}
						>
							Female
						</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Level <em>*</em>
					</span>
					<select
						name="level"
						id=""
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, level: e.target.value };
							})
						}
						ref={level}
					>
						<option
							value="200"
							selected={student?.level === 200 ? true : false}
						>
							200
						</option>
						<option
							value="300"
							selected={student?.level === 300 ? true : false}
						>
							300
						</option>
						<option
							value="400"
							selected={student?.level === 400 ? true : false}
						>
							400
						</option>
						<option
							value="601"
							selected={student?.level === 601 ? true : false}
						>
							600 I
						</option>
						<option
							value="602"
							selected={student?.level === 602 ? true : false}
						>
							600 II
						</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Specialty <em>*</em>
					</span>
					<select name="specialty" id="" ref={specialty}>
						{specialties?.map((specialty) => {
							return (
								<option
									key={specialty._id}
									value={specialty._id}
									selected={
										specialty._id === `${student?.specialty?._id}`
											? true
											: false
									}
								>
									{specialty.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item mg-top form-file">
					<span className="text">Upload Student Photo (200px X 200px) </span>
					<input type="file" name="profile" className="mg-top" />
				</div>
			</div> */}

			<div className="form">
				<div className="form-item">
					<span className="desc">
						Group Name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter group name"
						required
						name="name"
						defaultValue={group?.name}
						ref={name}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Level <em>*</em>
					</span>
					<select name="level" id="" ref={level} defaultValue={group?.level}>
						<option value="200">200</option>
						<option value="300">300</option>
						<option value="400">400</option>
						<option value="601">600 I</option>
						<option value="602">600 II</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Academic year <em>*</em>
					</span>
					<select
						name="year"
						id=""
						ref={years}
						defaultValue={group?.value}
						required
						title="use the CTRL key to select multiple options"
					>
						{academicYears?.map((year) => {
							return (
								<option
									key={year._id}
									value={year._id}
									selected={year._id === group?.academicYear}
								>
									{year.schoolYear}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item textarea">
					<span className="desc">
						description <em>*</em>
					</span>
					<textarea
						defaultValue={group?.description}
						placeholder="Write group description..."
						required
						ref={description}
					></textarea>
				</div>
				<div className="form-item">
					<span className="desc">Specialty</span>
					<select
						name="specialty"
						id=""
						ref={specialty}
						multiple
						size="3"
						title="use the CTRL key to select multiple options"
					>
						{specialties?.map((specialty) => {
							return (
								<option
									key={specialty._id}
									value={specialty._id}
									selected={group?.specialty?.includes(specialty._id)}
								>
									{specialty.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">department</span>
					<select
						name="department"
						id=""
						ref={department}
						title="use the CTRL key to select multiple options"
					>
						<option value="">Select department</option>

						{departments?.map((depart) => {
							return (
								<option
									key={depart._id}
									value={depart._id}
									selected={depart._id === group?.department}
								>
									{depart.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">Program</span>
					<select
						name="program"
						id=""
						ref={program}
						title="use the CTRL key to select multiple options"
					>
						<option value="">Select program</option>

						{programs?.map((program) => {
							return (
								<option
									key={program._id}
									value={program._id}
									selected={program._id === group?.program}
								>
									{program.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				modify
			</button>
			{studentss.error === true && studentss.errorMessage && (
				<Failure message={studentss.errorMessage} />
			)}
			{/* {studentss.error === false && setStaffData(defaultInfo)} */}
			{studentss.isLoading && <Loader />}
		</form>
	);
}

export default StudentFormEdit;
