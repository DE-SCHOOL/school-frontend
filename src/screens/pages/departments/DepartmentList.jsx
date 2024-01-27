import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments } from '../../../store/departments/departmentSlice';

//importing Ui/Ux components
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';

//importing components
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TableDepartment } from '../../../components/tables/';

//initializing table header information
const departmentHeader = {
	name: 'Name',
	hod: 'HOD',
	program: 'Program',
};

function DepartmentList() {
	const departments = useSelector(
		(state) => state.departments.departments.data
	);
	const dispatch = useDispatch();

	// console.log(departments, 123);

	const [departmentState, setDepartmentState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(5);

	//Use Effect to dispatch getting staff actions
	useEffect(() => {
		dispatch(getDepartments());
	}, [dispatch]);
	return (
		<Layout>
			<SectionIntro title="Departments" main="Department" sub="List" />
			<SearchCategory
				styles={'mg-top-md mg-bt-md'}
				dropDown="program"
				data={departments}
				setData={setDepartmentState}
			/>
			<section className="teachers">
				<SectionMainIntro
					title="Departments"
					styles="mg-bt mg-top"
					link={'/departments/add'}
				/>
				{<PaggingNumSelect setItemsPerPage={setNumPages} />}
				{departments !== undefined && (
					<TableDepartment
						styles="mg-top"
						tableData={
							departmentState.length !== 0 ? departmentState : departments
						}
						header={departmentHeader}
						paggingNum={Number(numPages)}
					/>
				)}

				{/* Display paggination page only if staffs have been searched from db */}
				{departments !== undefined && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse in the length if staff data is loaded or staff has been searched
						totalData={
							departmentState.length !== 0
								? departmentState.length
								: departments.length
						}
					/>
				)}
			</section>
		</Layout>
	);
}

export default DepartmentList;
