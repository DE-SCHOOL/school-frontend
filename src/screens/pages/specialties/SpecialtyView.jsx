import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialtyCourses } from '../../../store/specialty/specialtySlice';
import { useParams } from 'react-router-dom';

//importing Ui/Ux components
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';

//importing components
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TableCourses } from '../../../components/tables/';

//initializing table header information
const coursesHeader = {
	id: 'Code',
	name: 'Name',
	levels: 'Level (s)',
	semester: 'Semester',
	status: 'Status',
	acts: 'none',
	specialty: 'specialties',
	credits: 'Credit Value',
};

function SpecialtyView() {
	const specialtyCourses = useSelector(
		(state) => state.specialty.specialties.data
	);
	const specialtyName = useSelector((state) => state.specialty.specialtyName);
	const dispatch = useDispatch();
	// console.log(specialtyCourses);
	//use params
	const params = useParams();

	const [specialtyCourseState, setSpecialtyCourseState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(25);

	//Use Effect to dispatch getting staff actions
	useEffect(() => {
		dispatch(getSpecialtyCourses({ id: params.id }));

		// eslint-disable-next-line
	}, [dispatch]);
	return (
		<Layout>
			<SectionIntro title={`${specialtyName}`} main="Specialty" sub="courses" />
			<SearchCategory
				styles={'mg-top-md mg-bt-md'}
				dropDown="courses"
				data={specialtyCourses}
				setData={setSpecialtyCourseState}
			/>
			<section className="teachers">
				<SectionMainIntro
					title="Specialties"
					styles="mg-bt"
					link={'/specialties/add'}
				/>
				{<PaggingNumSelect setItemsPerPage={setNumPages} />}
				{specialtyCourses !== undefined && (
					<TableCourses
						styles="mg-top"
						tableData={
							specialtyCourseState.length !== 0
								? specialtyCourseState
								: specialtyCourses
						}
						header={coursesHeader}
						paggingNum={Number(numPages)}
					/>
				)}

				{/* Display paggination page only if staffs have been searched from db */}
				{specialtyCourses !== undefined && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse in the length if staff data is loaded or staff has been searched
						totalData={
							specialtyCourseState.length !== 0
								? specialtyCourseState.length
								: specialtyCourses.length
						}
					/>
				)}
			</section>
		</Layout>
	);
}

export default SpecialtyView;
