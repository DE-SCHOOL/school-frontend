import React, { useState, useEffect } from 'react';
import { FaRightLeft } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { BsEyeFill, BsFillPenFill, BsFillTrash3Fill } from 'react-icons/bs';
import { setCurData } from '../../store/cur page/curPageSlice';
import { useSelector } from 'react-redux';

//importing the search param function
import { useSearchParams, Link } from 'react-router-dom';

//Styled in the table sass file of the component styles

//Utility functions
import { sortArrayObject } from '../../utilities/sortingInfo';
import { setDeleteEntity } from '../../store/ui-state/ui-stateSlice';

let DATA_CONST;
function TableQuestions({
	styles,
	tableData,
	header,
	paggingNum,
	tableType = 'all',
}) {
	//declaring state variables
	const [isSortedBy, setIsSortedBy] = useState('');
	const [staffData, setStaffData] = useState(tableData?.map((dt) => dt));
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

	useEffect(() => {
		dispatch(setCurData(DATA_CONST));
		// eslint-disable-next-line
	}, [dispatch, DATA_CONST]);

	return (
		<table className={`standard ${styles ? styles : ''}`}>
			<thead>
				<tr className="head course--row">
					<th className={`${isSortedBy === 'code' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('code')} />
						<span className="text">{header.id}</span>
					</th>
					<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('name')} />
						<span className="text">{header.name}</span>
					</th>
					{tableType === 'all' && (
						<th>
							<span className="text">Action</span>
						</th>
					)}
				</tr>
			</thead>

			<tbody>
				{DATA_CONST.map((row, index) => {
					// console.log(row.levels);
					//maths to decide what entries to show, using paggination
					let temp = cur ? cur : 1;
					// console.log(row);
					if (index >= (temp - 1) * paggingNum && index < temp * paggingNum)
						return (
							<tr key={index} className="course--row">
								<td style={{ textAlign: 'left' }}>
									<span className="text">{row.category?.name}</span>
								</td>
								<td>
									<span className="text capitalize">{row.name}</span>
								</td>
								{tableType === 'all' && (
									<td style={{ textAlign: 'center' }}>
										<div className="actions">
											<Link to={`/poll/edit/${row._id}`}>
												<BsFillPenFill className="edit" />
											</Link>
											{user.role === 'admin' && (
												<Link
													to="#"
													onClick={() =>
														dispatch(
															setDeleteEntity({
																deleteID: row._id,
																type: 'question',
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
							</tr>
						);
					return null;
				})}
			</tbody>
		</table>
	);
}

export default TableQuestions;
