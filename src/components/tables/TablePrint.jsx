import React, { useState } from 'react';
import { FaRightLeft } from 'react-icons/fa6';

import { sortArrayObject } from '../../utilities/sortingInfo';
import { getDateFromDateObject } from '../../utilities/getDate';

let DATA_CONST;

function TablePrint({ tableData }) {
	//declaring state variables
	const [isSortedBy, setIsSortedBy] = useState('');
	const [studentData, setStudentData] = useState(tableData);

	//Defining function to complete sorting
	if (tableData.length === studentData.length) {
		DATA_CONST = studentData;
	} else {
		DATA_CONST = tableData;
	}

	const handleSort = (field, fieldOpt = undefined) => {
		sortArrayObject(DATA_CONST, setStudentData, setIsSortedBy, field, fieldOpt);
	};

	return (
		<table className="table-print mg-top">
			<thead>
				<tr>
					<th>
						<span className="text">SN</span>
					</th>
					<th className={`${isSortedBy === 'matricule' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('matricule')} />
						<span className="text">Matricule</span>
					</th>
					<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('name')} />
						<span className="text">Student Name</span>
					</th>
					<th className={`${isSortedBy === 'pob' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('pob')} />
						<span className="text">POB</span>
					</th>
					<th className={`${isSortedBy === 'gender' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('gender')} />
						<span className="text">Gender</span>
					</th>
					<th className={`${isSortedBy === 'dob' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('dob')} />
						<span className="text">DOB</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{DATA_CONST?.map((student, index) => {
					return (
						<tr key={student.matricule}>
							<td style={{ textAlign: 'center' }}>
								<span className="text">{index + 1}</span>
							</td>
							<td>
								<span className="text">{student.matricule}</span>
							</td>
							<td>
								<span className="text">{student.name}</span>
							</td>
							<td>
								<span className="text">{student.pob}</span>
							</td>
							<td>
								<span className="text caps">{student.gender}</span>
							</td>
							<td>
								<span className="text">
									{getDateFromDateObject(student.dob)}
								</span>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default TablePrint;
