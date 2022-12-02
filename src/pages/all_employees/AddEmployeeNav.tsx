import React, { useState } from 'react'

const AddEmployeeNav = ({ active }: any) => {


	return (
		<div className='addemployee-essential-tab'>
			<div className='essential-tab'>
				<div className='vl'>
					<div className={active === 1 ? 'vl-circles-active' : 'vl-circles'}></div>
				</div>
				<div className='vl-circles-title'>ESSENTIAL</div>
			</div>
			<div className='essential-tab'>
				<div className='vl'>
					<div className={active === 2 ? 'vl-circles-active' : 'vl-circles'}> </div>
					<div className='vl-hline'> </div>
				</div>
				<div className='vl-circles-title'>FINANCE</div>
			</div>
			<div className='essential-tab'>
				<div className='vl'>
					<div className={active === 3 ? 'vl-circles-active' : 'vl-circles'}> </div>
					<div className='vl-hline'> </div>
				</div>
				<div className='vl-circles-title'>REFRENCE</div>
			</div>
			<div className='essential-tab'>
				<div className='vl'>
					<div className={active === 4 ? 'vl-circles-active' : 'vl-circles'}> </div>
					<div className='vl-hline'> </div>
				</div>
				<div className='vl-circles-title'>EMPLOYMENT</div>
			</div>
			<div className='essential-tab'>
				<div className='vl'>
					<div className={active === 5 ? 'vl-circles-active' : 'vl-circles'}> </div>
				</div>
				<div className='vl-circles-title'>ADDRESS</div>
			</div>
		</div>
	)
}

export default AddEmployeeNav
