import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Button } from '@material-ui/core';
import { MdEditNote } from 'react-icons/md';
import { FiChevronLeft } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import logo from '../../assets/images/asl-profile.jpeg';
import { Link } from 'react-router-dom'

const Profile = () => {

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
						<span><FiChevronLeft size={30} /></span>
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
								<p className='profile-image-name-sub1' style={{ marginBottom: "0px" }}>James Abiodun</p>
								<p  > <BsDot size={20} color={"green"} />active </p>
							</span>
							<p>
								<span className='profile-image-name-sub2'>IT</span> Developer</p>
						</span>
					</div>
					<div className='profile-image-name-sub3'>
						<span className='profile-image-name-number'>+234 706 345 6677</span>
						<a href='jamesabiodun@arkland.com'>jamesabiodun@arkland.com</a>
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
								<p>James Abiodun</p>
								<p>Address</p>
								<p>24 Eze Str Lekki 1</p>
								<p>City</p>
								<p>Lagos Island</p>
								<p>State</p>
								<p>Lagos</p>
								<p>Phone</p>
								<p>+234 706 345 6677 </p>
							</div>
						</div>
						<div>
							<div className="getjob-application-details">
								<p>Date of Joining</p>
								<p>10/01/2021</p>
								<p>Role</p>
								<p>Developer</p>
								<p>Line Manager</p>
								<p>Peter Obi</p>
								<p>Department</p>
								<p>IT</p>
								<p>Employer ID</p>
								<p>340-2222</p>
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
