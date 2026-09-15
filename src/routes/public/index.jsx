import { Routes, Route } from 'react-router-dom';
import Landing from '../../screens/public/Landing';
import BookDemo from '../../screens/public/BookDemo';

function PublicRoute() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/book-demo" element={<BookDemo />} />
		</Routes>
	);
}

export default PublicRoute;
