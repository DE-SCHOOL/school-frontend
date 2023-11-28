import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaSistrix, FaRegBell } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';

import { cmrLogo } from './../../assets/logos';
import { profile3 } from './../../assets/images';

//imorting user infromation
import { useDispatch, useSelector } from 'react-redux';

import './../styles/main.scss';
import { loggedIn } from '../../store/auth/authSlice';

function MainNav() {
	const authUser = useSelector((state) => state.auth);
	// console.log(authUser);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	//dispatch to check if user is logged in
	useEffect(() => {
		dispatch(loggedIn());
	}, [dispatch]);
	
	
	//if user is not logged in or user data got deleted from local storage
	// if (!authUser.isLoggedIn || !authUser.user) return navigate('/auth/signin');
	return (
		<nav className="main-nav">
			<div className="main-nav__left">
				<button className="button-main">
					<FaBars className="main-nav__responsive" />
				</button>
				<form
					action=""
					className="main-nav__form rounded__small"
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
				<span className="main-nav__logo rounded">
					<img
						src={cmrLogo}
						alt="Country logo"
						className="image-pic__mini rounded"
					/>
				</span>
				<span className="main-nav__notification rounded">
					<FaRegBell className="icons" />
				</span>
				<span className="main-nav__settings rounded">
					<FiSettings className="icons" />
				</span>
				<div className="main-nav__profile">
					<div className="main-nav__profile-pic rounded">
						<img
							src={profile3}
							alt="Profile pic"
							className="image-pic__small rounded"
						/>
					</div>
{/* 					<div className="main-nav__profile-details">
						<h2 className="header-tertiary">{authUser.user.name}</h2>
						<span className="role">{authUser.user.role}</span>
					</div> */}
				</div>
			</div>
		</nav>
	);
}

export default MainNav;
