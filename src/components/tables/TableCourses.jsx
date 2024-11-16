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
import { returnClassString } from '../../utilities/getClassString';
import { returnSequence } from '../../utilities/returnSequence';
import { semester } from '../../utilities/periodInfo';

let DATA_CONST;
function TableCourses({
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
					{/* <th>
						<input type="checkbox" name="check" id="check-all" />
					</th> */}
					<th className={`${isSortedBy === 'code' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('code')} />
						<span className="text">{header.id}</span>
					</th>
					<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('name')} />
						<span className="text">{header.name}</span>
					</th>
					<th className={`${isSortedBy === 'levels' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('levels')} />
						<span className="text">{header.levels}</span>
					</th>
					<th className={`${isSortedBy === 'semester' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('semester')} />
						<span className="text">{header.semester}</span>
					</th>
					<th className={`${isSortedBy === 'status' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('status')} />
						<span className="text">{header.status}</span>
					</th>
					<th className={`${isSortedBy === 'credit_value' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('credit_value')} />
						<span className="text">{header.credits}</span>
					</th>
					<th className={`${isSortedBy === 'specialty' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('specialty')} />
						<span className="text">{header.specialty}</span>
					</th>
					<th>
						<span className="text">Marks</span>
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
								{/* <td>
								<input type="checkbox" name="check-1" />
							</td> */}
								<td>
									<span className="text">{row.code}</span>
								</td>
								<td>
									<span className="text">{row.name}</span>
								</td>
								<td>
									<span className="text">
										{row.levels
											?.map((level) => returnClassString(level))
											.join(', ')}
									</span>
								</td>
								<td>
									<span className="text">{row.semester}</span>
								</td>
								<td>
									<span className="text caps">{row.status}</span>
								</td>
								<td>
									<span className="text caps">{row.credit_value}</span>
								</td>
								<td>
									<span className="text">
										{row.specialty?.map((el, index) => {
											let val = `${el.name}`;
											return (
												<span key={el._id}>
													{val}
													<br />
												</span>
											);
										})}
									</span>
								</td>
								{tableType === 'personal' && (
									<td>
										<div className="actions">
											<Link to={`/marks/${row._id}/ca/add`}>
												<button className="marks-action button-main caps">
													CA
												</button>
											</Link>
										</div>
									</td>
								)}
								{tableType === 'course-marks' && (
									<td>
										<div className="actions action-special">
											<Link to={`/marks/course/${row._id}`}>
												<BsEyeFill className="view" />
											</Link>
										</div>
									</td>
								)}
								{tableType === 'all' && (
									<td>
										<div className="actions btn-list">
											<Link to={`/marks/${row._id}/ca/add`}>
												<button className="marks-action button-main caps">
													{returnSequence(semester())}
												</button>
											</Link>
											{/* {row.levels?.join(' ').indexOf('300') !== -1 && (
												<Link
													to={`/marks/${row._id}/pre-mock/add`}
													className="mg-left"
												>
													<button className="marks-action button-main caps">
														PMock
													</button>
												</Link>
											)}
											{row.levels?.join(' ').indexOf('300') !== -1 && (
												<Link
													to={`/marks/${row._id}/mock/add`}
													className="mg-left"
												>
													<button className="marks-action button-main caps">
														Mock
													</button>
												</Link>
											)} */}
										</div>
									</td>
								)}
								{tableType === 'all' && (
									<td style={{ textAlign: 'center' }}>
										<div className="actions">
											<Link to={`/courses/edit/${row._id}`}>
												<BsFillPenFill className="edit" />
											</Link>
											{user.role === 'admin' && (
												<Link
													to="#"
													onClick={() =>
														dispatch(
															setDeleteEntity({
																deleteID: row._id,
																type: 'course',
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

export default TableCourses;
