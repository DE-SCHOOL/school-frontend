import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';

//import action creator slices
import { getStaffs } from '../../store/staffs/staffSlice';
import { editPrograms, getProgram } from '../../store/program/programSlice';

function ProgramForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const staffs = useSelector((state) => state.staffs.teachers.data);
	const programState = useSelector((state) => state.programs);
	const program = useSelector((state) => state.programs.program);

	//initialize the main hooks
	const param = useParams();
	const director = useRef();
	const subDirector = useRef();
	const name = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getStaffs());
		dispatch(getProgram({ id: param.id }));
	}, [dispatch, param.id]);

	//Execute this function when you click submit, to add a student
	const ModifyProgram = (e) => {
		e.preventDefault();

		dispatch(
			editPrograms({
				name: name.current.value,
				director: director.current.value,
				deputyDirector: subDirector.current.value,
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
			onSubmit={ModifyProgram}
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
						defaultValue={program?.name}
						ref={name}
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
								<option
									key={staff._id}
									value={staff._id}
									selected={program?.director?._id === staff._id}
								>
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
								<option
									key={staff._id}
									value={staff._id}
									selected={program?.deputyDirector?._id === staff._id}
								>
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
