import React from 'react'
import AddTodo from "../../components/Modals/AddTodo";
import Checkbox from "@material-ui/core/Checkbox";
import { FiTrash2 } from 'react-icons/fi';
import { Button } from "@mui/material";


const Todos = ({ showDrawer, setShowDrawer }: any) => {

	const handleShow = () => {
		if (!showDrawer) {
			setShowDrawer(true);
		} else {
			setShowDrawer(!showDrawer);
		}
	};
	return (
		<div className="main-div-col-2">
			<div className="main-todo-1">
				<div className="main-todo-title">
					<h4>To Do</h4>

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
			{/* className="show-btn"  */}
			<div className="main-todo-2" >
				{/* id="burger"  */}
				<Button variant="outlined" className="show-btn" onClick={handleShow}>
					Show All
				</Button>

				<AddTodo />
			</div>
		</div>
	)
}

export default Todos