import React from 'react';
import { Link } from 'react-router-dom';

function PlainHrefText({ data }) {
	return (
		<div className="plain-text">
			{data.map((dt, index) => {
				if (dt.staff)
					return (
						<Link
							to={`/human resource/staff-courses/${dt.staff._id}`}
							className="text-link"
							key={index}
						>
							<span className="text">{dt.staff.name}</span>
						</Link>
					);

				return null;
			})}
		</div>
	);
}

export default PlainHrefText;
