import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//import action creator slices
import { getSpecialties } from '../../store/specialty/specialtySlice';
import { addStudent } from '../../store/students/studentSlice';

//import reactions
// import {Failure} from '../signal';
import Failure from './../signal/Failure';
import Success from './../signal/Success';
import Loader from '../loaders/Loader';

//initialize default information
const defaultInfo = {
	level: '',
	gender: 'male',
	matricule: '',
	name: '',
	specialty: '',
	address: '',
	dob: '',
	pob: '',
	email: '',
	tel: '',
	parent_name: '',
	parent_email: '',
	parent_tel: '',
};

function StudentForm({ styles, type = '' }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const specialties = useSelector((state) => state.specialty.specialties.data);
	const studentss = useSelector((state) => state.students);
	const year = useSelector((state) => state.years.currentYear);
	//initialize the main hooks
	const [studentData, setStudentData] = useState(defaultInfo);
	const specialty = useRef();
	const level = useRef();
	// console.log(studentData, 'DATA');

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getSpecialties());
	}, [dispatch]);

	//Execute this function when you click submit, to add a student
	const registerStudent = (e) => {
		e.preventDefault();

		if (year?._id === undefined) {
			alert(
				'Create academic years first. \n1. Check the navigation panel\n2. Select Academic year\n3. Choose create year and create the academic year'
			);
			return;
		}
		dispatch(
			addStudent({
				...studentData,
				specialty: specialty.current.value,
				level: level.current.value,
				yearID: year?._id,
			})
		);
		setStudentData(defaultInfo);
	};
	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={registerStudent}
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
						value={studentData.matricule}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, matricule: e.target.value };
							})
						}
						//autoComplete="first-name"
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
						value={studentData.name}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, name: e.target.value };
							})
						}
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
						value={studentData.address}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, address: e.target.value };
							})
						}
						autoComplete="address"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Date of Birth <em>*</em>
					</span>
					<input
						type="date"
						placeholder="Enter date of birth"
						required
						name="date-of-birth"
						value={studentData.dob}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, dob: e.target.value };
							})
						}
						autoComplete="first-name"
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Place of birth <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter place of birth"
						required
						name="place-of-birth"
						value={studentData.pob}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, pob: e.target.value };
							})
						}
					/>
				</div>
				<div className="form-item">
					<span className="desc">Email (optional)</span>
					<input
						type="email"
						placeholder="Enter email"
						name="email"
						value={studentData.email}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, email: e.target.value };
							})
						}
						autoComplete="email"
					/>
				</div>
				<div className="form-item">
					<span className="desc">Student Tel (optional)</span>
					<input
						type="number"
						placeholder="Enter student tel"
						name="student-tel"
						value={studentData.tel}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, tel: e.target.value };
							})
						}
						autoComplete="first-name"
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
						value={studentData.parent_name}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, parent_name: e.target.value };
							})
						}
					/>
				</div>
				<div className="form-item">
					<span className="desc">Parent email (optional)</span>
					<input
						type="email"
						placeholder="Enter parent email"
						name="parent-email"
						value={studentData.parent_email}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, parent_email: e.target.value };
							})
						}
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
						value={studentData.parent_tel}
						onChange={(e) =>
							setStudentData((prev) => {
								return { ...prev, parent_tel: e.target.value };
							})
						}
						autoComplete="parent tel"
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
					>
						<option value="">Select gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Class <em>*</em>
					</span>
					<select name="level" id="" ref={level} required>
						<option value="">Select class</option>
						<option value="100">Form 1</option>
						<option value="200">Form 2</option>
						<option value="300">Form 3</option>
						<option value="400">Form 4</option>
						<option value="500">Form 5</option>
						<option value="601">Lower sixth</option>
						<option value="602">Upper sixth</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Specialty <em>*</em>
					</span>
					<select name="specialty" id="" ref={specialty}>
						{specialties?.map((specialty) => {
							return (
								<option key={specialty._id} value={specialty._id}>
									{specialty.name}
								</option>
							);
						})}
					</select>
				</div>
				{/* LET STUDENTS SEND THEIR INFORMATION */}
				{type === '' && (
					<div className="form-item mg-top form-file">
						<span className="text">Upload Student Photo (200px X 200px) </span>
						<input type="file" name="profile" className="mg-top" />
					</div>
				)}
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{studentss.error === true && studentss.errorMessage && (
				<Failure message={studentss.errorMessage} />
			)}
			{studentss.success === true && <Success />}
			{/* {studentss.error === false && setStaffData(defaultInfo)} */}
			{studentss.isLoading && <Loader />}
		</form>
	);
}

export default StudentForm;
