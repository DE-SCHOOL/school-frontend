import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRightLeft } from 'react-icons/fa6';
import { BsEyeFill, BsFillPenFill } from 'react-icons/bs';

//importing the search param function
import { useSearchParams } from 'react-router-dom';

//Utility functions
import { sortArrayObject } from '../../utilities/sortingInfo';

let DATA_CONST;
function TableStaffCourse({ styles, tableData, header, paggingNum }) {
	//declaring state variables
	const [isSortedBy, setIsSortedBy] = useState('');
	const [staffData, setStaffData] = useState(tableData.map((dt) => dt));

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
					<th className={`${isSortedBy === 'staff' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('staff', 'name')} />
						<span className="text">{header.name}</span>
					</th>
					<th className={`${isSortedBy === 'courses' ? 'sorted' : ''}`}>
						<span className="text">{header.courses}</span>
					</th>
					<th className={`${isSortedBy === 'levels' ? 'sorted' : ''}`}>
						<span className="text">{header.levels}</span>
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
									<span className="text">{row.staff?.name}</span>
								</td>
								<td>
									<span className="text">
										{row.courses?.map((course, index) => (
											<>
												<span key={index}>{course.name}</span>
												<br />
											</>
										))}
									</span>
								</td>
								<td>
									<span className="text">
										{row.courses?.map((course, index) => (
											<>
												<span key={index}>{course.levels.join(', ')}</span>
												<br />
											</>
										))}
									</span>
								</td>
								<td>
									<div className="actions">
										<Link to="/student/view">
											<BsEyeFill />
										</Link>
										<Link to="/student/edit">
											<BsFillPenFill />
										</Link>
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

export default TableStaffCourse;
