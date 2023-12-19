import React, { useState, useEffect } from 'react';
import { FaRightLeft } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { BsEyeFill, BsFillPenFill } from 'react-icons/bs';
import { setCurData } from '../../store/cur page/curPageSlice';

//importing the search param function
import { useSearchParams, Link } from 'react-router-dom';

//Styled in the table sass file of the component styles

//Utility functions
import { sortArrayObject } from '../../utilities/sortingInfo';

let DATA_CONST;
function TablePrograms({ styles, tableData, header, paggingNum }) {
	//declaring state variables
	const [isSortedBy, setIsSortedBy] = useState('');
	const [staffData, setStaffData] = useState(tableData.map((dt) => dt));

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
					<th className={`${isSortedBy === 'name' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('name')} />
						<span className="text">{header.name}</span>
					</th>
					<th className={`${isSortedBy === 'director' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('director', 'name')} />
						<span className="text">{header.director}</span>
					</th>
					<th className={`${isSortedBy === 'deputyDirector' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('deputyDirector', 'name')} />
						<span className="text">{header.subDirector}</span>
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
					// console.log(row);
					if (index >= (temp - 1) * paggingNum && index < temp * paggingNum)
						return (
							<tr key={index} className="course--row">
								<td>
									<span className="text">{row.name}</span>
								</td>
								<td>
									<span className="text">{row.director?.name}</span>
								</td>
								<td>
									<span className="text caps">{row.deputyDirector?.name}</span>
								</td>
								<td>
									<div className="actions">
										<Link to={`/programs/${row._id}/view`}>
											<BsEyeFill />
										</Link>
										<Link to={`/programs/${row._id}/edit`}>
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

export default TablePrograms;
