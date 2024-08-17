import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentResit } from '../../../store/exams/examSlice';

import Loader from '../../../components/loaders/Loader';
import Button from '../../../components/buttons/Button';
import TableAllResit from '../../../components/tables/TableAllResit';
import { semester } from '../../../utilities/periodInfo';
import { getCurrentYear } from '../../../store/academic year/academicYearSlice';

function PrintList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const students = useSelector((state) => state.exams.studentResit);
	const academicYear = useSelector((state) => state.years.currentYear);
	const load = useSelector((state) => state.exams);
	const [scroll, setScroll] = useState(0);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getCurrentYear());
		if (academicYear?._id !== undefined)
			dispatch(
				getStudentResit({
					semester: semester(),
					academicYear: academicYear?.schoolYear,
				})
			);
	}, [dispatch, academicYear?._id]);

	window.onscroll = () => {
		if (window.scrollY > 200) {
			setScroll(1);
		} else {
			setScroll(0);
		}
	};

	return (
		<div className="stud-print">
			<section className="students">
				{/* Show student table information only if students data has loaded */}
				{students.length !== 0 && (
					<TableAllResit styles="mg-top" tableData={students} />
				)}
			</section>
			<Button styles={scroll} />
			{load.isLoading && <Loader />}
		</div>
	);
}

export default PrintList;
