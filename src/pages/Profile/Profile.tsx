/* eslint-disable jsx-a11y/anchor-is-valid */
import { FiChevronLeft } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment';
import LogoutOption from '../../components/LogoutOption';
import DataService from '../../utils/dataService';
import { useState } from 'react';
import { FiUser } from "react-icons/fi";
import { FaWrench } from 'react-icons/fa';

const dataService = new DataService()
const Profile = () => {
	const location = useLocation()
	const [open, setOpen] = useState<any>(location.state.open);


	// @ts-ignore
	const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	const { privileges } = userInfo

	console.log('userInfo', userInfo)


	return (
		// <div className="profile-body">
		<div className='main-profile'>

			<div id='profile-details'>
				<div className='employee-passport'>
					<FiUser size={80} />
				</div>
				<div className='employee-details'>
					<h5>{userInfo?.employee?.full_name}</h5>
					<h6>{userInfo?.employee?.email}</h6>
					{/* <h6>{userInfo?.role?.status}</h6> */}
					{/* <p>Freelancers and entrepreneur use about me to grow their
						audience and get more client. Create are page to present
						what you are and do in one link.
					</p> */}
				</div>
				<div className='profile-edit'>
					<LogoutOption open={open} setOpen={setOpen} />
					{/* <Link to='/profile/edit'>
						<button>
							<FaWrench className="icon" /> Edit profile </button>
					</Link> */}
				</div>
			</div>

			<div id='Employee-info'>
				<div className='all-info'>
					<div className='information1'>
						<div className='Personal-Information'>
							<h3>Personal Information</h3>

							<p><span className='title'>Full Name: </span>{userInfo?.employee?.full_name}</p>
							<p><span className='title'>Email Address: </span>{userInfo?.employee?.email}</p>
							<p><span className='title'>Adress: </span>{userInfo?.employee?.address}</p>
							<p><span className='title'>Date Of Birth: </span>{moment(userInfo?.date_of_birth).format("DD-MM-YYYY")}</p>
							<p><span className='title'>City: </span>{userInfo?.employee?.city}</p>
						</div>

						<div className='Profile-Information'>
							<h3>Profile Information</h3>
							<p><span className='title'>Employee ID: </span><span className="id">als-{userInfo?.employee?.employee_id}</span></p>
							<p><span className='title'>Gender: </span>Male</p>
							<p><span className='title'>Contact Number: </span>{userInfo?.employee?.phone}</p>
							<p><span className='title'>Role: </span>{userInfo?.role?.name}</p>
							<p><span className='title'>Department: </span>{userInfo?.department?.name}</p>
						</div>
					</div>
				</div>

				<div className='information2'>
					<div className='Education-information'>
						<h3>Privileges</h3>
						{privileges?.map((item: any, i: any) => (
							<p key={i}><span className='title'>Role: </span>{item?.role}</p>
						))}
					</div>

					<div className="Next-of-kin">
						<h3>OThers</h3>
						<p><span className='title'>Date of Joining: </span>{moment(userInfo?.employee?.employment_date).format("DD-MM-YYYY")}</p>
						<p><span className='title'>Address: </span>{userInfo?.employee?.address}</p>
						<p><span className='title'>Email Address: </span>{userInfo?.employee?.email}</p>
						<p><span className='title'>Institution_Attended: </span>{userInfo?.employee?.institution_attended} </p>
						<p><span className='title'>Qualification: </span> {userInfo?.employee?.qualification}</p>
					</div>
				</div>
			</div>



			{/* <div  >
				<Link to='/home'> 
				</Link>
				<div className="profile-body-container-sup">
					<span>
						<Link to='/'>
							<FiChevronLeft size={30} />
						</Link> 
					</span>
					<span>
						<LogoutOption open={open} setOpen={setOpen} />
					</span> 
				</div>
			</div> */}




		</div>
	)
}

export default Profile
