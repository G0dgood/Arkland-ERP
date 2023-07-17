import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { fireAlert } from "../../utils/Alert";
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { createLeave } from '../../features/Leave/leaveSlice';
import { reset } from '../../features/Announcement/announcemetSlice';



const ApplyForLeave = () => {
	const dispatch = useAppDispatch();
	const { isError, isLoading, message, isSuccess } = useAppSelector((state: any) => state.leave)

	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: "",
	})


	const handleLeave = () => {
		// @ts-ignore
		dispatch(createLeave(inputs));

	}



	useEffect(() => {
		if (isSuccess) {
			fireAlert("Successful", "Leave Created!", "success");
			setInputs({
				start_date: "",
				end_date: "",
				description: "",
				leave_type: "",
			})
			setLgShow(false);
			dispatch(reset());
		}
	}, [dispatch, message, isError, isSuccess])



	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	return (
		<div>
			<Button variant="contained" className="border px-3 p-1 add-experience"
				onClick={() => setLgShow(true)}>
				<i className="fa fa-plus"></i>&nbsp;	Apply for Leave
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header  >
					<span className='span-center-title'>Apply For Leave</span>
					<Button onClick={() => setLgShow(false)}>
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
							<option value="compassionate">COMPASSIONATE</option>
							<option value="casual">CASUAL</option>
							<option value="sick">SICK LEAVE</option>
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
							<Button variant="contained" className="add-experience" onClick={handleLeave}>
								{isLoading ? <Spinner animation="border" /> : "APPLY"}
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>


		</div>
	)
}

export default ApplyForLeave

