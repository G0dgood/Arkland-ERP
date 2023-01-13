import Checkbox from "@material-ui/core/Checkbox";
import { FiTrash2 } from 'react-icons/fi';
import { Button } from "@mui/material";

const Schedule = () => {
	return (
		<div className="main-div-col-2">
			<div className="main-todo-1">
				<div className="main-todo-title">
					<h4>Upcoming Schedule</h4> <span>Today, 21 Jun 2022</span>
				</div>

				{/* Checkbox */}
				<div className="main-todo-Event" style={{ borderRadius: "4px" }}>
					<div className="main-todo-container">
						<div className="main-todo-input">
							{" "}
							<Checkbox />
						</div>
						<div>
							<div>Call</div>
							<div className="main-todo-input-time">Today - 11:30 AM</div>
						</div>
					</div>
					<div className="FiTrash2">
						<FiTrash2 size={25} />
					</div>
				</div>
				<div className="main-todo-Event" style={{ borderRadius: "4px" }}>
					<div className="main-todo-container">
						<div className="main-todo-input">
							{" "}
							<Checkbox />
						</div>
						<div>
							<div>Short meeting with IT Dept</div>
							<div>Today - 09:30 AM</div>
						</div>
					</div>
					<div className="FiTrash2">
						<FiTrash2 size={25} />
					</div>
				</div>
				<div className="main-todo-Event" style={{ borderRadius: "4px" }}>
					<div className="main-todo-container">
						<div className="main-todo-input">
							{" "}
							<Checkbox />
						</div>
						<div>
							<div>Sort Design screens</div>
							<div className="main-todo-input-time">Today - 11:30 AM</div>
						</div>
					</div>
					<div className="FiTrash2">
						<FiTrash2 size={25} />
					</div>
				</div>
				<div className="main-todo-Event" style={{ borderRadius: "4px" }}>
					<div className="main-todo-container">
						<div className="main-todo-input">
							{" "}
							<Checkbox />
						</div>
						<div>
							<div>Follow up on design</div>
							<div className="main-todo-input-time">Today - 11:30 AM</div>
						</div>
					</div>
					<div className="FiTrash2">
						<FiTrash2 size={25} />
					</div>
				</div>
				<div className="main-todo-Event" style={{ borderRadius: "4px" }}>
					<div className="main-todo-container">
						<div className="main-todo-input">
							{" "}
							<Checkbox />
						</div>
						<div>
							<div>Call</div>
							<div className="main-todo-input-time">Today - 11:30 AM</div>
						</div>
					</div>
					<div className="FiTrash2">
						<FiTrash2 size={25} />
					</div>
				</div>
			</div>
			<Button variant="outlined" className="show-btn-schedule"  >
				Create a New Schedule
			</Button>
		</div>
	)
}

export default Schedule
