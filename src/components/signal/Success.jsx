import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

function Success() {
	return (
		<div className="signal success">
			<BsCheckCircleFill className="icon" />
			<span>Success</span>
		</div>
	);
}

export default Success;
