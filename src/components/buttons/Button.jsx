import React from 'react';
import { FaArrowUp } from 'react-icons/fa6';

function Button({ styles }) {
	const handleScrollTop = () => {
		window.scrollTo(0, 0);
	};
	return (
		<button
			className={`arrow-up btm-right ${styles ? 'show' : 'hide'}`}
			onClick={handleScrollTop}
		>
			<FaArrowUp />
		</button>
	);
}

export default Button;
