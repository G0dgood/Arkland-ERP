import { useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';
import Allowances from '../Allowances/Allowances';
import Deductions from '../Deductions/Deductions';


const PayParameters = () => {

	const [activeTab, setActiveTab] = useState(1)

	return (
		<div id="reports">
			<div className='roll-title'>
				<h5 className="page-title">Pay Parameters</h5>
				<div className='roll-icon'>
					<IoArrowBackSharp size={22} />
				</div>
			</div>
			<ul className="nav-tabs">
				<li className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>Allowances</li>
				<li className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>Deductions</li>
			</ul>
			<div className="tab-panel">
				{activeTab === 1 && (
					<Allowances />
				)}
				{activeTab === 2 && (
					<Deductions />
				)}

			</div>
		</div>
	)
}

export default PayParameters
