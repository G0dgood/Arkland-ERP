import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import $ from "jquery";
import { useAppDispatch, useAppSelector } from '../store/useStore';
import { createAttendance, reset } from '../features/Attendances/attendanceSlice';
import { fireAlert } from '../utils/Alert';

const ClockIn = () => {
	const dispatch = useAppDispatch();
	const { isLoading, isSuccess } = useAppSelector((state: any) => state.attendance)



	const [show, setShow] = useState<any>(false);

	useEffect(() => {
		if (isSuccess) {
			setShow(false)
			fireAlert("successful", "Clock in success", "success");
			dispatch(reset());
		}
	}, [dispatch, isSuccess])

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

	const handleclockIn = () => {
		dispatch(createAttendance())

	}

	return (
		<div>
			<Button
				className="add-experience"
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
					<span className="span-center-title"> Clock IN</span>
					<Button onClick={() => setShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div id='clock-in'>
						<div className="clock" >
							<div className="hour-hand"></div>
							<div className="minute-hand"></div>
							<div className="second-hand"></div>
						</div>
					</div>
					<div className='deleteKPIHandler' style={{ marginTop: "7rem" }}>
						<span className='deleteKPIHandler-mr' onClick={() => setShow(false)}>
							<Button className="table-link-active">
								Close </Button></span>
						<span ><Button className="table-link" onClick={handleclockIn} >
							{isLoading ? <Spinner animation="border" size='sm' /> : "clock in"}
						</Button></span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default ClockIn