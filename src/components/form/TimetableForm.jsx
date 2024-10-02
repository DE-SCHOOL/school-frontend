import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Uploader } from 'rsuite';

//import action creator slices
import { getSpecialties } from '../../store/specialty/specialtySlice';

//import reactions
// import {Failure} from '../signal';
import Failure from './../signal/Failure';
import Success from './../signal/Success';
import Loader from '../loaders/Loader';
import {
	uploadFile,
} from '../../store/timetable/timetableSlice';

//initialize default information
const defaultInfo = {
	level: '200',
	semester: '',
	name: '',
	specialty: '',
	file: '',
	fileError: '',
};

function TimetableForm({ styles, type = '' }) {
	//create dispatch to dispatch actions and useSelect for getting out information
	const dispatch = useDispatch();
	const specialties = useSelector((state) => state.specialty.specialties.data);
	const academicYears = useSelector((state) => state.years.academicYears);
	const timetable = useSelector((state) => state.timetable);

	//initialize the main hooks
	const [timetableData, setTimetableData] = useState(defaultInfo);
	const specialty = useRef();
	const semester = useRef();
	const years = useRef();
	// console.log(timetableData, 'DATA');

	//Get all specialties after initial render
	useEffect(() => {
		dispatch(getSpecialties());
	}, [dispatch]);

	//Execute this function when you click submit, to add a student
	const registerStudent = (e) => {
		e.preventDefault();

		const getName = (id, arr) => {
			let val;
			arr.map((a) => {
				if (a._id === id) {
					val = a?.name || a?.schoolYear;
				}
				return a;
			});

			return val;
		};
		const data = {
			...timetableData,
			specialty: specialty.current.value,
			semester: semester.current.value,
			academicYear: years.current.value,
			specialtyName: getName(specialty.current.value, specialties),
			schoolYear: getName(years.current.value, academicYears),
		};

		if (data.file !== '' && data.fileError === '') {
			dispatch(uploadFile(data));
			setTimetableData(defaultInfo);
			// dispatch(getAllTimetables());
		} else {
			alert('Make sure you select a file (max 1MB) for the timetable');
		}
	};

	return (
		<form
			action=""
			name="form"
			id="student"
			className={`${styles ? styles : ''}`}
			onSubmit={registerStudent}
			encType="multipart/form-data"
		>
			<div className="form">
				<div className="form-item">
					<span className="desc">
						Level <em>*</em>
					</span>
					<select
						name="level"
						id=""
						value={timetableData.level}
						onChange={(e) =>
							setTimetableData((prev) => {
								return { ...prev, level: e.target.value };
							})
						}
					>
						<option value="200">200</option>
						<option value="300">300</option>
						<option value="400">400</option>
						<option value="601">600 I</option>
						<option value="602">600 II</option>
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
				<div className="form-item">
					<span className="desc">
						Semester <em>*</em>
					</span>
					<select name="semester" id="" ref={semester}>
						<option value="s1">First Semester</option>
						<option value="s2">Second Semester</option>
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						Academic year <em>*</em>
					</span>
					<select
						name="year"
						id=""
						ref={years}
						required
						title="use the CTRL key to select multiple options"
					>
						<option value="">Select academic year</option>

						{academicYears?.map((year) => {
							return (
								<option key={year._id} value={year._id}>
									{year.schoolYear}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-item">
					<span className="desc">
						File name <em>*</em>
					</span>
					<input
						type="text"
						placeholder="e.g SWE 1st Semester Timetable"
						required
						name="name"
						value={timetableData.name}
						onChange={(e) =>
							setTimetableData((prev) => {
								return { ...prev, name: e.target.value };
							})
						}
						autoComplete="name"
					/>
				</div>
				<div className="form-item mg-top form-file">
					<span className="file-error">{timetableData.fileError}</span>
				</div>
				<div className="form-item mg-top form-file timetable-file">
					<Uploader
						action=""
						draggable
						autoUpload={false}
						accept=".pdf"
						onChange={(fileList, event) => {
							const size = (fileList[0].blobFile.size / 1000_000).toFixed(1);
							setTimetableData((prev) => {
								return {
									...prev,
									file: fileList[0] || '',
									fileError:
										size <= 1 ? '' : 'File is too large (' + size + 'MB)',
								};
							});
						}}
						// shouldUpload={() => false}
						// renderFileInfo={() => <React.Fragment></React.Fragment>}
						// renderThumbnail={() => <React.Fragment></React.Fragment>}
						fileList={[]}
					>
						<div
							style={{
								height: 65,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{timetableData.file === '' ? (
								<span>
									Click or Drag file to this area to upload. (Max 1000KB - 1MB)
								</span>
							) : (
								<span className="file-info">
									{timetableData.file?.name.toUpperCase()}
								</span>
							)}
						</div>
					</Uploader>
				</div>
				<div className="form-item mg-top form-file">
					<progress
						className="progress"
						value={timetable.uploadProgress}
						max={100}
					/>
				</div>
			</div>
			<button className="button-main button-main-medium mg-top-md">
				submit
			</button>
			{timetable.error === true && timetable.errorMessage && (
				<Failure message={timetable.errorMessage} />
			)}
			{timetable.uploadSuccess === true && <Success />}
			{/* {studentss.error === false && setStaffData(defaultInfo)} */}
			{timetable.isLoadingTimetables && <Loader />}
		</form>
	);
}

export default TimetableForm;
