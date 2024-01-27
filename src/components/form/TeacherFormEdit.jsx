import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

//import action creator slices
// import { getDepartments } from '../../store/departments/departmentSlice';
import { editStaff, getStaff } from '../../store/staffs/staffSlice';
import Failure from '../signal/Failure';
import Loader from './../../components/loaders/Loader';

//initialize default information
const defaultInfo = {
	gender: 'male',
	matricule: '',
	name: '',
	// department: '',
	address: '',
	dob: '',
	pob: '',
	email: '',
	tel: '',
	password: '',
	confirmPassword: '',
	high_certificate: '',
	marital_status: 'married',
	role: 'lecturer',
	picture: 'n/a',
};

function TeacherFormEdit() {
	//initialize the main hooks
	const param = useParams();
	const [staffData, setStaffData] = useState(defaultInfo);
	// const department = useRef();

	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const staffss = useSelector((state) => state.staffs);
	const teacher = useSelector((state) => state.staffs.teacher);

	let dob = teacher
		? `${new Date(teacher?.dob).getFullYear()}-${
				new Date(teacher?.dob).getMonth() + 1 < 10
					? `0${new Date(teacher?.dob).getMonth() + 1}`
					: new Date(teacher?.dob).getMonth() + 1
		  }-${
				new Date(teacher?.dob).getDate() + 1 < 10
					? `0${new Date(teacher?.dob).getDate() + 1}`
					: new Date(teacher?.dob).getDate() + 1
		  }`
		: '2000-01-01';

	console.log(teacher, dob);
	useEffect(() => {
		dispatch(getStaff({ id: param.id }));
	}, [dispatch, param.id]);

	//Adding ref for useRef
	const DOB = useRef();
	const name = useRef();
	const matricule = useRef();
	const address = useRef();
	const pob = useRef();
	const email = useRef();
	const tel = useRef();
	const high_certificate = useRef();
	const marital_status = useRef();
	const role = useRef();
	const gender = useRef();

	//Execute this function when you click submit, to add a teacher
	const handleEditStaff = (e) => {
		e.preventDefault();

		const reqData = {
			...staffData,
			matricule: matricule.current.value,
			name: name.current.value,
			address: address.current.value,
			dob: DOB.current.value,
			pob: pob.current.value,
			email: email.current.value,
			tel: tel.current.value,
			high_certificate: high_certificate.current.value,
			marital_status: marital_status.current.value,
			role: role.current.value,
			gender: gender.current.value,
		};
		dispatch(editStaff({ reqData, id: param.id }));
		console.log(reqData);
		// setStaffData(defaultInfo);
	};

	return (
		<form action="" name="form" id="teacher" onSubmit={handleEditStaff}>
			<h2 className="mg-top-md mg-bt-md">Basic Details</h2>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Full names <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter staff fullnames"
						name="name"
						required
						autoComplete="name"
						ref={name}
						defaultValue={teacher?.name}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Address <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter staff address"
						name="address"
						required
						autoComplete="address"
						ref={address}
						defaultValue={teacher?.address}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Matricule <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter staff matricule"
						name="matricule"
						required
						ref={matricule}
						defaultValue={teacher?.matricule}
					/>
				</div>
				{teacher?.dob && (
					<div className="form-item">
						<span className="desc">
							Date of birth <em>*</em>
						</span>
						<input
							type="date"
							placeholder="Enter staff Date of birth"
							name="dob"
							autoComplete="dob"
							required
							ref={DOB}
							defaultValue={dob}
							// value={dob}
						/>
					</div>
				)}
				<div className="form-item">
					<span className="desc">
						Place of birth <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter staff Place of birth"
						name="pob"
						required
						ref={pob}
						defaultValue={teacher?.pob}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Phone number <em>*</em>
					</span>
					<input
						type="number"
						placeholder="Enter staff phone number"
						name="test"
						required
						ref={tel}
						defaultValue={teacher?.tel}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Highest certificate <em>*</em>
					</span>
					<input
						type="text"
						placeholder="Enter staff highest certificate"
						name="high_certificate"
						required
						autoComplete="first-name"
						ref={high_certificate}
						defaultValue={teacher?.high_certificate}
					/>
				</div>
				<div className="form-item">
					<span className="desc">
						Gender <em>*</em>
					</span>
					<select
						name="gender"
						required
						onChange={(e) =>
							setStaffData((prev) => {
								return { ...prev, gender: e.target.value };
							})
						}
						ref={gender}
					>
						<option
							value="male"
							selected={teacher?.gender === 'male' ? true : false}
						>
							Male
						</option>
						<option
							value="female"
							selected={teacher?.gender === 'female' ? true : false}
						>
							Female
						</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Role <em>*</em>
					</span>
					<select
						name="role"
						required
						onChange={(e) =>
							setStaffData((prev) => {
								return { ...prev, role: e.target.value };
							})
						}
						ref={role}
					>
						<option
							value="lecturer"
							selected={teacher?.role === 'lecturer' ? true : false}
						>
							Lecturer
						</option>
						<option
							value="secreteriat"
							selected={teacher?.role === 'secreteriat' ? true : false}
						>
							Secreteriat
						</option>
						<option
							value="hod"
							selected={teacher?.role === 'hod' ? true : false}
						>
							HOD
						</option>
						<option
							value="director"
							selected={teacher?.role === 'director' ? true : false}
						>
							Director
						</option>
						<option
							value="admin"
							selected={teacher?.role === 'admin' ? true : false}
						>
							Admin
						</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Marital status <em>*</em>
					</span>
					<select
						name="marital_status"
						required
						onChange={(e) =>
							setStaffData((prev) => {
								return { ...prev, marital_status: e.target.value };
							})
						}
						ref={marital_status}
					>
						<option
							value="married"
							selected={teacher?.marital_status === 'married' ? true : false}
						>
							Married
						</option>
						<option
							value="not married"
							selected={
								teacher?.marital_status === 'not married' ? true : false
							}
						>
							Not Married
						</option>
						<option
							value="seperated"
							selected={teacher?.marital_status === 'seperated' ? true : false}
						>
							Seperated
						</option>
						<option
							value="devorced"
							selected={teacher?.marital_status === 'devorced' ? true : false}
						>
							Devorced
						</option>
					</select>
				</div>
			</div>

			<h2 className="mg-top-md mg-bt-md">Login Details</h2>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Email <em>*</em>
					</span>
					<input
						type="email"
						placeholder="Enter staff email"
						name="email"
						required
						autoComplete="email"
						ref={email}
						defaultValue={teacher?.email}
					/>
				</div>
				<div className="form-item mg-top form-file">
					<span className="text">Upload Teacher Photo (200px X 200px) </span>
					<input type="file" name="profile" className="mg-top" />
				</div>
			</div>

			<button className="button-main button-main-medium mg-top-md">
				modify
			</button>
			{staffss.error === true && <Failure message={staffss.errorMessage} />}
			{/* {staffss.error === false && setStaffData(defaultInfo)} */}
			{staffss.isLoading && <Loader />}
			{/* {staffss.success !== null && staffss.success > D<Success />} */}
		</form>
	);
}
export default TeacherFormEdit;
