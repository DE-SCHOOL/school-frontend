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

const courseHeader = {
	id: 'Code',
	name: 'Name',
	levels: 'Level (s)',
	semester: 'Semester',
	status: 'Status',
	acts: 'actions',
	specialty: 'specialties',
	credits: 'Credit Value',
};

function MyCourses() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses.data);

	//saving the student data in a useState
	const [coursesState, setCoursesState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(5);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Courses" main="Course" sub="List" />

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
					title="Courses"
					styles="mg-bt mg-top"
					link={'/courses/add'}
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{courses !== undefined && (
					<TableCourses
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={coursesState.length !== 0 ? coursesState : courses}
						header={courseHeader}
						paggingNum={numPages}
						tableType="personal"
					/>
				)}

				{/* Show student table information only if students data has loaded */}
				{courses !== undefined && (
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
		</Layout>
	);
}

export default MyCourses;
