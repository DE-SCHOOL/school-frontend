import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getStudentsPerCourseOffering } from '../../../store/students/studentSlice';
import {
	createInitialMarkSheet,
	getMarkSheetsPerCoursePerStudents,
} from '../../../store/marks/markSlice';

import Failure from './../../../components/signal/Failure';
import Loader from '../../../components/loaders/Loader';
import { Layout, SectionIntro } from '../../../components/layout';
import { MarkTableFormPreMock } from './../../../components/form';
import { getCourse } from '../../../store/courses/courseSlice';
import SectionNotFound from '../../../components/layout/SectionNotFound';

function MarksAddPreMock() {
	const params = useParams();
	const students = useSelector((state) => state.students.students);
	const markSheet = useSelector((state) => state.marks.markSheet);
	const marks = useSelector((state) => state.marks);
	const course = useSelector((state) => state.courses.course);
	const academicYear = useSelector((state) => state.years.currentYear);
	// const
	const dispatch = useDispatch();

	useEffect(() => {
		if (academicYear?._id !== undefined) {
			dispatch(
				getStudentsPerCourseOffering({
					courseID: params.courseID,
					academicYear: academicYear?._id,
				})
			);
			dispatch(getCourse({ id: params.courseID }));

			//dispatch to get all marksheets per course for particular students if students already exist
			if (students?.length !== 0) {
				const studentIDs = [];
				students.map((student) => {
					studentIDs.push(student._id);
					return student;
				});
				dispatch(
					getMarkSheetsPerCoursePerStudents({
						id: params.courseID,
						students: studentIDs,
						academicYear: academicYear?.schoolYear,
					})
				);
			}
		}
		//eslint-disable-next-line
	}, [
		dispatch,
		params.courseID,
		students.length,
		markSheet?.length,
		academicYear?._id,
	]);

	//Check if the markSheet available is upto the number of students offering the course
	//Important if a student is registered after a markSheet was created
	let numStudents = students?.length || 1;
	let markSheetLength = markSheet?.length || 0;
	let studOnMarkSheet = []; //list of studentIDs on marksheet;
	let studNotOnMarkSheet = [];

	if (numStudents !== markSheetLength) {
		//get list of all student IDs
		markSheet.map((sheet) => {
			studOnMarkSheet.push(sheet.student._id);
			return sheet;
		});

		students.map((student) => {
			//get an array of studentIDs who are not yet on the marksheet
			let exists = studOnMarkSheet.includes(student._id);
			if (exists) {
				return student;
			} else {
				studNotOnMarkSheet.push(student._id);
			}

			return student;
		});
	}

	//Function to createMarkSheet if it does not exist
	const handleCreateMarkSheet = (studIDs) => {
		//studentIDs is an array of students whose markSheets are to be created

		//list of all students offering the course
		const studentIDs = [];
		students.map((student) => {
			studentIDs.push(student._id);
			return student;
		});

		dispatch(
			createInitialMarkSheet({
				students: studIDs,
				id: params.courseID,
				academicYear: academicYear?.schoolYear,
			})
		);

		//Then get the whole markSheet. That is, include those which already existed before this function call
		dispatch(
			getMarkSheetsPerCoursePerStudents({
				id: params.courseID,
				students: studentIDs,
				academicYear: academicYear?.schoolYear,
			})
		);
	};
	return (
		<Layout>
			<SectionIntro
				title="Add Marks"
				main={course?.length !== 0 ? `${course?.name}(${course?.code})` : ''}
				sub="Marks"
			/>
			{markSheet?.length !== students?.length && (
				<div className="mg-top">
					<button
						className="button-main button-main-medium caps mg-top"
						onClick={() => handleCreateMarkSheet(studNotOnMarkSheet)}
					>
						Generate Mark Sheet
					</button>
				</div>
			)}
			{students?.length === 0 && (
				<div className="mg-top">
					<SectionNotFound text="No student(s) offering this course yet" />
				</div>
			)}
			{markSheet?.length === students?.length && (
				<section className="marks mg-top">
					<MarkTableFormPreMock
						students={students}
						length={markSheet.length}
						semester={course?.semester}
						academicYear={academicYear?.schoolYear}
					/>
				</section>
			)}
			{marks.error === true && marks.errorMessage && (
				<Failure message={marks.errorMessage} />
			)}
			{/* {marks.error === false && setStaffData(defaultInfo)} */}
			{marks.isLoading && <Loader />}
		</Layout>
	);
}

export default MarksAddPreMock;
