import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getDepartments } from '../../store/departments/departmentSlice';
import {
	editSpecialty,
	getSpecialty,
} from '../../store/specialty/specialtySlice';
import { useParams } from 'react-router-dom';

function SpecialtyFormEdit({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.departments.departments.data
	);
	const option = useSelector((state) => state.specialty);
	const specialty = useSelector((state) => state.specialty.specialty);

	//initialize the main hooks
	const param = useParams();
	const department = useRef();
	const name = useRef();

	//Get all departments after initial render
	useEffect(() => {
		dispatch(getDepartments());
		dispatch(getSpecialty({ id: param.id }));
	}, [dispatch, param.id]);

	//Execute this function when you click submit, to add a student
	const modifySpecialty = (e) => {
		e.preventDefault();

		dispatch(
			editSpecialty({
				department: department.current.value,
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
			onSubmit={modifySpecialty}
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
						defaultValue={specialty?.name}
						ref={name}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Department <em>*</em>
					</span>
					<select name="department" id="" ref={department}>
						{departments?.map((department) => {
							return (
								<option
									key={department._id}
									value={department._id}
									selected={department._id === specialty?.department?._id}
								>
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
			{option.error && option.errorMessage && (
				<Failure message={option.errorMessage} />
			)}
			{option.isLoading && <Loader />}
		</form>
	);
}
export default SpecialtyFormEdit;
