//importing react components
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaRightLeft } from 'react-icons/fa6';
import { BsFillPenFill, BsFillTrash3Fill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { setDeleteEntity } from '../../store/ui-state/ui-stateSlice';

//importing utility functions
import { sortArrayObject } from '../../utilities/sortingInfo';

//Styled in the table sass file of the component styles
let DATA_CONST;

function TableTimetable({
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
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

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
					<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('name')} />
						<span className="text">{header.name}</span>
					</th>
					<th className={`${isSortedBy === 'level' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('level')} />
						<span className="text">{header.level}</span>
					</th>
					<th className={`${isSortedBy === 'specialty' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('specialty', 'name')} />
						<span className="text">{header.specialty}</span>
					</th>
					<th className={`${isSortedBy === 'dob' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('semester')} />
						<span className="text">{header.semester}</span>
					</th>
					<th className={`${isSortedBy === 'tel' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('downloadUrl')} />
						<span className="text">{header.downloadUrl}</span>
					</th>
					<th className={`${isSortedBy === 'address' ? 'sorted' : ''}`}>
						<FaRightLeft
							onClick={() => handleSort('academicYear', 'schoolYear')}
						/>
						<span className="text">{header.academicYear}</span>
					</th>
					{tableType !== 'results' && (
						<th>
							<span className="text">{header.acts}</span>
						</th>
					)}
					{tableType === 'results' && (
						<th>
							<span className="text">Results</span>
						</th>
					)}
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
								<td>
									<span className="text name">{row.name}</span>
								</td>
								<td>
									<span className="text">Level {row.level}</span>
								</td>
								<td>
									<span className="text">{row.specialty?.name}</span>
								</td>
								<td>
									<span className="text">{row.semester}</span>
								</td>
								<td>
									<Link to={row.downloadUrl} target="_blank">
										<span style={{ textTransform: 'capitalize' }}>
											View Timetable
										</span>
									</Link>
								</td>
								<td>
									<span className="text">{row.academicYear?.schoolYear}</span>
								</td>
								{tableType !== 'results' && (
									<td>
										<div className="actions">
											<Link to={`#`}>
												<BsFillPenFill className="edit" />
											</Link>
											{user.role === 'admin' && (
												<Link
													to="#"
													onClick={() =>
														dispatch(
															setDeleteEntity({
																deleteID: row._id,
																type: 'timetable',
																deleteName: row.name,
																fileUrl: row.downloadUrl,
															})
														)
													}
												>
													<BsFillTrash3Fill className="delete" />
												</Link>
											)}
										</div>
									</td>
								)}
							</tr>
						);
					return null;
				})}
			</tbody>
		</table>
	);
}

export default TableTimetable;
