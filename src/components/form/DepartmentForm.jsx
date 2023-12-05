import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getStaffs } from '../../store/staffs/staffSlice';
import { getPrograms } from './../../store/program/programSlice';
import { createDepartment as newDepartment } from '../../store/departments/departmentSlice';
//initialize default information
const defaultInfo = {
	name: '',
	program: '',
	hod: '',
};

function DepartmentForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const programs = useSelector((state) => state.programs.programs.data);
	const HOD = useSelector((state) => state.staffs.teachers.data);
	const department = useSelector((state) => state.departments);

	console.log(department, programs, 123456);
	//initialize the main hooks
	const [departmentData, setDepartmentData] = useState(defaultInfo);
	const program = useRef();
	const hod = useRef();
	// console.log(departmentData, 'DATA');

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getPrograms());
		dispatch(getStaffs());
	}, [dispatch]);

	//Execute this function when you click submit, to add a student
	const createDepartment = (e) => {
		e.preventDefault();

		// dispatch(
		// 	addStudent({ ...departmentData, specialty: program.current.value })
		// );
		// setDepartmentData(defaultInfo);
		dispatch(
			newDepartment({
				...departmentData,
				program: program.current.value,
				hod: hod.current.value,
			})
		);
		setDepartmentData(defaultInfo);
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={createDepartment}
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Department name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter student name"
						required
						name="name"
						value={departmentData.name}
						onChange={(e) =>
							setDepartmentData((prev) => {
								return { ...prev, name: e.target.value };
							})
						}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Program <em>*</em>
					</span>
					<select
						name="program"
						id=""
						onChange={(e) =>
							setDepartmentData((prev) => {
								return { ...prev, program: e.target.value };
							})
						}
						ref={program}
					>
						{programs?.map((program) => {
							return (
								<option key={program._id} value={program._id}>
									{program.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						HOD <em>*</em>
					</span>
					<select
						name="specialty"
						id=""
						onChange={(e) =>
							setDepartmentData((prev) => {
								return { ...prev, hod: e.target.value };
							})
						}
						ref={hod}
					>
						{HOD?.map((hod) => {
							return (
								<option key={hod._id} value={hod._id}>
									{hod.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{department.error && <Failure message={department.errorMessage} />}
			{department.isLoading && <Loader />}
		</form>
	);
}

export default DepartmentForm;
