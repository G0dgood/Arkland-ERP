import { useState } from 'react';
import SpecialAllowances from './SpecialAllowances/SpecialAllowances';
import { SearchComponent } from '../../../components/TableOptions';
import DailyTransportAllowance from './DailyTransportAllowance /DailyTransportAllowance';
import SalaryAdvance from './SalaryAdvance /SalaryAdvance';
import PaySuspension from './PaySuspension/PaySuspension';
import Overtime from './Overtime /Overtime';
import FixedOvertime from './FixedOvertime /FixedOvertime';
import SalaryArrears from './SalaryArrears/SalaryArrears';
import Refund from './Refund/Refund';
import EndOfYearBonus from './EndOfYearBonus /EndOfYearBonus';
import LeaveArrears from './LeaveArrears /LeaveArrears';
import SponsorshipAllowance from './SponsorshipAllowance/SponsorshipAllowance';
import Bonus from './Bonus /Bonus';

const Allowances = () => {

	const [selectedOption, setSelectedOption] = useState<any>({
		"value": 1,
		"label": " Special Allowances"
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
			<SearchComponent parameter={true} addemployee={false} placeholder={"Pay Parameters"} handleParameter={handleParameter} setSelectedOption={setSelectedOption} CSV={true} />
			{selectedOption.value === 1 && <SpecialAllowances parameter={parameter} />}
			{selectedOption.value === 2 && <DailyTransportAllowance parameter={parameter} />}
			{selectedOption.value === 3 && <SalaryAdvance parameter={parameter} />}
			{selectedOption.value === 4 && <PaySuspension parameter={parameter} />}
			{selectedOption.value === 5 && <Overtime parameter={parameter} />}
			{selectedOption.value === 6 && <FixedOvertime parameter={parameter} />}
			{selectedOption.value === 7 && <SalaryArrears parameter={parameter} />}
			{selectedOption.value === 8 && <Refund parameter={parameter} />}
			{selectedOption.value === 9 && <EndOfYearBonus parameter={parameter} />}
			{selectedOption.value === 10 && <Bonus parameter={parameter} />}
			{selectedOption.value === 11 && <SponsorshipAllowance parameter={parameter} />}
			{selectedOption.value === 12 && <LeaveArrears parameter={parameter} />}
		</div>
	)
}

export default Allowances
