import React, { useRef } from 'react'



const KPINavTab = ({ isCheck, setIsCheck, data, }: any) => {

	const checkbox = useRef();

	const handleClick = () => {
		// @ts-ignore
		if (checkbox.current.checked && !isCheck) {
			setIsCheck(true);
		} else {
			setIsCheck(false);
		}
	}

	return (
		<div id="containerNav">
			<div id="tabs">
				<input
					type="radio"
					id="radio-1"
					name="tabs"
					defaultChecked={isCheck}
					// @ts-ignore
					ref={checkbox}
					onClick={handleClick}
				/>
				<label id="tab" htmlFor="radio-1">My Kpi Assessment
					<span id="notification">{data}</span>
				</label>
				<input
					type="radio"
					id="radio-2"
					name="tabs"
					// @ts-ignore
					ref={checkbox}
					onClick={handleClick}
				/>
				<label id="tab" htmlFor="radio-2">
					KPI Assessment</label>
				<span id="glider">
				</span>
			</div>
		</div>
	)
}

export default KPINavTab