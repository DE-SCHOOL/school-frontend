import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Failure from './../signal/Failure';
import Loader from './../loaders/Loader';
import { getAllCategory } from '../../store/question category/questionCategorySlice';
import { createQuestion } from '../../store/question/questionSlice';

//import action creator slices
import Success from '../signal/Success';

function PollForm({ styles, choiceCount }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.questionCategory.categories);
	const questions = useSelector((state) => state.questions);
	const [res, setRes] = useState([]);

	//initialize the main hooks
	const question = useRef();
	const category = useRef();

	//Get all poll categories after initial render
	useEffect(() => {
		// dispatch(getSpecialties());
		dispatch(getAllCategory());
	}, [dispatch]);

	//Execute this function when you click submit, to add a course
	const createCourse = (e) => {
		e.preventDefault();

		//Courses object
		const values = {
			name: question.current.value,
			category: category.current.value,
			answers: res,
		};

		//action creator to dispatch information to the database
		dispatch(createQuestion(values));

		// Setting values back to initial
		question.current.value = null;
		setRes((prev) => {
			return prev.map((i) => '');
		});
		// category.current.value = null;
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={createCourse}
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Category <em>*</em>
					</span>
					<select
						name="category"
						id=""
						ref={category}
						required
						title="use the CTRL key to select multiple options"
					>
						{categories?.length > 0 &&
							categories?.map((cat, index) => {
								return (
									<option key={cat?._id} value={cat?._id}>
										{cat?.name}
									</option>
								);
							})}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Question <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter course name"
						required
						name="question"
						ref={question}
						autoComplete="question"
					/>
				</div>
				{Array.from({ length: choiceCount }).map((_, index) => (
					<div className="form-item" key={index}>
						<span className="desc">
							Choice {index + 1} <em>*</em>
						</span>
						<input
							type="text"
							placeholder="Enter course code"
							required
							autoComplete="code"
							value={res[index]}
							onChange={(e) =>
								setRes((prev) => {
									const oldValues = [...prev];
									oldValues[index] = e.target.value;

									return oldValues;
								})
							}
						/>
					</div>
				))}
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{questions.error && questions.errorMessage && (
				<Failure message={questions.errorMessage} />
			)}
			{questions.isLoading && <Loader />}
			{questions.success === true && <Success />}
		</form>
	);
}

export default PollForm;
