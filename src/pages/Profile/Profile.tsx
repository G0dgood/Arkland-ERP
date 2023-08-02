/* eslint-disable jsx-a11y/anchor-is-valid */
import { FiChevronLeft } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment';
import LogoutOption from '../../components/LogoutOption';
import DataService from '../../utils/dataService';
import { useState } from 'react';



const dataService = new DataService()
const Profile = () => {
	const location = useLocation()
	const [open, setOpen] = useState<any>(location.state.open);


	// @ts-ignore
	const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	const { privileges } = userInfo


	return (
		<div className="profile-body">
			<div  >
				<Link to='/home'>
					{/* <img className="demo-bg" src={logo} alt="" />   */}
				</Link>
				<div className="profile-body-container-sup">
					<span>
						<Link to='/'>
							<FiChevronLeft size={30} />
						</Link>

					</span>
					<span><LogoutOption open={open} setOpen={setOpen} /></span>


				</div>
			</div>

			<div className="container rounded bg-white mt-5 mb-5">
				<div className="row">
					<div className="col-md-3 border-right">
						<div className="d-flex flex-column align-items-center text-center p-3 py-5">
							{/* eslint-disable-next-line jsx-a11y/alt-text */}
							<img className="rounded-circle " width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">{userInfo?.employee?.full_name}</span>
							<span className="text-black-50">{userInfo?.employee?.email}</span>
							<span>
								<span className='profile-image-name'>
									<p className='profile-image-name-sub1' style={{ marginBottom: "0px" }}>{userInfo?.full_name}</p>
									<p> <BsDot size={20} color={"green"} /> {userInfo?.role?.status}</p>
								</span>
								<p>
									<span className='profile-image-name-sub2'>{userInfo?.department?.name}
									</span> </p>
							</span>
						</div>
					</div>
					<div className="col-md-5 border-right">
						<div className="p-3 py-5">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h4 className="text-right">Profile  </h4>
							</div>

							<div className="row mt-3">
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
							<div className="row mt-3">
								<div className='General-Information '>

									<div className="d-flex justify-content-between align-items-center mb-3">
										<h4 className="text-right">Privileges</h4>
									</div>
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
					<div className="col-md-4">
						<div className="p-3 py-5 mb-5">
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
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Profile
