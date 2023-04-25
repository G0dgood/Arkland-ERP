import React, { useRef } from 'react'

const EmployeeNavTab = ({ isCheck, setIsCheck, infodata, text1, text2 }: any) => {

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
				<label id="tab" htmlFor="radio-1">{text1}
					<span id="notification">{infodata === undefined ? 0 : infodata}</span>
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
					{text2}</label>
				<span id="glider">
				</span>
			</div>
		</div>
	)
}

export default EmployeeNavTab
