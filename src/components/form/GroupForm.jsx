import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//import action creator slices
import { getSpecialties } from '../../store/specialty/specialtySlice';
import { getDepartments } from '../../store/departments/departmentSlice';
import { getPrograms } from '../../store/program/programSlice';

//import reactions
// import {Failure} from '../signal';
import Failure from './../signal/Failure';
import Success from './../signal/Success';
import Loader from '../loaders/Loader';
import { createGroup } from '../../store/messaging/messagingSlice';

//initialize default information
const defaultInfo = {
	level: '200',
	department: 'male',
	specialtyNames: '',
	name: '',
	specialty: '',
	departmentName: '',
	program: '',
	programName: '',
	lastMessage: '',
	image: null,
	time: null,
	description: '',
	academicYear: '',
	academicYearName: '',
};

function GroupForm({ styles, type = '' }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const specialties = useSelector((state) => state.specialty.specialties.data);
	const programs = useSelector((state) => state.programs.programs.data);
	const academicYears = useSelector((state) => state.years.academicYears);
	const departments = useSelector(
		(state) => state.departments.departments.data
	);
	const user = useSelector((state) => state.auth.user);

	const groupInfo = useSelector((state) => state.groupChat);

	//initialize the main hooks
	const [groupData, setGroupData] = useState(defaultInfo);
	const specialty = useRef();
	const department = useRef();
	const program = useRef();
	const years = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getSpecialties());
		dispatch(getDepartments());
		dispatch(getPrograms());
	}, [dispatch]);

	//Execute this function when you click submit, to add a student
	const registerStudent = (e) => {
		e.preventDefault();
		const specialtyOpts = Array.from(specialty.current.selectedOptions).map(
			(item) => item.value
		);

		let data = {
			...groupData,
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
			lastMessage: `${groupData.name} was just created!`,
			createdAt: new Date().toISOString(),
			createdBy: user.name,
		};

		dispatch(createGroup(data));
		setGroupData(defaultInfo);
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={registerStudent}
		>
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
						value={groupData.name}
						onChange={(e) =>
							setGroupData((prev) => {
								return { ...prev, name: e.target.value };
							})
						}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Level <em>*</em>
					</span>
					<select
						name="level"
						id=""
						onChange={(e) =>
							setGroupData((prev) => {
								return { ...prev, level: e.target.value };
							})
						}
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
						Academic year <em>*</em>
					</span>
					<select
						name="year"
						id=""
						ref={years}
						required
						title="use the CTRL key to select multiple options"
					>
						{academicYears?.map((year) => {
							return (
								<option key={year._id} value={year._id}>
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
						value={groupData.description}
						onChange={(e) =>
							setGroupData((prev) => {
								return { ...prev, description: e.target.value };
							})
						}
						placeholder="Write group description..."
						required
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
								<option key={specialty._id} value={specialty._id}>
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
								<option key={depart._id} value={depart._id}>
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
								<option key={program._id} value={program._id}>
									{program.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{groupInfo.error === true && groupInfo.errorMessage && (
				<Failure message={groupInfo.errorMessage} />
			)}
			{groupInfo.success === true && <Success />}
			{/* {groupInfo.error === false && setStaffData(defaultInfo)} */}
			{groupInfo.isLoading && <Loader />}
		</form>
	);
}

export default GroupForm;
