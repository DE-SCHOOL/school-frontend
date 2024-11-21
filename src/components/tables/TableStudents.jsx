//importing react components
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaRightLeft } from 'react-icons/fa6';
import { BsEyeFill, BsFillPenFill, BsFillTrash3Fill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { setDeleteEntity } from '../../store/ui-state/ui-stateSlice';

//importing utility functions
import { getDateFromDateObject } from '../../utilities/getDate';
import { sortArrayObject } from '../../utilities/sortingInfo';
import { returnClassString } from '../../utilities/getClassString';

//Styled in the table sass file of the component styles
let DATA_CONST;

function TableStudent({
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
					<th className={`${isSortedBy === 'dob' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('dob')} />
						<span className="text">{header.dob}</span>
					</th>
					{/* <th className={`${isSortedBy === 'parent_name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('parent_name')} />
						<span className="text">{header.parent}</span>
					</th> */}
					{/* <th className={`${isSortedBy === 'tel' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('tel')} />
						<span className="text">{header.tel}</span>
					</th> */}
					<th className={`${isSortedBy === 'specialty' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('specialty', 'name')} />
						<span className="text">{header.specialty}</span>
					</th>
					<th className={`${isSortedBy === 'address' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('address')} />
						<span className="text">{header.address}</span>
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
									<span className="text">{row.matricule}</span>
								</td>
								<td>
									{/* <div className="profile">
										<img
											src={row?.profile ? row.profile : profile_default}
											alt="Student Pic"
										/>
										<span className="text name">{row.name}</span>
									</div> */}
									<span className="text name">{row.name}</span>
								</td>
								<td>
									<span className="text"> {returnClassString(row.level)}</span>
								</td>
								<td>
									<span className="text">{getDateFromDateObject(row.dob)}</span>
								</td>
								{/* <td>
									<span className="text">{row.parent_name}</span>
								</td> */}
								{/* <td>
									<span className="text">{row.tel}</span>
								</td> */}
								<td>
									<span className="text">{row.specialty?.name}</span>
								</td>
								<td>
									<span className="text">{row.address}</span>
								</td>
								{tableType !== 'results' && (
									<td>
										<div className="actions">
											<Link to={`/students/view/${row._id}`}>
												<BsEyeFill className="view" />
											</Link>
											<Link to={`/students/edit/${row._id}`}>
												<BsFillPenFill className="edit" />
											</Link>
											{user.role === 'admin' && (
												<Link
													to="#"
													onClick={() =>
														dispatch(
															setDeleteEntity({
																deleteID: row._id,
																type: 'student',
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
											<Link
												to={`/exam center/sequence/student-results/${row._id}`}
											>
												<button className="marks-action button-main caps">
													Sequence
												</button>
											</Link>
											<Link
												to={`/exam center/term/student-results/${row._id}`}
												className="mg-left-lg"
											>
												<button className="marks-action button-main caps">
													Term
												</button>
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

export default TableStudent;
