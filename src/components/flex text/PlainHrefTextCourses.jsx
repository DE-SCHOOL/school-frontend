import React from 'react';
import { Link } from 'react-router-dom';

function PlainHrefTextCourses({ data, staff }) {
	return (
		<div className="plain-text">
			{data.map((dt, index) => {
				return (
					<Link
						to={`/human resource/review-staff/${dt?._id}?course=${dt.name}&staff=${staff}`}
						className="text-link"
						key={index}
					>
						<span className="text">{dt?.name}</span>
					</Link>
				);
			})}
		</div>
	);
}

export default PlainHrefTextCourses;
