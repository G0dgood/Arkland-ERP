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
	const { data, isError, isLoading, message, isSuccess } = useAppSelector((state: any) => state.attendance)

	console.log('dispatch', data, isError, isLoading, message, isSuccess)

	const [show, setShow] = useState<any>(false);
	// const [isLoading, setisLoading] = useState<any>(false);

	useEffect(() => {
		if (isError) {
			fireAlert("Clock in error", message, "error");
			dispatch(reset());
		}
		else if (isSuccess) {
			fireAlert("Clock in success", message, "success");
			dispatch(reset());
		}
	}, [isError, message, dispatch, isSuccess])

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
					<span className="span-center-title"> Clock IN</span>
					<Button style={{ color: "#fff" }} onClick={() => setShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
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
							{isLoading ? <Spinner animation="border" /> : "clock in"}
						</Button></span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default ClockIn