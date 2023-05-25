import React, { useState } from 'react'
import EmployeeNavTab from './EmployeeNavTab';
import AllEmployees from './AllEmployees';
import CreateRole from './CreateRole';

const EmployeeContainer = () => {
	const [isCheck, setIsCheck] = useState(false);
	const [data, setData] = useState(0);
	const [employee, setEmployee] = useState(0);
	const [showTitle, setShowTitle] = useState(false);

	return (
		<div  >
			<div>
				{showTitle ? "" : <EmployeeNavTab
					setIsCheck={setIsCheck}
					isCheck={isCheck}
					data={data}
					infodata={employee}
					text1={"All Employee"}
					text2={"Create Role"} />}

			</div>
			<div style={{ marginTop: "2rem" }}>
				{isCheck === false ? <AllEmployees setEmployee={setEmployee} setData={setData} /> : ""}
				{isCheck === true ? <CreateRole setShowTitle={setShowTitle} /> : ""}

			</div>
		</div>
	)
}

export default EmployeeContainer