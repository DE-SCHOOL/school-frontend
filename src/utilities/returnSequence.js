export function returnSequence(sequence) {
	let examTerm = '';
	switch (sequence) {
		case 's1':
			examTerm = 'Sequence 1';
			break;
		case 's2':
			examTerm = 'Sequence 2';
			break;
		case 's3':
			examTerm = 'Sequence 3';
			break;
		case 's4':
			examTerm = 'Sequence 4';
			break;
		case 's5':
			examTerm = 'Sequence 5';
			break;
		case 's6':
			examTerm = 'Sequence 6';
			break;
		default:
			examTerm = 'Promoted';
	}

	return examTerm;
}
