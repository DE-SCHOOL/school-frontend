//importing react application
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { BsRepeat } from 'react-icons/bs';
// import { useNavigate } from 'react-router-dom';

//importing the dispatcher functions
import { getSpecialties } from '../../store/specialty/specialtySlice';
import { getDepartments } from './../../store/departments/departmentSlice';
import { getPrograms } from '../../store/program/programSlice';
import { getStudentsPerSearch } from '../../store/exams/examSlice';

function SearchStudents({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const dropDownData = useSelector((state) => {
		const specialty =
			state.specialty.specialties.length !== 0 ? state.specialty : null;
		const departments =
			state.departments.departments.length !== 0 ? state.departments : null;
		const programs =
			state.programs.programs.length !== 0 ? state.programs : null;

		return { specialty, departments, programs };
	});

	//Initialzing hooks
	const spty = useRef();
	const dept = useRef();
	const pgm = useRef();
	const name = useRef();
	const level = useRef();

	//search students from db
	const handleSearch = (e) => {
		e.preventDefault();

		//collecting search data
		const searchData = {
			specialty: spty.current.value,
			department: dept.current.value,
			program: pgm.current.value,
			name: name.current.value,
			level: level.current.value,
		};

		//clean the data
		for (let x in searchData) {
			if (searchData[x] === '') delete searchData[x];
		}

		console.log(searchData);
		dispatch(getStudentsPerSearch(searchData));
	};
	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getSpecialties());
		dispatch(getDepartments());
		dispatch(getPrograms());

		// eslint-disable-next-line
	}, [dispatch]);

	return (
		<form
			action=""
			name="search-category"
			className={`search-category ${styles ? styles : ''}`}
			onSubmit={handleSearch}
		>
			<input placeholder="Search by name" type="text" name="name" ref={name} />
			<select name="level" ref={level}>
				<option value="">Search by Level</option>
				<option value="200">Level 200</option>
				<option value="300">Level 300</option>
				<option value="400">Level 400</option>
			</select>

			<select name="specialty" ref={spty}>
				<option value="">Search by specialty</option>

				{dropDownData?.specialty?.specialties?.data?.map((specialty) => {
					return (
						<option key={specialty._id} value={specialty._id}>
							{specialty.name}
						</option>
					);
				})}
			</select>

			<select name="department" ref={dept}>
				<option value="">Search by departments</option>

				{dropDownData?.departments?.departments?.data?.map((department) => {
					return (
						<option key={department._id} value={department._id}>
							{department.name}
						</option>
					);
				})}
			</select>

			<select name="program" ref={pgm}>
				<option value="">Search by programs</option>

				{dropDownData?.programs?.programs?.data?.map((program) => {
					return (
						<option key={program._id} value={program._id}>
							{program.name}
						</option>
					);
				})}
			</select>

			<button
				className="button-main button-main-medium"
				style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
			>
				Search
			</button>
		</form>
	);
}

export default SearchStudents;
