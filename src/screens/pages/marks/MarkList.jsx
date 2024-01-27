import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentsMarkSheet } from '../../../store/marks/markSlice';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
// import SearchCategory from '../../../components/search/SearchCategory';
import { TableMarks } from '../../../components/tables/';

const markHeader = {
	name: 'Name (Matricule)',
	course: 'Name (Code)',
	level: 'class',
	s1CA: '1<sup>st</sup> Semester CA',
	s1Exam: '1<sup>st</sup> Semester Exam',
	s1Total: '1<sup>st</sup> Semester Total',
	s2CA: '2<sup>nd</sup> Semester CA',
	s2Exam: '2<sup>nd</sup> Semester Exam',
	s2Total: '2<sup>nd</sup> Semester Total',
};

function MarkList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const marks = useSelector((state) => state.marks.allMarkSheet);

	//saving the mark data in a useState
	const [markState] = useState(marks);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(5);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getAllStudentsMarkSheet());
	}, [dispatch]);

	// console.log(marks);
	return (
		<Layout>
			{/* Displaying the page introduction and directory */}
			<div className="mg-top"></div>
			<SectionIntro title="All Marks" main="Students" sub="Marks" />

			<section className="teachers mg-top">
				{/* Section About, Download, Add, and Refresh */}
				<SectionMainIntro title="Students" styles="mg-bt mg-top" link={'#'} />
				{/* Select the number of items to be shown on a page */}
				<PaggingNumSelect setItemsPerPage={setNumPages} />
				{/* Show student table information only if students data has loaded */}
				{marks.length !== 0 && (
					<TableMarks
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={markState.length !== 0 ? markState : marks}
						header={markHeader}
						paggingNum={numPages}
					/>
				)}
				{/* Show student table information only if students data has loaded */}
				{marks.length !== 0 && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={markState.length !== 0 ? markState.length : marks.length}
					/>
				)}
			</section>
		</Layout>
	);
}

export default MarkList;
