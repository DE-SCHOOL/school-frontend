import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaSistrix, FaRegBell, FaS, Fa1, Fa2 } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';

import { cmrLogo } from './../../assets/logos';
import { profile3 } from './../../assets/images';

//imorting user infromation
import { useDispatch, useSelector } from 'react-redux';

import './../styles/main.scss';
import { loggedIn } from '../../store/auth/authSlice';

import {
	removeLeftNav,
	showLeftNav,
	toggleLeftNav,
} from '../../store/ui-state/ui-stateSlice';

import * as periodInfo from './../../utilities/periodInfo';
import {
	getAcademicYears,
	getCurrentYear,
	updateAcademicYears,
} from '../../store/academic year/academicYearSlice';
import { FaHome, FaTimes } from 'react-icons/fa';

function MainNav({ styleClass = '' }) {
	const [showSemester, setShowSemester] = useState(false);
	const [showYears, setShowYears] = useState(false);
	let sem = periodInfo.semester();
	const navigate = useNavigate();
	const academicYears = useSelector((state) => state.years.academicYears);
	const isLoadingYear = useSelector((state) => state.years.isLoading);
	const currentYear = academicYears?._id
		? [academicYears].filter((year) => year.isCurrent)[0]
		: academicYears?.length > 0
		? academicYears?.filter((year) => year.isCurrent)[0]
		: [];
	// console.log(academicYears);

	const handleSetSemester = (semester) => {
		setShowSemester((prev) => !prev);

		let curSemester = { current: semester };

		localStorage.setItem('semester', JSON.stringify(curSemester));
		window.location.assign(
			`${window.location.pathname + window.location?.search || ''}`
		);
	};

	const handleSetYear = async (id) => {
		await dispatch(updateAcademicYears({ id }));
		setShowYears((prev) => !prev);
		window.location.assign(
			`${window.location.pathname + window.location?.search || ''}`
		);
	};

	const authUser = useSelector((state) => state.auth);
	const stateUi = useSelector((state) => state.uiState.leftNavResponsive);
	// console.log(authUser);
	const dispatch = useDispatch();

	//dispatch to check if user is logged in
	useEffect(() => {
		dispatch(loggedIn());
		dispatch(getAcademicYears());
		dispatch(getCurrentYear());
	}, [dispatch]);

	window.onresize = function (e) {
		if (window.innerWidth >= 1100 && window.innerWidth <= 1110) {
			dispatch(removeLeftNav());
		} else if (window.innerWidth > 1110 && window.innerWidth <= 1120) {
			dispatch(showLeftNav());
		}
	};

	window.onload = function (e) {
		if (window.innerWidth <= 500) {
			dispatch(removeLeftNav());
		}
	};

	//if user is not logged in or user data got deleted from local storage
	if (!authUser.isLoggedIn || !authUser.user) return navigate('/auth/signin');
	return (
		<nav className={`main-nav ${styleClass}`}>
			<div className="main-nav__left">
				{styleClass !== '' && (
					<button className="button-main" onClick={() => navigate('/')}>
						<FaHome className="main-nav__responsive" />
					</button>
				)}
				<button
					className="button-main"
					onClick={() => dispatch(toggleLeftNav())}
				>
					{stateUi ? (
						<FaBars className="main-nav__responsive" />
					) : (
						<FaTimes className="main-nav__responsive" />
					)}
				</button>
				<form
					action=""
					className="main-nav__form rounded__small main-nav__res"
					name="general-search"
				>
					<FaSistrix className="main-nav__form-search icons" />
					<input
						type="text"
						placeholder="Search here"
						className="main-nav__form-search-input input"
						name="main-search"
					/>
				</form>
			</div>
			<div className="main-nav__right">
				<span className="main-nav__logo rounded main-nav__res">
					<img
						src={cmrLogo}
						alt="Country logo"
						className="image-pic__mini rounded"
					/>
				</span>
				<span className="main-nav__notification rounded main-nav__res">
					<FaRegBell className="icons" />
				</span>
				<span className="main-nav__semester rounded">
					<span
						className="iconss"
						onClick={() => setShowSemester((prev) => !prev)}
					>
						<FaS className="svg" />
						{sem === 's1' && <Fa1 className="svg" />}
						{sem === 's2' && <Fa2 className="svg" />}
					</span>
					<div className={`semester ${showSemester === false ? 'toggle' : ''}`}>
						<li onClick={() => handleSetSemester('s1')}>
							<FaS className="svg" />
							<Fa1 className="svg" />
						</li>
						<li onClick={() => handleSetSemester('s2')}>
							<FaS className="svg" />
							<Fa2 className="svg" />
						</li>
					</div>
				</span>
				{authUser.user.role === 'admin' && (
					<span className="main-nav__year">
						<span
							className="iconss"
							onClick={() => setShowYears((prev) => !prev)}
						>
							{isLoadingYear ? 'loading...' : `Y: ${currentYear?.schoolYear}`}
						</span>
						<div className={`year ${showYears === false ? 'toggle' : ''}`}>
							{academicYears?.length > 0 &&
								academicYears?.map((years) => {
									return (
										<li
											key={years._id}
											onClick={() => handleSetYear(years._id)}
										>
											Y: {years.schoolYear}
										</li>
									);
								})}
						</div>
					</span>
				)}

				<span className="main-nav__settings rounded main-nav__res">
					<FiSettings className="icons" />
				</span>
				<div className="main-nav__profile main-nav__res">
					<div className="main-nav__profile-pic rounded">
						<img
							src={profile3}
							alt="Profile pic"
							className="image-pic__small rounded"
						/>
					</div>
					<div className="main-nav__profile-details">
						<h2 className="header-tertiary">{authUser.user.name}</h2>
						<span className="role">{authUser.user.role}</span>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default MainNav;
