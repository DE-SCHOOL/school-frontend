import React, { useState } from 'react';
import { FaRightLeft } from 'react-icons/fa6';
import { BsEyeFill, BsFillPenFill, BsFillTrash3Fill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

//importing the search param function
import { useSearchParams, Link } from 'react-router-dom';

//Styled in the table sass file of the component styles

//Utility functions
import { sortArrayObject } from '../../utilities/sortingInfo';
import { setDeleteEntity } from '../../store/ui-state/ui-stateSlice';

let DATA_CONST;
function TableDepartment({ styles, tableData, header, paggingNum }) {
	//declaring state variables
	const [isSortedBy, setIsSortedBy] = useState('');
	const [staffData, setStaffData] = useState(tableData.map((dt) => dt));
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	//search params function in action
	const [searchParams] = useSearchParams();
	const cur = Number(searchParams.get('curPage'));

	//assign DATA_CONST a value depending on whether or not a search is performed
	if (tableData.length === staffData.length) {
		DATA_CONST = staffData;
	} else {
		DATA_CONST = tableData;
	}

	//function to perform sorting
	const handleSort = (field, fieldOpt = undefined) => {
		sortArrayObject(DATA_CONST, setStaffData, setIsSortedBy, field, fieldOpt);
	};

	return (
		<table className={`standard ${styles ? styles : ''}`}>
			<thead>
				<tr className="head">
					{/* <th>
						<input type="checkbox" name="check" id="check-all" />
					</th> */}
					<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('name')} />
						<span className="text">{header.name}</span>
					</th>

					<th className={`${isSortedBy === 'hod' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('hod', 'name')} />
						<span className="text">{header.hod}</span>
					</th>
					<th className={`${isSortedBy === 'program' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('program', 'name')} />
						<span className="text">{header.program}</span>
					</th>
					<th>
						<span className="text">Actions</span>
					</th>
				</tr>
			</thead>

			<tbody>
				{DATA_CONST.map((row, index) => {
					//maths to decide what entries to show, using paggination
					let temp = cur ? cur : 1;
					if (index >= (temp - 1) * paggingNum && index < temp * paggingNum)
						return (
							<tr key={index}>
								{/* <td>
								<input type="checkbox" name="check-1" />
							</td> */}
								<td>
									<span className="text">{row.name}</span>
								</td>
								<td>
									<span className="text caps">{row.hod?.name}</span>
								</td>
								<td>
									<span className="text caps">{row.program?.name}</span>
								</td>
								<td>
									<div className="actions">
										<Link to={`/departments/view/${row._id}`}>
											<BsEyeFill className="view" />
										</Link>
										<Link to={`/departments/edit/${row._id}`}>
											<BsFillPenFill className="edit" />
										</Link>
										{user.role === 'admin' && (
											<Link
												to="#"
												onClick={() =>
													dispatch(
														setDeleteEntity({
															deleteID: row._id,
															type: 'department',
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
							</tr>
						);
					return null;
				})}
			</tbody>
		</table>
	);
}

export default TableDepartment;
