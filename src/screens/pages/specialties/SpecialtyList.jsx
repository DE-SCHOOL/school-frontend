import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialties } from '../../../store/specialty/specialtySlice';

//importing Ui/Ux components
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';

//importing components
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TableSpecialties } from '../../../components/tables/';

import DeleteModal from '../../../components/mod/DeleteModal';
import Loader from './../../../components/loaders/Loader';

//initializing table header information
const departmentHeader = {
	name: 'Name',
	department: 'Department',
};

function SpecialtyList() {
	const specialties = useSelector((state) => state.specialty.specialties.data);
	const dispatch = useDispatch();

	const uiState = useSelector((state) => state.uiState.deleteOpt);
	const isLoading = useSelector((state) => state.specialty?.isLoading);

	const [specialtyState, setSpecialtyState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(5);

	//Use Effect to dispatch getting staff actions
	useEffect(() => {
		dispatch(getSpecialties());
	}, [dispatch]);
	return (
		<Layout>
			<SectionIntro title="Speciaties" main="Specialty" sub="List" />
			<SearchCategory
				styles={'mg-top-md mg-bt-md'}
				dropDown="department"
				data={specialties}
				setData={setSpecialtyState}
			/>
			<section className="teachers">
				<SectionMainIntro
					title="Specialties"
					styles="mg-bt mg-top"
					link={'/specialties/add'}
				/>
				{<PaggingNumSelect setItemsPerPage={setNumPages} />}
				{specialties !== undefined && (
					<TableSpecialties
						styles="mg-top"
						tableData={
							specialtyState.length !== 0 ? specialtyState : specialties
						}
						header={departmentHeader}
						paggingNum={Number(numPages)}
					/>
				)}

				{/* Display paggination page only if staffs have been searched from db */}
				{specialties !== undefined && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse in the length if staff data is loaded or staff has been searched
						totalData={
							specialtyState.length !== 0
								? specialtyState.length
								: specialties.length
						}
					/>
				)}
			</section>
			{uiState.type === 'specialty' && (
				<DeleteModal
					type={uiState.type}
					id={uiState.deleteID}
					name={uiState.deleteName}
				/>
			)}
			{isLoading && <Loader />}
		</Layout>
	);
}

export default SpecialtyList;
