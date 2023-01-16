import { BsFillPinAngleFill, BsThreeDots } from 'react-icons/bs'
import { Button } from '@material-ui/core'

const AdminAnnouncement = () => {
	return (
		<div className="admin-main-div-col-2-sub">
			<div className="Announcement-sub-1">
				<div className="Announcement-sub-text">
					<span className="sub-text-contained">
						<h4>Announcement</h4>
					</span>
					<span >
						{/* <p>Today, 21 Jun 2022</p> */}
					</span>
				</div>
				<div>
					<p>Today, 21 Jun 2022</p>
					{/* <CreateAnnouncementModal /> */}
				</div>
			</div>
			<div className="Admin-Announcement-container">
				<div className="Announcement-sub-2">
					<div
						className="main-todo-Event"
						style={{ borderRadius: "4px" }}
					>
						<div className="main-todo-container">
							<div className="main-todo-note">
								<div>Outing schedule for every departement</div>
								<div className="main-todo-note-minutes">5 Minutes ago</div>
							</div>
						</div>
						<div className="FiTrash2">
							<span className="BsFillPinAngleFill">
								{" "}
								<BsFillPinAngleFill size={20} />
							</span>
							<span>
								<BsThreeDots size={25} />
							</span>
						</div>
					</div>
				</div>
				<div className="Announcement-sub-2">
					<div
						className="main-todo-Event"
						style={{ borderRadius: "4px" }}
					>
						<div className="main-todo-container">
							<div className="main-todo-note">
								<div>Outing schedule for every departement</div>
								<div className="main-todo-note-minutes">5 Minutes ago</div>
							</div>
						</div>
						<div className="FiTrash2">
							<span className="BsFillPinAngleFill">
								{" "}
								<BsFillPinAngleFill size={20} />
							</span>
							<span>
								<BsThreeDots size={25} />
							</span>
						</div>
					</div>
				</div>
				<div className="Announcement-sub-2">
					<div
						className="main-todo-Event"
						style={{ borderRadius: "4px" }}
					>
						<div className="main-todo-container">
							<div className="main-todo-note">
								<div>Outing schedule for every departement</div>
								<div className="main-todo-note-minutes">5 Minutes ago</div>
							</div>
						</div>
						<div className="FiTrash2">
							<span className="BsFillPinAngleFill">
								{" "}
								<BsFillPinAngleFill size={20} />
							</span>
							<span>
								<BsThreeDots size={25} />
							</span>
						</div>
					</div>
				</div>



				<div className="Announcement-sub-2">
					<div
						className="main-todo-Event"
						style={{ borderRadius: "4px" }}
					>
						<div className="main-todo-container">
							<div className="main-todo-note">
								<div>Outing schedule for every departement</div>
								<div className="main-todo-note-minutes">5 Minutes ago</div>
							</div>
						</div>
						<div className="FiTrash2">
							<span className="BsFillPinAngleFill">
								{" "}
								<BsFillPinAngleFill size={20} />
							</span>
							<span>
								<BsThreeDots size={25} />
							</span>
						</div>
					</div>
				</div>
			</div>
			<Button variant="outlined" className="show-btn-schedule"  >
				See All Announcement
			</Button>
		</div>
	)
}

export default AdminAnnouncement