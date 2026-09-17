// Shared <option> lists that were previously copy-pasted, sometimes with
// tiny inconsistencies, across the create/edit form pairs (StudentForm +
// StudentFormEdit, TeacherForm + TeacherFormEdit). `selectedValue` is
// optional: create forms (which manage state via onChange, not `selected`)
// omit it, edit forms (which seed a field's initial value from a fetched
// record via the `selected` attribute) pass the record's current value.

export const GENDER_OPTIONS = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
];

export const STUDENT_LEVEL_OPTIONS = [
	{ value: '200', label: '200' },
	{ value: '300', label: '300' },
	{ value: '400', label: '400' },
	{ value: '601', label: '600 I' },
	{ value: '602', label: '600 II' },
];

export const MARITAL_STATUS_OPTIONS = [
	{ value: 'married', label: 'Married' },
	{ value: 'not married', label: 'Not Married' },
	{ value: 'seperated', label: 'Seperated' },
	{ value: 'devorced', label: 'Devorced' },
];

function renderOptions(options, selectedValue) {
	return options.map(({ value, label }) =>
		selectedValue === undefined ? (
			<option value={value} key={value}>
				{label}
			</option>
		) : (
			<option value={value} key={value} selected={value === selectedValue}>
				{label}
			</option>
		)
	);
}

export function GenderOptions({ selectedValue }) {
	return renderOptions(GENDER_OPTIONS, selectedValue);
}

export function StudentLevelOptions({ selectedValue }) {
	return renderOptions(STUDENT_LEVEL_OPTIONS, selectedValue);
}

export function MaritalStatusOptions({ selectedValue }) {
	return renderOptions(MARITAL_STATUS_OPTIONS, selectedValue);
}
