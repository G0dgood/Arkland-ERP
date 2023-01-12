import React from 'react'
import Header from './Header'
import { Checkbox } from '@material-ui/core'
import { FiTrash2 } from 'react-icons/fi'

const Drawer = ({ showDrawer }: any) => {

	console.log('true', showDrawer)


	return (
		<div className={true ? "Drawer" : "Drawer1"}>
			<Header />
			<div className="Drawer-main">
				<div className="container-Drawer">
					<h2>Responsive Tables Using LI <small>Triggers on 767px</small></h2>
					<ul className="responsive-table">
						<li className="table-header">
							<div className="col col-1">Job Id</div>
							<div className="col col-2">Customer Name</div>
							<div className="col col-3">Amount Due</div>
							<div className="col col-4">Payment Status</div>
						</li>
						{/* <li className="table-row">
							<div className="col col-1" data-label="Job Id">42235</div>
							<div className="col col-2" data-label="Customer Name">John Doe</div>
							<div className="col col-3" data-label="Amount">$350</div>
							<div className="col col-4" data-label="Payment Status">Pending</div>
						</li> */}
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
						{/* <li className="table-row">
							<div className="col col-1" data-label="Job Id">42442</div>
							<div className="col col-2" data-label="Customer Name">Jennifer Smith</div>
							<div className="col col-3" data-label="Amount">$220</div>
							<div className="col col-4" data-label="Payment Status">Pending</div>
						</li>
						<li className="table-row">
							<div className="col col-1" data-label="Job Id">42257</div>
							<div className="col col-2" data-label="Customer Name">John Smith</div>
							<div className="col col-3" data-label="Amount">$341</div>
							<div className="col col-4" data-label="Payment Status">Pending</div>
						</li>
						<li className="table-row">
							<div className="col col-1" data-label="Job Id">42311</div>
							<div className="col col-2" data-label="Customer Name">John Carpenter</div>
							<div className="col col-3" data-label="Amount">$115</div>
							<div className="col col-4" data-label="Payment Status">Pending</div>
						</li> */}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Drawer
