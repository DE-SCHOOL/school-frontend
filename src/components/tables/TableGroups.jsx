//importing react components
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaRightLeft } from 'react-icons/fa6';
import { BsEyeFill, BsFillPenFill, BsFillTrash3Fill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { setDeleteEntity } from '../../store/ui-state/ui-stateSlice';

//importing utility functions
import { sortArrayObject } from '../../utilities/sortingInfo';
import { cutText } from '../../utilities/cutText';

//Styled in the table sass file of the component styles
let DATA_CONST;

function TableGroups({
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
					<th className={`${isSortedBy === 'dob' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('description')} />
						<span className="text">{header.description}</span>
					</th>
					<th className={`${isSortedBy === 'specialty' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('createdBy')} />
						<span className="text">{header.createdBy}</span>
					</th>
					<th className={`${isSortedBy === 'specialty' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('specialtyName')} />
						<span className="text">{header.specialty}</span>
					</th>
					<th className={`${isSortedBy === 'tel' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('departmentName')} />
						<span className="text">{header.department}</span>
					</th>
					<th className={`${isSortedBy === 'address' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('programName')} />
						<span className="text">{header.program}</span>
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
								{/* <td>
								<input type="checkbox" name="check-1" />
							</td> */}
								<td>
									<span className="text">{row?.name}</span>
								</td>
								<td>
									<span className="text name">Level {row?.level}</span>
								</td>
								<td>
									<span
										className="text"
										style={{ textTransform: 'capitalize' }}
									>
										{cutText(row?.description, 50) || '-'}
									</span>
								</td>
								<td>
									<span className="text">{row?.createdBy || '-'}</span>
								</td>
								<td>
									<span className="text">
										{row?.specialtyNames?.map((spec) => (
											<span>
												{spec} <br />
											</span>
										)) || '-'}
									</span>
								</td>
								<td>
									<span className="text">{row?.departmentName || '-'}</span>
								</td>
								{/* <td>
									<span className="text">{row.parent_name}</span>
								</td> */}
								<td>
									<span className="text">{row?.programName || '-'}</span>
								</td>
								{tableType !== 'results' && (
									<td>
										<div className="actions">
											<Link
												to={`/communication/group-messaging?chat=${row.id}`}
											>
												<BsEyeFill className="view" />
											</Link>
											<Link to={`/communication/group/edit/${row.id}`}>
												<BsFillPenFill className="edit" />
											</Link>
											{user.role === 'admin' && (
												<Link
													to="#"
													onClick={() =>
														dispatch(
															setDeleteEntity({
																deleteID: row.id,
																type: 'group',
																deleteName: row.name,
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
								{tableType === 'results' && (
									<td>
										<div className="actions results">
											<Link to={`/exam center/student-marks/${row._id}`}>
												<BsEyeFill className="view" />
											</Link>
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

export default TableGroups;
