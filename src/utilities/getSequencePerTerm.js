export function getSequencePerTerm(term) {
	let data = {};
	switch (term) {
		case 't1':
			data = { eval1: 's1', eval2: 's2' };
			break;
		case 't2':
			data = { eval1: 's3', eval2: 's4' };
			break;
		case 't3':
			data = { eval1: 's5', eval2: 's6' };
			break;
		default:
			data = {};
	}
	return data;
}
