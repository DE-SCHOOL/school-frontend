import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import DeleteModal from '../../../components/mod/DeleteModal';
import Loader from './../../../components/loaders/Loader';
import {
	createStudentAcademicYearBulk,
	getStudentPerAcademicYear,
	getStudentPerAcademicYearNextStudents,
	promoteStudentsBulk,
} from '../../../store/academic year/academicYearSlice';
import Failure from '../../../components/signal/Failure';
import TableStudentsPromote from '../../../components/tables/TableStudentsPromote';
import { determineNextAcademicYear } from '../../../utilities/determineNextAcademicYear';

const studentHeader = {
	id: 'ID',
	name: 'Name',
	level: 'class',
	dob: 'DoB',
	parent: 'Parent name',
	tel: 'phone Number',
	acts: 'actions',
	specialty: 'specialty',
	address: 'address',
};

function PromoteStudents() {
	//students who were not inserted into specific academic year -- assuming the student slice still selects students directly from the student table and the students on that table are not in a particular academic year
	const studOld = useSelector((state) => state.students.students);

	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.years.students);
	const uiState = useSelector((state) => state.uiState.deleteOpt);
	const isLoading = useSelector((state) => state.years.isLoading);
	const studNextYear = useSelector((state) => state.years.nextYearStudents);
	const year = useSelector((state) => state.years);
	const [studentsToPromote, setStudentsToPromote] = useState([]);
	const [showPromote, setShowPromote] = useState(false);

	//saving the student data in a useState
	const [studentsState, setStudentsState] = useState(students);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(25);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		if (year.currentYear?._id) {
			dispatch(getStudentPerAcademicYear(year.currentYear));
		}
		// dispatch(getCurrentYear());
	}, [dispatch, year.currentYear?._id]);

	const createBulk = async () => {
		const students = studOld.map((stud) => {
			return {
				_id: stud._id,
				level: stud.level,
			};
		});
		const toYearID = year.currentYear._id;

		console.log(students);
		await dispatch(createStudentAcademicYearBulk({ students, toYearID }));
		await dispatch(getStudentPerAcademicYear(year.currentYear));
	};

	const handlePromoteStudentBulk = async () => {
		let finalPromoStudents = [];
		let nextYear = determineNextAcademicYear(
			year.currentYear?.schoolYear,
			year.academicYears
		);

		studentsToPromote.map((student) => {
			if (!studNextYear.includes(student.studentID)) {
				finalPromoStudents.push(student);
			}
		});

		if (finalPromoStudents.length === 0)
			return alert('All Selected Students Are Already Promoted!');
		if (finalPromoStudents.length > 0) setShowPromote(true);

		await dispatch(
			promoteStudentsBulk({
				students: finalPromoStudents,
				_id: year.currentYear?._id,
			})
		);
		await dispatch(
			getStudentPerAcademicYearNextStudents({ _id: nextYear?._id })
		);

		setStudentsToPromote([]);
	};

	useEffect(() => {
		if (year.currentYear?.schoolYear !== undefined) {
			let finalPromoStudents = [];
			studentsToPromote.map((student) => {
				if (!studNextYear.includes(student.studentID)) {
					finalPromoStudents.push(student);
				}
			});

			let nextYear = determineNextAcademicYear(
				year.currentYear?.schoolYear,
				year.academicYears
			);

			// console.log(nextYear);
			const shouldPromote =
				finalPromoStudents.length + studentsToPromote.length > 0 &&
				nextYear?._id !== undefined;

			setShowPromote(shouldPromote);
		}
	}, [studentsToPromote.length, year.currentYear?.schoolYear]);

	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<SectionIntro title="Promotion" main="Student" sub="List" />

			{/* Displaying search filter only if student data has fully loaded */}
			{students.length !== 0 && (
				<SearchCategory
					styles={'mg-top-md mg-bt-md'}
					dropDown="specialty"
					data={students}
					setData={setStudentsState}
				/>
			)}
			<section className="students mg-top-md">
				{/* Section About, Download, Add, and Refresh */}
				<SectionMainIntro
					title={`Students: Academic Year ${year.currentYear?.schoolYear}`}
					styles="mg-bt mg-top"
					promotion={showPromote ? true : ''}
					pendingPromotion={showPromote === false}
					ftn={createBulk}
					promoteBulkFtn={handlePromoteStudentBulk}
				/>

				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />

				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<TableStudentsPromote
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={studentsState.length !== 0 ? studentsState : students}
						header={studentHeader}
						paggingNum={numPages}
						studentsToPromote={studentsToPromote}
						setStudentsToPromote={setStudentsToPromote}
					/>
				)}

				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={
							studentsState.length !== 0
								? studentsState.length
								: students.length
						}
					/>
				)}
			</section>
			{uiState.type === 'student' && (
				<DeleteModal
					type={uiState.type}
					id={uiState.deleteID}
					name={uiState.deleteName}
				/>
			)}
			{year.error === true && year.errorMessage && (
				<Failure message={year.errorMessage} />
			)}
			{isLoading && <Loader />}
		</Layout>
	);
}

export default PromoteStudents;
