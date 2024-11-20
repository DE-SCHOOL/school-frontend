import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchStudents from '../../../components/search/SearchStudents';
import { getStudentsExam } from '../../../store/exams/examSlice';

import Loader from '../../../components/loaders/Loader';
import Button from '../../../components/buttons/Button';
import { TableStudentsStatistics } from '../../../components/tables';
import { getAllStudentMarkSheetAllCourses } from '../../../store/marks/markSlice';
import { getCurrentYear } from '../../../store/academic year/academicYearSlice';
import {
	calculateStudentAverages,
	rankStudents,
} from '../../../utilities/resultFunctions';
import { academicTerm } from '../../../utilities/periodInfo';
import SectionNotFound from '../../../components/layout/SectionNotFound';

function StudentStatistics() {
	//Defining the dispatch function, and the useSelector to get students data
	const marksInfo = useSelector((state) => state.marks.studentsCoursesMarks);
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.students);
	const academicYear = useSelector((state) => state.years.currentYear);
	const load = useSelector((state) => state.exams);
	const [scroll, setScroll] = useState(0);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getCurrentYear());
		if (academicYear?._id !== undefined)
			dispatch(getStudentsExam(academicYear?._id));
	}, [dispatch, academicYear?._id]);

	window.onscroll = () => {
		if (window.scrollY > 200) {
			setScroll(1);
		} else {
			setScroll(0);
		}
	};

	let studentAverages = [];
	let studentRanking = [];
	useEffect(() => {
		if (academicYear?._id !== undefined) {
			let studIDs = [];
			students.map((student) => {
				studIDs.push(student._id);
				return student;
			});

			console.log(studIDs);
			//searching  data
			const searchData = {
				academicYear: academicYear?.schoolYear,
				students: studIDs,
			};
			dispatch(getAllStudentMarkSheetAllCourses(searchData));
		}
	}, [academicYear?._id, academicYear?.schoolYear, dispatch, students]);

	if (marksInfo.length > 0) {
		const data = JSON.parse(JSON.stringify([...marksInfo]));
		studentAverages = calculateStudentAverages(data);
		studentRanking = rankStudents(
			studentAverages,
			`${academicTerm()}TotalAverage`
		);
	}

	return (
		<div className="stud-print">
			<SearchStudents
				styles={'mg-top-md mg-bt-md'}
				type="print"
				form="STUDENT LIST"
			/>

			<section className="students">
				{/* Show student table information only if students data has loaded */}
				{studentRanking.length !== 0 && (
					<TableStudentsStatistics styles="mg-top" tableData={studentRanking} />
				)}
			</section>
			{studentRanking?.length === 0 && load.isLoading === false && (
				<SectionNotFound text={'No Statistics for the search above!'} />
			)}
			<Button styles={scroll} />
			{load.isLoading && <Loader />}
		</div>
	);
}

export default StudentStatistics;
