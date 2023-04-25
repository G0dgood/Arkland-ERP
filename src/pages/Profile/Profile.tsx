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
import storage from '../../utils/storage';

const Profile = () => {

	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));


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
					<img className="demo-bg" src={logo} alt="" />
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
								<p className='profile-image-name-sub1' style={{ marginBottom: "0px" }}>{userInfo?.data?.full_name}</p>
								<p> <BsDot size={20} color={"green"} /> {userInfo?.data?.status}</p>
							</span>
							<p>
								<span className='profile-image-name-sub2'>IT</span>Developer</p>
						</span>
					</div>
					<div className='profile-image-name-sub3'>
						<span className='profile-image-name-number'>{userInfo?.data?.employee?.phone}</span>
						<a href='jamesabiodun@arkland.com'>{userInfo?.data?.employee?.address}</a>
					</div>
					<div className='General-Information'>
						<h5>General Information</h5>
					</div>

					<div className="viewprofile-container">
						<div>
							<div className="getjob-application-details">
								<p>Date of Birth</p>
								<p>{moment(userInfo?.data?.date_of_birth).format("DD-MM-YYYY")}</p>
								<p>Full Name</p>
								<p>{userInfo?.data?.employee?.full_name}</p>
								<p>Address</p>
								<p>{userInfo?.data?.employee?.address}</p>
								<p>City</p>
								<p>{userInfo?.data?.employee?.city}</p>
								<p>State</p>
								<p>Lagos</p>
								<p>Phone</p>
								<p>{userInfo?.data?.employee?.phone}</p>
							</div>
						</div>
						<div>
							<div className="getjob-application-details">
								<p>Date of Joining</p>
								<p>{moment(userInfo?.data?.employee?.employment_date).format("DD-MM-YYYY")}</p>
								<p>Role</p>
								<p>{userInfo?.data?.role?.name}</p>
								<p>HOD</p>
								<p>Peter Obi</p>
								<p>Department</p>
								<p>{userInfo?.data?.department?.name}</p>
								<p>Employer ID</p>
								<p>als-{userInfo?.data?.employee?.employee_id}</p>
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
