import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../hooks/userDispatch';
import { createLeave, reset } from '../../features/Leave/leaveSlice';
import { fireAlert } from "../../utils/Alert";


const ApplyForLeave = (props: any) => {
	const dispatch = useAppDispatch();
	const [lgShow, setLgShow] = useState(false);
	// const { isError, isSuccess, isLoading, message } = useAppSelector((state: any) => state.leave);

	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: "",
	})



	// const title = "Successful";
	// const html = message;
	// const icon = "success";
	// const title1 = "Leave error";
	// const html1 = message;
	// const icon1 = "error";

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		// fireAlert(title, html, icon);
	// 		setTimeout(() => {
	// 			dispatch(reset());
	// 		}, 2000);
	// 		setLgShow(false)
	// 	} else if (isError) {
	// 		fireAlert(title1, html1, icon1);
	// 		setTimeout(() => {
	// 			dispatch(reset());
	// 		}, 10000);
	// 	}

	// }, [dispatch, html, title, icon, isSuccess, isError, html1]);

	const handelCreate = async () => {
		// @ts-ignore
		dispatch(createLeave(inputs));

	};


	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	return (
		<div>
			<Button variant="contained" className="Add-btn"
				onClick={() => setLgShow(true)}>
				Apply for Leave
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  >
					<span>

					</span>
					<span className='span-center-title'>Apply For Leave</span>
					<Button style={{ color: '#fff' }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<h6>Name</h6>
						<select id="Modal-textarea-input-sub"
							value={inputs.leave_type}
							onChange={(e) => handleOnChange("leave_type", e.target.value)}>
							<option value=" ">Select Name...</option>
							<option value="Paid Leave">Paid Leave</option>
							<option value="Sick Leave">Sick Leave</option>
							<option value="casual">Casual</option>
						</select >
						<div className='Modal-data-time'>
						</div>
						<div className='Modal-data-time'>
							<div className='Modal-two-input'>
								<h6>Start Date</h6>
								<input id='Modal-textarea-input-sub' placeholder='Select start date of leave' type={'date'}
									value={inputs.start_date}
									onChange={(e) => handleOnChange("start_date", e.target.value)} />
							</div>
							<div className='div-space' />
							<div className='Modal-two-input'>
								<h6>End Date</h6>
								<input id='Modal-textarea-input-sub' placeholder='Select end date of leave' type={'date'}
									value={inputs.end_date}
									onChange={(e) => handleOnChange("end_date", e.target.value)} />
							</div>
						</div>
						<div className='Modal-textarea-middle'>
							<h6>Description</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Enter detailed reason for leave'
								value={inputs.description}
								onChange={(e) => handleOnChange("description", e.target.value)} />
						</div>
						<div className='btn-modal-container'>
							<Button variant="contained" className="Add-btn-modal" onClick={handelCreate}>
								{/* {isLoading ? <Spinner animation="border" /> : "APPLY"} */}
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default ApplyForLeave

