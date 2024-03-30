import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getAllQuestions } from '../../store/question/questionSlice';
import { getPrograms } from '../../store/program/programSlice';
import { createReviews } from '../../store/reviews/reviewSlice';
import Failure from '../signal/Failure';
import Success from '../signal/Success';
import Loader from '../loaders/Loader';

function StaffReviewForm() {
	const [params] = useSearchParams();
	const course = params.get('course');
	const staff = params.get('staff');
	const questions = useSelector((state) => state.questions);
	const programs = useSelector((state) => state.programs.programs.data);
	const review = useSelector((state) => state.reviews);
	const dispatch = useDispatch();
	const param = useParams();

	// console.log(programs);

	useEffect(() => {
		dispatch(getAllQuestions());
		dispatch(getPrograms());
	}, [dispatch]);

	const handleSubmitReview = (e) => {
		e.preventDefault();
		let response = Array.from(e.target);
		const course = param.courseID;

		response = response?.map((res, index) => {
			if (res.value !== '') return res.value;

			return null;
		});

		const school = response[0];

		const responses = response.filter((res, index) => {
			if (res === null || index === 0) return false;

			return true;
		});

		const ques = questions.questions?.map((ques) => ques?._id);

		const requestData = {
			question: ques,
			response: responses,
			school,
			course,
		};

		console.log(requestData);
		dispatch(createReviews(requestData));
	};
	return (
		<div className="staff-review">
			<a href={'/human resource/review-staff'}>
				{/**To force reload of application */}
				<h3 className="center">View Lecturers</h3>
			</a>
			<h3 className="center">
				<span>Lecturer: </span>
				<span> {staff}</span>
			</h3>

			<div className="course-review">
				<h4 style={{ textAlign: 'center' }}>{course}</h4>

				<form
					action=""
					name="form"
					id="student"
					onSubmit={(e) => handleSubmitReview(e)}
				>
					<div className="form">
						<div className="form-item">
							<span className="question">
								What school are you in?<em>*</em>
							</span>
							<select name="School">
								{programs?.map((program) => {
									return (
										<option key={program._id} value={program._id}>
											{program.name}
										</option>
									);
								})}
							</select>
						</div>
						{questions.questions?.map((question, index) => {
							return (
								<div className="form-item" key={index}>
									<span className="question">
										{question.name}
										<em>*</em>
									</span>
									<select name="level" id="" onChange={() => {}}>
										{question.answers.map((answer, index) => {
											return (
												<option key={index} value={answer}>
													{answer}
												</option>
											);
										})}
									</select>
								</div>
							);
						})}
					</div>
					<button className="button-main button-main-medium mg-top-md">
						submit
					</button>
				</form>
			</div>
			{review.error === true && review.errorMessage && (
				<Failure message={review.errorMessage} />
			)}
			{review.success === true && <Success />}
			{/* {review.error === false && setStaffData(defaultInfo)} */}
			{review.isLoading && <Loader />}
			{questions.error === true && questions.errorMessage && (
				<Failure message={questions.errorMessage} />
			)}
			{questions.isLoading && <Loader />}
		</div>
	);
}

export default StaffReviewForm;
