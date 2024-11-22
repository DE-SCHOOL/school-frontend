import React, { useState } from 'react';
import { Layout, SectionIntro } from '../../../components/layout';
import { PollFormEdit } from '../../../components/form';
import { FaMinus, FaPlus } from 'react-icons/fa';

function PollEdit() {
	const [questionCount, setQuestionCount] = useState(1);
	return (
		<Layout>
			<SectionIntro title="Create Poll" main="Question" sub="add" />
			<section className="students mg-top">
				<div className="flex-align">
					<h2 className="header-secondary">Poll Information</h2>
					<div className="flex-align gap">
						<button
							className="flex-align button-main button-main-small gap"
							onClick={() => setQuestionCount((prev) => prev + 1)}
						>
							Add Choice <FaPlus />
						</button>
						<button
							className="flex-align button-main button-main-small gap"
							onClick={() =>
								setQuestionCount((prev) => (prev <= 1 ? 1 : prev - 1))
							}
						>
							Remove Choice <FaMinus />
						</button>
					</div>
				</div>
				<PollFormEdit styles="mg-top-md" choiceCount={questionCount} />
			</section>
		</Layout>
	);
}

export default PollEdit;
