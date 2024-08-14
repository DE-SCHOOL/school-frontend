import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';
import {
	createSchoolYear,
	getAcademicYears,
} from '../../store/academic year/academicYearSlice';

//initialize default information
const defaultInfo = {
	director: '',
};

function AcademicYearForm({ styles }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const academicYears = useSelector((state) => state.years.academicYears);
	const academicYearState = useSelector((state) => state.years);


	//initialize the main hooks
	const yearData = useRef();

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getAcademicYears());
	}, [dispatch]);

	//Execute this function when you click submit, to add academic year;
	const createAcademicYear = (e) => {
		e.preventDefault();
		const data = {
			academicYear: yearData.current.value,
		};

		dispatch(createSchoolYear(data));
    dispatch(getAcademicYears());
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={createAcademicYear}
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						School Year <em>*</em>
					</span>
					<select name="director" id="" ref={yearData}>
						{academicYears?.length > 0 &&
							academicYears?.map((years) => {
								return (
									<option key={years._id} value={years.schoolYear}>
										{years.schoolYear}
									</option>
								);
							})}
						<option
							value={`${new Date().getFullYear()}/${
								new Date().getFullYear() + 1
							}`}
						>
							{`${new Date().getFullYear()}/${new Date().getFullYear() + 1}`}
						</option>
					</select>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{academicYearState.error && academicYearState.errorMessage && (
				<Failure message={academicYearState.errorMessage} />
			)}
			{academicYearState.isLoading && <Loader />}
		</form>
	);
}
export default AcademicYearForm;
