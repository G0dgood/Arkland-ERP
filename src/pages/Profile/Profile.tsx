/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment';
import DataService from '../../utils/dataService';
import { FiUser } from "react-icons/fi";

const dataService = new DataService()
const Profile = () => {

	// @ts-ignore
	const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	const { privileges } = userInfo






	return (
		<div className='main-profile'>
			<div id='profile-details'>
				<div className='employee-passport'>
					<FiUser size={80} />
				</div>
				<div className='employee-details'>
					<h5>{userInfo?.employee?.full_name}</h5>
					<h6>{userInfo?.employee?.email}</h6>

				</div>
				<div className='profile-edit'>
				</div>
			</div>

			<div id='Employee-info'>
				<div className='all-info'>
					<div className='information1'>
						<div className='Personal-Information'>
							<h6>Personal Information</h6>
							<p><span className='title'>Full Name: </span>{userInfo?.employee?.full_name}</p>
							<p><span className='title'>Email Address: </span>{userInfo?.employee?.email}</p>
							<p><span className='title'>Adress: </span>{userInfo?.employee?.address}</p>
							<p><span className='title'>Date Of Birth: </span>{moment(userInfo?.date_of_birth).format("DD-MM-YYYY")}</p>
							<p><span className='title'>City: </span>{userInfo?.employee?.city}</p>
						</div>

						<div className='Profile-Information'>
							<h6>Profile Information</h6>
							<p><span className='title'>Employee ID: </span><span className="id">als-{userInfo?.employee?.employee_id}</span></p>
							<p><span className='title'>Gender: </span>{userInfo?.employee?.gender}</p>
							<p><span className='title'>Contact Number: </span>{userInfo?.employee?.phone}</p>
							<p><span className='title'>Role: </span>{userInfo?.role?.name}</p>
							<p><span className='title'>Department: </span>{userInfo?.department?.name}</p>
						</div>
					</div>
				</div>

				<div className='information2'>
					<div className='Education-information'>
						<h6>Privileges</h6>
						{privileges?.map((item: any, i: any) => (
							<p key={i}><span className='title'>Role: </span>{item?.role}</p>
						))}
					</div>

					<div className="Next-of-kin">
						<h6>OThers</h6>
						<p><span className='title'>Date of Joining: </span>{moment(userInfo?.employee?.employment_date).format("DD-MM-YYYY")}</p>
						<p><span className='title'>Address: </span>{userInfo?.employee?.address}</p>
						<p><span className='title'>Email Address: </span>{userInfo?.employee?.email}</p>
						<p><span className='title'>Institution_Attended: </span>{userInfo?.employee?.institution_attended} </p>
						<p><span className='title'>Qualification: </span> {userInfo?.employee?.qualification}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
