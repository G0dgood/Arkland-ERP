
import { MdOutlineClose } from 'react-icons/md'
import { BsChatLeftText } from 'react-icons/bs'
import { Checkbox } from '@material-ui/core'
import { FiTrash2 } from 'react-icons/fi'
import { MainSearch } from './TableOptions'

const TodoShowAll = ({ showDrawer, setShowDrawer }: any) => {


	return (
		<div className={showDrawer ? "Drawer" : "Drawer1"}>
			<header className="ChatProgressView-header"  >
				<div>
					<span className="app-chat--icon">
						<BsChatLeftText />
					</span>
					<span className="in-progresss">
						Todos
					</span>

				</div>
				<div className="ChatProgressView-close" onClick={() => setShowDrawer(false)}>
					<MdOutlineClose
						size={25}
						style={{ color: "white", backgroundColor: "" }}
						className="ChatProgressView-close-icon"
					/>
				</div>
			</header>
			<div className="container-todos">
				<ul className="responsive-table">
					<li className="table-header">
						<div className="col col-1">Todos</div>
						<MainSearch placeholder={'Search...          Todos'} />
					</li>

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
								<div>Sort Design screens</div>
								<div className="main-todo-input-time">Today - 11:30 AM</div>
							</div>
						</div>
						<div className="FiTrash2">
							<FiTrash2 size={25} />
						</div>
					</div>

				</ul>

			</div>
		</div>
	)
}

export default TodoShowAll
