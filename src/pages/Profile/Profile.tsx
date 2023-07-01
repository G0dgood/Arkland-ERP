/* eslint-disable jsx-a11y/anchor-is-valid */

import { FiChevronLeft } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment';
import LogoutOption from '../../components/LogoutOption';
import DataService from '../../utils/dataService';
import { Button } from 'react-bootstrap';



const dataService = new DataService()
const Profile = () => {
	const locat = useLocation()
	// const chat = location;


	// @ts-ignore
	const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)

	// console.log('userInfo', userInfo)

	const { privileges } = userInfo

	return (
		<div  >
			<div className="profile-body">
				<Link to='/home'>
					{/* <img className="demo-bg" src={logo} alt="" /> */}
				</Link>
				<div className="profile-body-container-sup">
					<span>
						<Link to='/'>
							<FiChevronLeft size={30} />
						</Link>

					</span>
					<span><LogoutOption /></span>


				</div>
				<div className="profile-body-container-sup-title">
					<span className="profile-image">
						{/* <img src={logo} alt="Profile" className="profile-image-size" /> */}
					</span>
					<span>
						<span className='profile-image-name'>
							<p className='profile-image-name-sub1' style={{ marginBottom: "0px" }}>{userInfo?.full_name}</p>
							<p> <BsDot size={20} color={"green"} /> {userInfo?.role?.status}</p>
						</span>
						<p>
							<span className='profile-image-name-sub2'>{userInfo?.department?.name}</span>Developer</p>
					</span>
				</div>
				<div className='profile-image-name-sub3'>
					<span className='profile-image-name-number'>{userInfo?.employee?.phone}</span>
					<a>{userInfo?.employee?.address}</a>
				</div>
				<div className='General-Information'>
					<h5>General Information</h5>
				</div>

				<div className="viewprofile-container">
					<div>
						<div className="getjob-application-details">
							<p>Date of Birth</p>
							<p>{moment(userInfo?.date_of_birth).format("DD-MM-YYYY")}</p>
							<p>Full Name</p>
							<p>{userInfo?.employee?.full_name}</p>
							<p>Address</p>
							<p>{userInfo?.employee?.address}</p>
							<p>City</p>
							<p>{userInfo?.employee?.city}</p>
							<p>Phone</p>
							<p>{userInfo?.employee?.phone}</p>
						</div>
					</div>
					<div>
						<div className="getjob-application-details">
							<p>Date of Joining</p>
							<p>{moment(userInfo?.employee?.employment_date).format("DD-MM-YYYY")}</p>
							<p>Role</p>
							<p>{userInfo?.role?.name}</p>
							<p>Department</p>
							<p>{userInfo?.department?.name}</p>
							<p>Employer ID</p>
							<p>als-{userInfo?.employee?.employee_id}</p>
						</div>
					</div>
					<div>
						<div className='General-Information'>
							<h5>Privileges</h5>
						</div>
						<div>
							{privileges?.map((item: any, i: any) => (
								<div className="getjob-application-details" key={i}>
									<p>Role</p>
									<p>{item?.role}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Profile
