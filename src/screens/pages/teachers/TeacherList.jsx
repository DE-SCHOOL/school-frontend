import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffs } from '../../../store/staffs/staffSlice';

//importing Ui/Ux components
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';

//importing components
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TableStaff } from '../../../components/tables/';

//initializing table header information
const staffHeader = {
	id: 'Matricule',
	name: 'Name',
	email: 'email',
	gender: 'gender',
	role: 'role',
	dob: 'DoB',
	tel: 'phone Number',
	acts: 'actions',
	// department: 'department',
	address: 'address',
};

function TeacherList() {
	const staffs = useSelector((state) => state.staffs.teachers.data);
	const dispatch = useDispatch();

	const [staffsState, setStaffsState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(5);

	//Use Effect to dispatch getting staff actions
	useEffect(() => {
		dispatch(getStaffs());
	}, [dispatch]);
	return (
		<Layout>
			<SectionIntro title="Teachers" main="Teacher" sub="List" />
			<SearchCategory
				styles={'mg-top-md mg-bt-md'}
				dropDown=""
				data={staffs}
				setData={setStaffsState}
			/>
			<section className="teachers">
				<SectionMainIntro
					title="Teachers"
					styles="mg-bt mg-top"
					link={'/teachers/add'}
				/>
				{<PaggingNumSelect setItemsPerPage={setNumPages} />}
				{staffs !== undefined && (
					<TableStaff
						styles="mg-top"
						tableData={staffsState.length !== 0 ? staffsState : staffs}
						header={staffHeader}
						paggingNum={Number(numPages)}
					/>
				)}

				{/* Display paggination page only if staffs have been searched from db */}
				{staffs !== undefined && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse in the length if staff data is loaded or staff has been searched
						totalData={
							staffsState.length !== 0 ? staffsState.length : staffs.length
						}
					/>
				)}
			</section>
		</Layout>
	);
}

export default TeacherList;
