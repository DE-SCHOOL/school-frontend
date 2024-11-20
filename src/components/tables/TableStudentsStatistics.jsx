import React, { useState } from 'react';
import { FaRightLeft } from 'react-icons/fa6';

import { sortArrayObject } from '../../utilities/sortingInfo';
import { returnClassString } from '../../utilities/getClassString';

let DATA_CONST;

function TableStudentsStatistics({ tableData }) {
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
					<th className={`${isSortedBy === 'studentName' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('studentName')} />
						<span className="text">Student Name</span>
					</th>
					<th className={`${isSortedBy === 'level' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('level')} />
						<span className="text">Class</span>
					</th>
					<th className={`${isSortedBy === 'specialty' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('specialty')} />
						<span className="text">Specialty</span>
					</th>
					<th className={`${isSortedBy === 'gender' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('gender')} />
						<span className="text">Gender</span>
					</th>

					<th className={`${isSortedBy === 'totalAverage' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('totalAverage')} />
						<span className="text">Average</span>
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
								<span className="text">{student.studentName}</span>
							</td>
							<td>
								<span className="text">{returnClassString(student.level)}</span>
							</td>
              <td>
								<span className="text caps">{student.specialty}</span>
							</td>
							<td>
								<span className="text caps">{student.gender}</span>
							</td>
							<td>
								<span className="text">{student.totalAverage?.toFixed(2)}</span>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default TableStudentsStatistics;
