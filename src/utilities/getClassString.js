export function returnClassString(level) {
	let levelString = '';
	switch (level) {
		case 100:
			levelString = 'Form 1';
			break;
		case 200:
			levelString = 'Form 2';
			break;
		case 300:
			levelString = 'Form 3';
			break;
		case 400:
			levelString = 'Form 4';
			break;
		case 500:
			levelString = 'Form 5';
			break;
		case 601:
			levelString = 'Lower Sixth';
			break;
		case 602:
			levelString = 'Upper Sixth';
			break;
		default:
			levelString = 'Promoted';
	}

	return levelString;
}
