import React, { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa6';

import SchoolHeader from '../social/SchoolHeader';
import { schoolHeaderProp } from '../../utilities/appData';
import { semester } from '../../utilities/periodInfo';

let DATA_CONST;

function TableAllResit({ tableData }) {
	//declaring state variables
	const [isSortedBy] = useState('');
	const [studentData] = useState(tableData);

	//Defining function to complete sorting
	if (tableData.length === studentData.length) {
		DATA_CONST = studentData;
	} else {
		DATA_CONST = tableData;
	}

	const courses = [];
	const courseNames = [];
	DATA_CONST.map((data) => {
		if (courseNames.includes(data.course)) return null;
		courses.push({ course: data.course, course_code: data.course_code });
		courseNames.push(data.course);
		return data.course;
	});

	const handlePrint = () => {
		window.print();
	};
	let count = 0;
	return (
		<div className="table-forms table-forms-modified">
			<span
				className="button-main button-main-medium print-btn"
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '2rem',
					justifyContent: 'center',
					marginBottom: '3rem',
				}}
				onClick={handlePrint}
			>
				Download
				<FaArrowDown />
			</span>
			{courses.map((data, index) => {
				count = 0;
				return (
					<div key={index}>
						<SchoolHeader school={schoolHeaderProp} />
						<br />
						<br />
						<h1 className="title print-title">
							{semester() === 's1' ? 'First' : 'Second'} Semester Resit :{' '}
							{data.course + ` (${data.course_code})`}
						</h1>
						<table className="table-print table-resit mg-top">
							<thead>
								<tr>
									<th>
										<span className="text">SN</span>
									</th>
									<th
										className={`${isSortedBy === 'matricule' ? 'sorted' : ''}`}
									>
										<span className="text">Matricule</span>
									</th>
									<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
										<span className="text">Student Name</span>
									</th>
									<th className={`${isSortedBy === 'pob' ? 'sorted' : ''}`}>
										<span className="text">Level</span>
									</th>
									<th className={`${isSortedBy === 'pob' ? 'sorted' : ''}`}>
										<span className="text">Total</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{DATA_CONST?.map((student, index) => {
									count = count + 1;

									if (data.course === student.course)
										return (
											<tr key={student.matricule + student.course_code + index}>
												<td style={{ textAlign: 'center' }}>
													<span className="text">{count}</span>
												</td>
												<td>
													<span className="text">{student.matricule}</span>
												</td>
												<td>
													<span className="text">{student.name}</span>
												</td>
												<td>
													<span className="text">{student.level}</span>
												</td>
												<td>
													<span className="text caps">{student.total}</span>
												</td>
											</tr>
										);
									count = 0;
									return null;
								})}
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
}

export default TableAllResit;
