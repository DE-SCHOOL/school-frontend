import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentsPerAcademicYear } from '../../../store/students/studentSlice';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout';
import { PaggingNumSelect, Paggination } from '../../../components/pagging';
import SearchCategory from '../../../components/search/SearchCategory';
import DeleteModal from '../../../components/mod/DeleteModal';
import Loader from '../../../components/loaders/Loader';
import { getAllGroups } from '../../../store/messaging/messagingSlice';
import TableGroups from '../../../components/tables/TableGroups';

const groupHeader = {
	name: 'Name',
	level: 'class',
	description: 'description',
	department: 'department',
	program: 'program',
	specialty: 'specialty',
	createdBy: 'Created By',
	acts: 'actions',
};

function GroupList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.students.students);
	const uiState = useSelector((state) => state.uiState.deleteOpt);
	const isLoading = useSelector((state) => state.students.isLoading);
	const year = useSelector((state) => state.years.currentYear);
	const groups = useSelector((state) => state.groupChat.groups);

	// console.log(groups, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');

	//saving the student data in a useState
	const [groupsState, setGroupsState] = useState(groups);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(25);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getAllGroups());
		if (year?._id !== undefined)
			dispatch(getAllStudentsPerAcademicYear(year?._id));
	}, [dispatch, year?._id]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Groups" main="Group" sub="List" />

			{/* Displaying search filter only if student data has fully loaded */}
			{students.length !== 0 && (
				<SearchCategory
					styles={'mg-top-md mg-bt-md'}
					dropDown="specialty"
					data={groups}
					setData={setGroupsState}
					isGroup={true}
				/>
			)}
			<section className="students mg-top-md">
				{/* Section About, Download, Add, and Refresh */}
				<SectionMainIntro
					title="Groups"
					styles="mg-bt mg-top"
					link={'/communication/add-group'}
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<div className="main-table-container">
						<TableGroups
							styles="mg-top"
							// parse student data, or student searched data in case a search was performed
							tableData={groupsState.length !== 0 ? groupsState : groups}
							header={groupHeader}
							paggingNum={numPages}
						/>
					</div>
				)}

				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={
							groupsState.length !== 0 ? groupsState.length : groups.length
						}
					/>
				)}
			</section>
			{uiState.type === 'group' && (
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

export default GroupList;
