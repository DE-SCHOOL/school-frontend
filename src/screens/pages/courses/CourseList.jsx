import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../../store/courses/courseSlice';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TableCourses } from '../../../components/tables/';

import DeleteModal from '../../../components/mod/DeleteModal';
import Loader from './../../../components/loaders/Loader';
import SectionNotFound from '../../../components/layout/SectionNotFound';

const courseHeader = {
	id: 'Code',
	name: 'Name',
	levels: 'Classes',
	semester: 'Semester',
	status: 'Status',
	acts: 'actions',
	specialty: 'specialties',
	credits: 'Credit Value',
};

function CourseList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses.data);
	const uiState = useSelector((state) => state.uiState.deleteOpt);
	const isLoading = useSelector((state) => state.courses.isLoading);

	//saving the student data in a useState
	const [coursesState, setCoursesState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(25);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Subjects" main="Subject" sub="List" />

			{/* Displaying search filter only if student data has fully loaded */}
			{/* {courses?.length !== 0 && ( */}
			<SearchCategory
				styles={'mg-top-md mg-bt-md'}
				dropDown="course"
				data={courses}
				setData={setCoursesState}
			/>
			{/* )} */}
			<section className="teachers">
				{/* Section About, Download, Add, and Refresh */}
				<SectionMainIntro
					title="Subjects"
					styles="mg-bt mg-top"
					link={'/courses/add'}
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{courses !== undefined && courses?.length !== 0 && (
					<TableCourses
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={coursesState.length !== 0 ? coursesState : courses}
						header={courseHeader}
						paggingNum={numPages}
					/>
				)}

				{/* Show student table information only if students data has loaded */}
				{courses !== undefined && courses?.length !== 0 && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={
							coursesState.length !== 0 ? coursesState.length : courses.length
						}
					/>
				)}
			</section>
			{courses?.length === 0 && isLoading === false && (
				<SectionNotFound text={'No courses yet'} />
			)}
			{uiState.type === 'course' && (
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

export default CourseList;
