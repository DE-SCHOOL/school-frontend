import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getStaffs } from '../../store/staffs/staffSlice';
import { createPrograms as newProgram } from '../../store/program/programSlice';

//initialize default information
const defaultInfo = {
	name: '',
	director: '',
	deputyDirector: '',
};

function ProgramForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const staffs = useSelector((state) => state.staffs.teachers.data);
	const programState = useSelector((state) => state.programs);

	//initialize the main hooks
	const [programData, setProgramData] = useState(defaultInfo);
	const director = useRef();
	const subDirector = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getStaffs());
	}, [dispatch]);

	//Execute this function when you click submit, to add a student
	const createPrograms = (e) => {
		e.preventDefault();

		dispatch(
			newProgram({
				name: programData.name,
				director: director.current.value,
				deputyDirector: subDirector.current.value,
			})
		);
		setProgramData(defaultInfo);
		// director.current.value = '';
		// subDirector.current.value = '';
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={createPrograms}
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Program name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter student name"
						required
						name="name"
						value={programData.name}
						onChange={(e) =>
							setProgramData((prev) => {
								return { ...prev, name: e.target.value };
							})
						}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Director <em>*</em>
					</span>
					<select name="director" id="" ref={director}>
						{staffs?.map((staff) => {
							return (
								<option key={staff._id} value={staff._id}>
									{staff.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Sub Director <em>*</em>
					</span>
					<select name="sub_director" id="" ref={subDirector}>
						{staffs?.map((staff) => {
							return (
								<option key={staff._id} value={staff._id}>
									{staff.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{programState.error && programState.errorMessage && (
				<Failure message={programState.errorMessage} />
			)}
			{programState.isLoading && <Loader />}
		</form>
	);
}
export default ProgramForm;
