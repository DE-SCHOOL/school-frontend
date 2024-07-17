//importing react components
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaRightLeft } from 'react-icons/fa6';

//importing utility functions
import { sortArrayObject } from '../../utilities/sortingInfo';

//Styled in the table sass file of the component styles
let DATA_CONST;

function TableStudentResit({
	styles,
	tableData,
	header,
	paggingNum,
	tableType = '',
}) {
	//declaring state variables
	const [isSortedBy, setIsSortedBy] = useState('');
	const [studentData, setStudentData] = useState(tableData);

	//Declaring set params
	const [searchParams] = useSearchParams();
	const curPage = searchParams.get('curPage');

	//Defining function to complete sorting
	if (tableData.length === studentData.length) {
		DATA_CONST = studentData;
	} else {
		DATA_CONST = tableData;
	}
	const handleSort = (field, fieldOpt = undefined) => {
		sortArrayObject(DATA_CONST, setStudentData, setIsSortedBy, field, fieldOpt);
	};
	if (tableData.length === studentData.length) {
		DATA_CONST = studentData;
	} else {
		DATA_CONST = tableData;
	}
	return (
		<table className={`standard ${styles ? styles : ''}`}>
			{/* Table heading */}
			<thead>
				<tr className="head stud">
					{/* <th className={`${isSortedBy === 'matricule' ? 'sorted' : ''}`}>
						<input type="checkbox" name="check" id="check-all" />
					</th> */}
					<th className={`${isSortedBy === 'matricule' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('matricule')} />
						<span className="text">{header.id}</span>
					</th>
					<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('name')} />
						<span className="text">{header.name}</span>
					</th>
					<th className={`${isSortedBy === 'level' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('level')} />
						<span className="text">{header.level}</span>
					</th>
					<th className={`${isSortedBy === 'level' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('course')} />
						<span className="text">{header.course}</span>
					</th>
					<th className={`${isSortedBy === 'level' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('course_code')} />
						<span className="text">{header.course_code}</span>
					</th>
					<th className={`${isSortedBy === 'level' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('total')} />
						<span className="text">{header.total}</span>
					</th>
				</tr>
			</thead>
			{/* Table Body */}
			<tbody>
				{DATA_CONST?.map((row, index) => {
					//implementing pagination
					let temp = curPage ? curPage : 1;
					if (
						index + 1 > (Number(temp) - 1) * Number(paggingNum) &&
						index + 1 <= Number(paggingNum) * (temp * 1)
					)
						return (
							<tr key={index} className="course--row">
								{/* <td>
								<input type="checkbox" name="check-1" />
							</td> */}
								<td>
									<span className="text">{row.matricule}</span>
								</td>
								<td>
									<span className="text name">{row.name}</span>
								</td>
								<td>
									<span className="text">Level {row.level}</span>
								</td>
								<td>
									<span className="text">{row.course}</span>
								</td>
								<td>
									<span className="text">{row.course_code}</span>
								</td>
								<td>
									<span className="text">{row.total}</span>
								</td>
							</tr>
						);
					return null;
				})}
			</tbody>
		</table>
	);
}

export default TableStudentResit;
