//importing react components
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaRightLeft } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';

//importing utility functions
import { getDateFromDateObject } from '../../utilities/getDate';
import { sortArrayObject } from '../../utilities/sortingInfo';
import {
	getStudentPerAcademicYearNextStudents,
	promoteStudents,
} from '../../store/academic year/academicYearSlice';
import { detectNewClassOnPromotion } from '../../utilities/detectNewClassOnPromotion';
import { determineNextAcademicYear } from '../../utilities/determineNextAcademicYear';

//Styled in the table sass file of the component styles
let DATA_CONST;

function TableStudentsPromote({
	styles,
	tableData,
	header,
	paggingNum,
	tableType = '',
	studentsToPromote,
	setStudentsToPromote,
}) {
	//declaring state variables
	const [isSortedBy, setIsSortedBy] = useState('');
	const [studentData, setStudentData] = useState(tableData);
	const [nextYearID, setNextYearID] = useState('');
	const [allIsChecked, setAllIsChecked] = useState(false);

	//Declaring set params
	const [searchParams] = useSearchParams();
	const curPage = searchParams.get('curPage');
	// const user = useSelector((state) => state.auth.user);
	const year = useSelector((state) => state.years.currentYear);
	const allSchoolYears = useSelector((state) => state.years.academicYears);
	const studNextYear = useSelector((state) => state.years.nextYearStudents);
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

	useEffect(() => {
		if (year?.schoolYear) {
			let nextYear = determineNextAcademicYear(
				year?.schoolYear,
				allSchoolYears
			);
			setNextYearID(nextYear?._id);

			if (nextYear?._id !== undefined)
				dispatch(getStudentPerAcademicYearNextStudents({ _id: nextYear?._id }));
		}
	}, [dispatch, year?.schoolYear]);

	async function promote(data) {
		if (nextYearID === undefined)
			return alert(
				'You Must Create A New Academic Year Before You Promote Any Student'
			);

		await dispatch(promoteStudents({ ...data, _id: year?._id }));
		await dispatch(getStudentPerAcademicYearNextStudents({ _id: nextYearID }));
	}

	function handleCheckBox(target, data) {
		let tempPromote = [];
		studentsToPromote.map((student) => {
			if (student?.studentID !== data.studentID) tempPromote.push(student);
		});

		if (target.checked) {
			tempPromote.push(data);
		}
		setStudentsToPromote(tempPromote);

		isChecked(data.studentID);
	}
	// console.log(studentsToPromote);

	function handleCheckAll(target) {
		setAllIsChecked(target.checked);

		if (target.checked) {
			setStudentsToPromote(() => {
				const students = DATA_CONST.map((student) => {
					return {
						studentID: student._id,
						toYear: nextYearID,
						newClass: detectNewClassOnPromotion(student.level),
					};
				});

				return students;
			});
		} else {
			setStudentsToPromote([]);
		}
	}

	function isChecked(studID) {
		const exist = studentsToPromote.filter(
			(student) => student.studentID === studID
		);
		return exist.length === 1;
	}

	return (
		<table className={`standard ${styles ? styles : ''}`}>
			{/* Table heading */}
			<thead>
				<tr className="head stud">
					<th>
						<input
							type="checkbox"
							name="select"
							id="select-all"
							onClick={(e) => handleCheckAll(e.target)}
						/>
					</th>
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
					<th className={`${isSortedBy === 'tel' ? 'sorted' : ''}`}>
						<FaRightLeft onClick={() => handleSort('tel')} />
						<span className="text">{header.tel}</span>
					</th>
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
								<td className="checkbox">
									<input
										type="checkbox"
										name=""
										id=""
										onChange={(e) =>
											handleCheckBox(e.target, {
												studentID: row._id,
												toYear: nextYearID,
												newClass: detectNewClassOnPromotion(row.level),
											})
										}
										checked={
											isChecked(row._id) || (allIsChecked && isChecked(row._id))
										}
									/>
								</td>
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
									<span className="text">Level {row.level}</span>
								</td>
								<td>
									<span className="text">{getDateFromDateObject(row.dob)}</span>
								</td>
								{/* <td>
									<span className="text">{row.parent_name}</span>
								</td> */}
								<td>
									<span className="text">{row.tel}</span>
								</td>
								<td>
									<span className="text">{row.specialty?.name}</span>
								</td>
								<td>
									<span className="text">{row.address}</span>
								</td>
								{tableType !== 'results' && (
									<td>
										<div className="actions results">
											{studNextYear.includes(row._id) ? (
												<button
													className={`button-main button-main-small ${
														studNextYear.includes(row._id) && 'promoted'
													}`}
												>
													<span className="text">Promoted</span>
												</button>
											) : (
												<button
													className={`button-main button-main-small`}
													onClick={() =>
														promote({
															studentID: row._id,
															toYear: nextYearID,
															newClass: detectNewClassOnPromotion(row.level),
														})
													}
													// disabled={!nextYearID}
												>
													<span className="text">
														{nextYearID === undefined ? 'Pending' : 'Promote'}
													</span>
												</button>
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

export default TableStudentsPromote;
