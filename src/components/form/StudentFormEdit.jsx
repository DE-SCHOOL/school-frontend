import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//import action creator slices
import { getSpecialties } from '../../store/specialty/specialtySlice';
import { editStudent, getStudent } from '../../store/students/studentSlice';

import { getDateFromDateObject } from '../../utilities/getDate';

//import reactions
import Failure from '../signal/Failure';
import Loader from '../loaders/Loader';

//initialize default information
const defaultInfo = {
	level: '200',
	gender: 'male',
	specialty: '',
};

function StudentFormEdit({ styles }) {
	//Get student id
	const param = useParams();
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const specialties = useSelector((state) => state.specialty.specialties.data);
	const studentss = useSelector((state) => state.students);
	const student = useSelector((state) => state.students.student);
	const year = useSelector((state) => state.years.currentYear);

	let dob = `${new Date(student?.dob).getFullYear()}-${
		new Date(student?.dob).getMonth() + 1 < 10
			? `0${new Date(student?.dob).getMonth() + 1}`
			: new Date(student?.dob).getMonth() + 1
	}-${
		new Date(student?.dob).getDate() + 1 < 10
			? `0${new Date(student?.dob).getDate() + 1}`
			: new Date(student?.dob).getDate() + 1
	}`;
	//initialize the main hooks
	const [studentData, setStudentData] = useState(defaultInfo);
	const [dobN, setDOB] = useState('');
	const specialty = useRef();
	const DOB = useRef();
	const name = useRef();
	const matricule = useRef();
	const address = useRef();
	const pob = useRef();
	const email = useRef();
	const tel = useRef();
	const parent_email = useRef();
	const parent_name = useRef();
	const parent_tel = useRef();
	const entry_certificate = useRef();
	const level = useRef();
	const gender = useRef();

	console.log(dob);
	console.log(dobN);

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getSpecialties());
		if (year?._id !== undefined) {
			dispatch(getStudent({ id: param.id, academicYearID: year?._id }));
		}
	}, [dispatch, param.id, year?._id]);

	//Execute this function when you click submit, to add a student
	const modifyStudent = (e) => {
		e.preventDefault();

		const reqData = {
			...studentData,
			specialty: specialty.current.value,
			matricule: matricule.current.value,
			name: name.current.value,
			address: address.current.value,
			dob: DOB.current.value,
			pob: pob.current.value,
			email: email.current.value,
			tel: tel.current.value,
			parent_name: parent_name.current.value,
			parent_email: parent_email.current.value,
			parent_tel: parent_tel.current.value,
			entry_certificate: entry_certificate.current.value,
			level: level.current.value,
			gender: gender.current.value,
		};
		console.log(reqData);
		dispatch(editStudent({ reqData, id: param.id }));
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={modifyStudent}
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Matricule <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter matricule"
						name="matricule"
						required
						// value={studentData.matricule}
						defaultValue={student?.matricule}
						ref={matricule}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Student name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter student name"
						required
						name="name"
						defaultValue={student?.name}
						// value={studentData.name}
						ref={name}
						autoComplete="name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Address <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter address"
						name="address"
						required
						// value={studentData.address}
						defaultValue={student?.address}
						ref={address}
						autoComplete="address"
					/>
				</div>
				{student?.dob && (
					<div className="form-item">
						<span className="desc">
							Date of Birth <em>*</em>
						</span>
						<input
							type="date"
							placeholder="Enter date of birth"
							required
							name="date-of-birth"
							ref={DOB}
							autoComplete="date-of-birth"
							defaultValue={getDateFromDateObject(dob, -1)}
							value={dobN !== '' ? dobN : getDateFromDateObject(dob, -1)}
							onChange={(e) => setDOB(e.target.value)}
						/>
					</div>
				)}
				<div className="form-item">
					<span className="desc">
						Place of birth <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter place of birth"
						required
						name="place-of-birth"
						defaultValue={student?.pob}
						ref={pob}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Email <em>*</em>
					</span>
					<input
						type="email"
						placeholder="Enter email"
						name="email"
						required
						defaultValue={student?.email}
						autoComplete="email"
						ref={email}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Student Tel <em>*</em>
					</span>
					<input
						type="number"
						placeholder="Enter student tel"
						required
						name="student-tel"
						defaultValue={student?.tel}
						autoComplete="first-name"
						ref={tel}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Parent name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter parent name"
						required
						name="parent-name"
						defaultValue={student?.parent_name}
						ref={parent_name}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Parent email <em>*</em>
					</span>
					<input
						type="email"
						placeholder="Enter parent email"
						required
						name="parent-email"
						defaultValue={student?.parent_email}
						ref={parent_email}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Parent tel <em>*</em>
					</span>
					<input
						type="number"
						placeholder="Enter parent tel"
						required
						name="parent-tel"
						defaultValue={student?.parent_tel}
						autoComplete="parent tel"
						ref={parent_tel}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Highest education level <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter highest education level"
						required
						name="entry-level"
						defaultValue={student?.entry_certificate}
						ref={entry_certificate}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Gender <em>*</em>
					</span>
					<select
						name="gender"
						id=""
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, gender: e.target.value };
							})
						}
						ref={gender}
					>
						<option
							value="male"
							selected={student?.gender === 'male' ? true : false}
						>
							Male
						</option>
						<option
							value="female"
							selected={student?.gender === 'female' ? true : false}
						>
							Female
						</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Level <em>*</em>
					</span>
					<select
						name="level"
						id=""
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, level: e.target.value };
							})
						}
						ref={level}
					>
						<option
							value="200"
							selected={student?.level === 200 ? true : false}
						>
							200
						</option>
						<option
							value="300"
							selected={student?.level === 300 ? true : false}
						>
							300
						</option>
						<option
							value="400"
							selected={student?.level === 400 ? true : false}
						>
							400
						</option>
						<option
							value="601"
							selected={student?.level === 601 ? true : false}
						>
							600 I
						</option>
						<option
							value="602"
							selected={student?.level === 602 ? true : false}
						>
							600 II
						</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Specialty <em>*</em>
					</span>
					<select name="specialty" id="" ref={specialty}>
						{specialties?.map((specialty) => {
							return (
								<option
									key={specialty._id}
									value={specialty._id}
									selected={
										specialty._id === `${student?.specialty?._id}`
											? true
											: false
									}
								>
									{specialty.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item mg-top form-file">
					<span className="text">Upload Student Photo (200px X 200px) </span>
					<input type="file" name="profile" className="mg-top" />
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				modify
			</button>
			{studentss.error === true && studentss.errorMessage && (
				<Failure message={studentss.errorMessage} />
			)}
			{/* {studentss.error === false && setStaffData(defaultInfo)} */}
			{studentss.isLoading && <Loader />}
		</form>
	);
}

export default StudentFormEdit;
