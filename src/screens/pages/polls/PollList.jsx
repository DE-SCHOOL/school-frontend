import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Layout,
	SectionIntro,
	SectionMainIntro,
} from '../../../components/layout/';
import { PaggingNumSelect, Paggination } from './../../../components/pagging/';
import SearchCategory from '../../../components/search/SearchCategory';
import { TableQuestions } from '../../../components/tables/';

import DeleteModal from '../../../components/mod/DeleteModal';
import Loader from './../../../components/loaders/Loader';
import { getAllQuestions } from '../../../store/question/questionSlice';

const courseHeader = {
	id: 'Category',
	name: 'Name',
};

function PollList() {
	//Defining the dispatch function, and the useSelector to get students data
	const dispatch = useDispatch();
	const questions = useSelector((state) => state.questions.questions);
	const uiState = useSelector((state) => state.uiState.deleteOpt);
	const isLoading = useSelector((state) => state.courses.isLoading);

	console.log(questions, 111);

	//saving the student data in a useState
	const [questionState, setQuestionState] = useState([]);

	//Setting the default number of entries a user can see on the interface.
	const [numPages, setNumPages] = useState(10);

	//useEffect to dispatch student data after initial render
	useEffect(() => {
		dispatch(getAllQuestions());
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
				data={questions}
				setData={setQuestionState}
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
				{questions !== undefined && (
					<TableQuestions
						styles="mg-top"
						// parse student data, or student searched data in case a search was performed
						tableData={questionState.length !== 0 ? questionState : questions}
						header={courseHeader}
						paggingNum={numPages}
					/>
				)}

				{/* Show student table information only if students data has loaded */}
				{questions !== undefined && (
					<Paggination
						styles="mg-top"
						paggingNum={numPages}
						// parse student data length, or student searched data length in case a search was performed
						totalData={
							questionState.length !== 0
								? questionState.length
								: questions.length
						}
					/>
				)}
			</section>
			{uiState.type === 'question' && (
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

export default PollList;
