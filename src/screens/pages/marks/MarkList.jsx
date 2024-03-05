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
import Failure from '../../../components/signal/Failure';
import Loader from '../../../components/loaders/Loader';

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

function MarkList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses.data);
	const course = useSelector((state) => state.courses);

	//saving the student data in a useState
	const [coursesState, setCoursesState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(5);

	//useEffect to dispatch student data after initial render
	// const teacherID = JSON.parse(localStorage.getItem('loggedIn'))._id;
	useEffect(() => {
		dispatch(getCourses());
		// eslint-disable-next-line
	}, [dispatch]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Courses" main="Course" sub="Marks" />

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
				{courses !== undefined && courses?.length !== 0 && (
					<TableCourses
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={coursesState.length !== 0 ? coursesState : courses}
						header={courseHeader}
						paggingNum={numPages}
						tableType="course-marks"
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
			{course.error === true && course.errorMessage && (
				<Failure message={course.errorMessage} />
			)}
			{/* {course.error === false && setStaffData(defaultInfo)} */}
			{course.isLoading && <Loader />}
		</Layout>
	);
}

export default MarkList;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllStudentsMarkSheet } from '../../../store/marks/markSlice';
// import {
// 	Layout,
// 	SectionIntro,
// 	SectionMainIntro,
// } from '../../../components/layout/';
// import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
// // import SearchCategory from '../../../components/search/SearchCategory';
// import { TableMarks } from '../../../components/tables/';

// const markHeader = {
// 	name: 'Name (Matricule)',
// 	course: 'Name (Code)',
// 	level: 'class',
// 	s1CA: '1<sup>st</sup> Semester CA',
// 	s1Exam: '1<sup>st</sup> Semester Exam',
// 	s1Total: '1<sup>st</sup> Semester Total',
// 	s2CA: '2<sup>nd</sup> Semester CA',
// 	s2Exam: '2<sup>nd</sup> Semester Exam',
// 	s2Total: '2<sup>nd</sup> Semester Total',
// };

// function MarkList() {
// 	//Defining the dispatch function, and the useSelector to get students data
// 	const dispatch = useDispatch();
// 	const marks = useSelector((state) => state.marks.allMarkSheet);

// 	//saving the mark data in a useState
// 	const [markState] = useState(marks);

// 	//Setting the default number of entries a user can see on the interface.
// 	const [numPages, setNumPages] = useState(5);

// 	//useEffect to dispatch student data after initial render
// 	useEffect(() => {
// 		dispatch(getAllStudentsMarkSheet());
// 	}, [dispatch]);

// 	// console.log(marks);
// 	return (
// 		<Layout>
// 			{/* Displaying the page introduction and directory */}
// 			<div className="mg-top"></div>
// 			<SectionIntro title="All Marks" main="Students" sub="Marks" />

// 			<section className="teachers mg-top">
// 				{/* Section About, Download, Add, and Refresh */}
// 				<SectionMainIntro title="Students" styles="mg-bt mg-top" link={'#'} />
// 				{/* Select the number of items to be shown on a page */}
// 				<PaggingNumSelect setItemsPerPage={setNumPages} />
// 				{/* Show student table information only if students data has loaded */}
// 				{marks.length !== 0 && (
// 					<TableMarks
// 						styles="mg-top"
// 						// parse student data, or student searched data in case a search was performed
// 						tableData={markState.length !== 0 ? markState : marks}
// 						header={markHeader}
// 						paggingNum={numPages}
// 					/>
// 				)}
// 				{/* Show student table information only if students data has loaded */}
// 				{marks.length !== 0 && (
// 					<Paggination
// 						styles="mg-top"
// 						paggingNum={numPages}
// 						// parse student data length, or student searched data length in case a search was performed
// 						totalData={markState.length !== 0 ? markState.length : marks.length}
// 					/>
// 				)}
// 			</section>
// 		</Layout>
// 	);
// }

// export default MarkList;
