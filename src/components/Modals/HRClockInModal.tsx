import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { fireAlert } from '../../utils/Alert';
import { hrcreateAttendance, reset } from '../../features/Attendances/attendanceSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import $ from "jquery";
import { allEmployee } from '../../features/Employee/employeeSlice';

import SelectInput from '../SelectInput';

const HRClockInModal = () => {
	const dispatch = useAppDispatch();
	const { hrisError, hrisLoading, hrmessage, hrisSuccess } = useAppSelector((state: any) => state.attendance)
	const { data: employee, isLoading } = useAppSelector((state: any) => state.employee)

	useEffect(() => {
		// @ts-ignore
		dispatch(allEmployee());
	}, [dispatch]);
	const [show, setShow] = useState<any>(false);


	useEffect(() => {
		if (hrisError) {
			fireAlert("Clock in error", hrmessage, "error");
			dispatch(reset());
		}
		else if (hrisSuccess) {
			fireAlert("Clock in success", hrmessage, "success");
			dispatch(reset());
		}
	}, [hrisError, hrmessage, dispatch, hrisSuccess])

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



	const availableEmployees = [] as any;

	employee &&
		employee.forEach((employee: any) =>
			availableEmployees.push({
				value: employee?.id,
				label: employee?.full_name,
			})
		);



	const [inputs, setInputs] = useState<any>({
		isEmployee: "",
	})



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
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setShow(true)}
			>
				{false ? <Spinner animation="border" /> : " Clock in"}
			</Button>
			<Modal
				show={show}
				// onHide={handle Close}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
				centered
			>
				<Modal.Header>
					<span>{/*  */}</span>
					<span className="span-center-title">HR Clock IN</span>
					<Button style={{ color: "#fff" }} onClick={() => setShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='mt-2 mb-4'>
						<SelectInput
							isDisabled={isLoading}
							isLoading={isLoading}
							options={availableEmployees}
							value={inputs.isEmployee}
							onChange={(e: any) => handleOnChange("isEmployee", e)} />
					</div>
					<div className="clock" style={{ marginBottom: "2rem" }}>
						<div className="hour-hand"></div>
						<div className="minute-hand"></div>
						<div className="second-hand"></div>
					</div>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr' onClick={() => setShow(false)}>
							<Button className="table-link-active">
								Close </Button></span>
						<span ><Button className="table-link" onClick={handleclockIn} >
							{hrisLoading ? <Spinner animation="border" /> : "clock in"}
						</Button></span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default HRClockInModal