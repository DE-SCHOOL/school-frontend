import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getStaffs } from '../../store/staffs/staffSlice';
import { getPrograms } from './../../store/program/programSlice';
import {
	getDepartment,
	editDepartment,
} from '../../store/departments/departmentSlice';
import { useParams } from 'react-router-dom';

function DepartmentFormEdit({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const programs = useSelector((state) => state.programs.programs.data);
	const HOD = useSelector((state) => state.staffs.teachers.data);
	const departments = useSelector((state) => state.departments);
	const department = useSelector((state) => state.departments.department);
	console.log(department);

	//initialize the main hooks
	const param = useParams();

	const program = useRef();
	const name = useRef();
	const hod = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getPrograms());
		dispatch(getStaffs());
		dispatch(getDepartment({ id: param.id }));
	}, [dispatch, param.id]);

	//Execute this function when you click submit, to add a student
	const createDepartment = (e) => {
		e.preventDefault();

		dispatch(
			editDepartment({
				program: program.current.value,
				hod: hod.current.value,
				name: name.current.value,
				id: param.id,
			})
		);
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
						defaultValue={department.name}
						ref={name}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Program <em>*</em>
					</span>
					<select name="program" id="" ref={program}>
						{programs?.map((program) => {
							return (
								<option
									key={program._id}
									value={program._id}
									selected={program._id === department?.program?._id}
								>
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
					<select name="specialty" id="" ref={hod}>
						{HOD?.map((hod) => {
							return (
								<option
									key={hod._id}
									value={hod._id}
									selected={hod._id === department?.hod?._id}
								>
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
			{departments.error && <Failure message={departments.errorMessage} />}
			{departments.isLoading && <Loader />}
		</form>
	);
}

export default DepartmentFormEdit;
