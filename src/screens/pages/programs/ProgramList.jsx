import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrograms } from '../../../store/program/programSlice';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TablePrograms } from '../../../components/tables/';

const courseHeader = {
	name: 'Name',
	director: 'Director',
	subDirector: 'Sub Director',
};

function ProgramList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const programs = useSelector((state) => state.programs.programs.data);

	//saving the student data in a useState
	const [programsState, setProgramsState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(5);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getPrograms());
	}, [dispatch]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Programs" main="Program" sub="List" />

			{/* Displaying search filter only if student data has fully loaded */}
			{/* {courses?.length !== 0 && ( */}
			<SearchCategory
				styles={'mg-top-md mg-bt-md'}
				dropDown="course"
				data={programs}
				setData={setProgramsState}
			/>
			{/* )} */}
			<section className="teachers">
				{/* Section About, Download, Add, and Refresh */}
				<SectionMainIntro
					title="Programs"
					styles="mg-bt mg-top"
					link={'/programs/add'}
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{programs !== undefined && (
					<TablePrograms
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={programsState.length !== 0 ? programsState : programs}
						header={courseHeader}
						paggingNum={numPages}
					/>
				)}

				{/* Show student table information only if students data has loaded */}
				{programs !== undefined && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={
							programsState.length !== 0
								? programsState.length
								: programs.length
						}
					/>
				)}
			</section>
		</Layout>
	);
}

export default ProgramList;
