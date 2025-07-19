export function returnClassString(level) {
	let levelString = '';
	switch (level) {
		case 100:
			levelString = 'Nursery 1';
			break;
		case 200:
			levelString = 'Nursery 2';
			break;
		case 300:
			levelString = 'Class 1';
			break;
		case 400:
			levelString = 'Class 2';
			break;
		case 500:
			levelString = 'Class 3';
			break;
		case 601:
			levelString = 'Class 4';
			break;
		case 602:
			levelString = 'Class 5';
			break;
		case 603:
			levelString = 'Class 6';
			break;
		default:
			levelString = 'Promoted';
	}

	return levelString;
}
