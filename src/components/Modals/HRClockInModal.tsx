import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { fireAlert } from '../../utils/Alert';
import { hrcreateAttendance, reset } from '../../features/Attendances/attendanceSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import $ from "jquery";

import SelectInput from '../SelectInput';
import createHttpService from '../HttpService';
import { ModalHeader } from './ModalOptions';
import { BsClock } from 'react-icons/bs';

const HRClockInModal = () => {
	const dispatch = useAppDispatch();
	const { hrisLoading, hrisSuccess } = useAppSelector((state: any) => state.attendance)



	const [show, setLgShow] = useState<any>(false);
	const [employees, setEmployees] = useState<any>("");
	const [isLoading, setisLoading] = useState<any>(false);
	const [inputs, setInputs] = useState<any>({
		isEmployee: "",
	})


	useEffect(() => {
		if (hrisSuccess) {
			fireAlert("Clock in success", "successful", "success");
			dispatch(reset());
		}
	}, [dispatch, hrisSuccess])

	function updateClock(hours: any, minutes: any, seconds: any) {

		var hourDegrees = hours * 30;
		var minuteDegrees = minutes * 6;
		var secondDegrees = seconds * 6;

		$('.hour-hand').css({
			'transform': `rotate(${hourDegrees}deg)`
		});

		$('.minute-hand').css({
			'transform': `rotate(${minuteDegrees}deg)`
		});

		$('.second-hand').css({
			'transform': `rotate(${secondDegrees}deg)`
		});

	}

	setClockWithCurrentTime();

	function setClockWithCurrentTime() {
		var date = new Date();

		var hours = ((date.getHours() + 11) % 12 + 1);
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();

		updateClock(hours, minutes, seconds);
	}

	setInterval(setClockWithCurrentTime, 1000);

	const getData = async () => {
		const HttpService = createHttpService();
		setisLoading(true)
		try {
			const employees = "hr/employees"
			const employee: any = await HttpService.get(employees)
			setEmployees(employee?.data?.data)
			setisLoading(false)

		} catch (error) {
			setisLoading(false)
		}
	}

	// const availableEmployees = [] as any;

	// employees &&
	// 	employees.forEach((employee: any) =>
	// 		availableEmployees.push({
	// 			value: employee?.id,
	// 			label: employee?.full_name,
	// 		})
	// 	);

	const availableEmployees = employees?.data?.map((employees: any) => ({
		value: employees.id,
		label: employees.full_name,
	})) || [];





	const id = inputs?.isEmployee?.value
	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	const handleclockIn = () => {
		// @ts-ignore
		dispatch(hrcreateAttendance(id))
	}
	return (
		<div>
			<li className={"active"} onClick={() => { setLgShow(true); getData() }}>  Clock in</li>
			<Modal
				show={show}
				// onHide={handle Close}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
				centered
			>

				<ModalHeader setLgShow={setLgShow} icon={<BsClock size={30} />} title={"HR Clock IN"} subtitle={"HR Clock IN Record"} />
				<Modal.Body>
					<div className='mt-2 mb-4'>
						<SelectInput
							isDisabled={isLoading}
							isLoading={isLoading}
							options={availableEmployees}
							value={inputs.isEmployee}
							onChange={(e: any) => handleOnChange("isEmployee", e)} />
					</div >
					<div className='isEmployee-hour-hand'>
						<div id='clock-in'>
							<div className="clock"  >
								<div className="hour-hand"></div>
								<div className="minute-hand"></div>
								<div className="second-hand"></div>
							</div>
						</div>
					</div>
					<div className='deleteKPIHandler' style={{ marginTop: "7rem" }}>
						<span className='deleteKPIHandler-mr' onClick={() => setLgShow(false)}>
							<Button className="table-link-active">
								Close </Button></span>
						<span ><Button className="table-link" onClick={handleclockIn} >
							{hrisLoading ? <Spinner animation="border" size='sm' /> : "clock in"}
						</Button></span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default HRClockInModal