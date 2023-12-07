import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getDepartments } from '../../store/departments/departmentSlice';
import { createSpecialties } from '../../store/specialty/specialtySlice';

//initialize default information
const defaultInfo = {
	name: '',
	department: '',
};

function SpecialtyForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.departments.departments.data
	);
	const specialty = useSelector((state) => state.specialty);
	console.log(specialty);
	//initialize the main hooks
	const [specialtyData, setSpecialtyData] = useState(defaultInfo);
	const department = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getDepartments());
	}, [dispatch]);

	//Execute this function when you click submit, to add a student
	const createSpecialty = (e) => {
		e.preventDefault();

		console.log(department.current.value);
		dispatch(
			createSpecialties({
				...specialtyData,
				department: department.current.value,
			})
		);
		setSpecialtyData(defaultInfo);
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={createSpecialty}
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Specialty name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter student name"
						required
						name="name"
						value={specialtyData.name}
						onChange={(e) =>
							setSpecialtyData((prev) => {
								return { ...prev, name: e.target.value };
							})
						}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Department <em>*</em>
					</span>
					<select
						name="department"
						id=""
						onChange={(e) =>
							setSpecialtyData((prev) => {
								return { ...prev, program: e.target.value };
							})
						}
						ref={department}
					>
						{departments?.map((department) => {
							return (
								<option key={department._id} value={department._id}>
									{department.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{specialty.error && specialty.errorMessage && (
				<Failure message={specialty.errorMessage} />
			)}
			{specialty.isLoading && <Loader />}
		</form>
	);
}
export default SpecialtyForm;
