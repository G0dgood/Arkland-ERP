

import { useState } from 'react';
import { SearchComponent } from '../../../components/TableOptions';
import SpecialDeductions from './SpecialDeductions/SpecialDeductions';
import SalaryAdvance from './SalaryAdvance/SalaryAdvance';
import PaySuspension from './PaySuspension/PaySuspension';
import Penalty from './Penalty/Penalty';
import RefundToBank from './RefundToBank/RefundToBank';
import Absenteeism from './Absenteeism/Absenteeism';


const Deductions = () => {

	const [selectedOption, setSelectedOption] = useState<any>({
		"value": 1,
		"label": "Special Deductions"
	});
	const [parameter, setParameter] = useState<any>(false);

	const handleParameter = () => {
		if (!parameter) {
			setParameter(true)
		} else {
			setParameter(!parameter)
		}
	}



	return (
		<div className='half-background'>
			<SearchComponent parameter={false} addemployee={false} placeholder={"Pay Parameters"} handleParameter={handleParameter} setSelectedOption={setSelectedOption} parameterdeduct={true} />
			{selectedOption.value === 1 && <SpecialDeductions parameter={parameter} />}
			{selectedOption.value === 2 && <SalaryAdvance parameter={parameter} />}
			{selectedOption.value === 3 && <PaySuspension parameter={parameter} />}
			{selectedOption.value === 4 && <Absenteeism parameter={parameter} />}
			{selectedOption.value === 5 && <Penalty parameter={parameter} />}
			{selectedOption.value === 6 && <RefundToBank parameter={parameter} />}

		</div>
	)
}

export default Deductions

