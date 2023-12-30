//importing react components
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaRightLeft } from 'react-icons/fa6';

//importing utility functions
import { sortArrayObject } from '../../utilities/sortingInfo';

//Styled in the table sass file of the component styles
let DATA_CONST;

function TableMarks({ styles, tableData, header, paggingNum }) {
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
				<tr className="head">
					<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('student', 'name')} />
						<span className="text">{header.name}</span>
					</th>
					<th className={`${isSortedBy === 'course' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('course', 'name')} />
						<span className="text">{header.course}</span>
					</th>
					<th className={`${isSortedBy === 'level' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('student', 'level')} />
						<span className="text">{header.level}</span>
					</th>
					<th className={`${isSortedBy === 's1CA' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('s1CA')} />
						<span className="text">
							1<sup>st</sup> CA
						</span>
					</th>
					<th className={`${isSortedBy === 's1Exam' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('s1Exam')} />
						<span className="text">
							1<sup>st</sup> Exam
						</span>
					</th>
					<th className={`${isSortedBy === 's1Total' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('s1Total')} />
						<span className="text">
							1<sup>st</sup> Total
						</span>
					</th>
					<th className={`${isSortedBy === 's2CA' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('s2CA')} />
						<span className="text">
							2<sup>nd</sup> CA
						</span>
					</th>
					<th className={`${isSortedBy === 's2Exam' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('s2Exam')} />
						<span className="text">
							2<sup>nd</sup> Exam
						</span>
					</th>
					<th className={`${isSortedBy === 's2Total' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('s2Total')} />
						<span className="text">
							2<sup>nd</sup> Total
						</span>
					</th>
					<th className={`${isSortedBy === 'preMock' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('preMock')} />
						<span className="text">Pre Mock</span>
					</th>
					<th className={`${isSortedBy === 'mock' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('mock')} />
						<span className="text">Mock</span>
					</th>
				</tr>
			</thead>
			{/* Table Body */}
			<tbody>
				{DATA_CONST.map((row, index) => {
					//implementing pagination
					let temp = curPage ? curPage : 1;
					if (
						index + 1 > (Number(temp) - 1) * Number(paggingNum) &&
						index + 1 <= Number(paggingNum) * (temp * 1)
					)
						return (
							<tr key={index} className="course--row">
								<td style={{ textAlign: 'left' }}>
									<span className="text" style={{ textAlign: 'left' }}>
										{`${row.student.name} (${row.student.matricule})`}
									</span>
								</td>
								<td>
									<span className="text">{row.course.code}</span>
								</td>
								<td>
									<span className="text">Level {row.student.level}</span>
								</td>
								<td>
									<span className="text">{row.s1CA}</span>
								</td>
								<td>
									<span className="text">{row.s1Exam}</span>
								</td>
								<td>
									<span className="text">{row.s1Total}</span>
								</td>
								<td>
									<span className="text">{row.s2CA}</span>
								</td>
								<td>
									<span className="text">{row.s2Exam}</span>
								</td>
								<td>
									<span className="text">{row.s2Total}</span>
								</td>
								<td>
									<span className="text">{row.preMock}</span>
								</td>
								<td>
									<span className="text">{row.mock}</span>
								</td>
							</tr>
						);
					return null;
				})}
			</tbody>
		</table>
	);
}

export default TableMarks;
