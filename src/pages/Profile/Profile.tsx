import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Button } from '@material-ui/core';
import { MdEditNote } from 'react-icons/md';
import { FiChevronLeft } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import logo from '../../assets/images/asl-profile.jpeg';
import { Link } from 'react-router-dom'
import moment from 'moment';

const Profile = () => {
	// @ts-ignore
	const userInfo: any = JSON.parse(localStorage.getItem("user"))

	console.log('userInfo', userInfo)

	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);
	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	};
	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className="profile-body">
					<div className="profile-body-container-sup">
						<span>
							<FiChevronLeft size={30} />
						</span>
						<span>
							<Link to='/profile/edit'>
								<Button variant="outlined" className="show-btn-profile" >
									<MdEditNote size={20} />
									Edit
								</Button>
							</Link>
						</span>
					</div>
					<div className="profile-body-container-sup-title">
						<span className="profile-image">
							<img src={logo} alt="Profile" className="profile-image-size" />
						</span>
						<span>
							<span className='profile-image-name'>
								<p className='profile-image-name-sub1' style={{ marginBottom: "0px" }}>{userInfo.full_name}</p>
								<p> <BsDot size={20} color={"green"} /> {userInfo.status}</p>
							</span>
							<p>
								<span className='profile-image-name-sub2'>IT</span>Developer</p>
						</span>
					</div>
					<div className='profile-image-name-sub3'>
						<span className='profile-image-name-number'>{userInfo?.employee?.phone}</span>
						<a href='jamesabiodun@arkland.com'>{userInfo?.employee?.address}</a>
					</div>
					<div className='General-Information'>
						<h5>General Information</h5>
					</div>

					<div className="viewprofile-container">
						<div>
							<div className="getjob-application-details">
								<p>Date of Birth</p>
								<p>03/16/1988</p>
								<p>Full Name</p>
								<p>{userInfo?.employee?.full_name}</p>
								<p>Address</p>
								<p>{userInfo?.employee?.address}</p>
								<p>City</p>
								<p>{userInfo?.employee?.city}</p>
								<p>State</p>
								<p>Lagos</p>
								<p>Phone</p>
								<p>{userInfo?.employee?.phone}</p>
							</div>
						</div>
						<div>
							<div className="getjob-application-details">
								<p>Date of Joining</p>
								<p>{moment(userInfo?.employee?.employment_date).format("DD-MM-YYYY")}</p>
								<p>Role</p>
								<p>Developer</p>
								<p>HOD</p>
								<p>Peter Obi</p>
								<p>Department</p>
								<p>IT</p>
								<p>Employer ID</p>
								<p>als-{userInfo?.employee?.employee_id}</p>
								<p>Station</p>
								<p>A&A Towers, Floor 3, Room 5 </p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Profile
