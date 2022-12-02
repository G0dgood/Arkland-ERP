import React, { useState } from 'react'

const AddEmployeeNav = ({ active }: any) => {


	return (
		<div className="Stepper">
			<div className="Stepper__step">
				<div className="Stepper__indicator">
					<span className={active === 1 ? 'Stepper__info__active' : 'Stepper__info'}  > </span>
				</div>
				<div className="Stepper__label">ESSENTIAL</div>
				<div className="Stepper__panel">
					test
				</div>
			</div>
			<div className="Stepper__step">
				<div className="Stepper__indicator">
					<span className={active === 2 ? 'Stepper__info__active' : 'Stepper__info'}> </span>
				</div>
				<div className="Stepper__label">FINANCE</div>
				<div className="Stepper__panel">
					test
				</div>
			</div>
			<div className="Stepper__step">
				<div className="Stepper__indicator">
					<span className={active === 3 ? 'Stepper__info__active' : 'Stepper__info'}></span>
				</div>
				<div className="Stepper__label">REFRENCE</div>
				<div className="Stepper__panel">
					test
				</div>
			</div>
			<div className="Stepper__step">
				<div className="Stepper__indicator">
					<span className={active === 4 ? 'Stepper__info__active' : 'Stepper__info'}></span>
				</div>
				<div className="Stepper__label">EMPLOYMENT</div>
				<div className="Stepper__panel">
					test
				</div>
			</div>
			<div className="Stepper__step">
				<div className="Stepper__indicator">
					<span className={active === 5 ? 'Stepper__info__active' : 'Stepper__info'}></span>
				</div>
				<div className="Stepper__label">ADDRESS</div>
				<div className="Stepper__panel">
					test
				</div>
			</div>
		</div>

	)
}

export default AddEmployeeNav
