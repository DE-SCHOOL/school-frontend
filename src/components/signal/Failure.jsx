import React from 'react';
import { BsFileXFill } from 'react-icons/bs';

function Failure({ className, message = 'Something Went Wrong' }) {
	let code = (
		<div className={`signal failed ${className}`}>
			<BsFileXFill className="icon" />
			<div className="content">
				<span>Failed:</span>
				<span className="msg">{message}</span>
			</div>
		</div>
	);

	return code;
}

export default Failure;
