import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { fireAlert } from "../../utils/Alert";
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { createLeave } from '../../features/Leave/leaveSlice';
import { reset } from '../../features/Announcement/announcemetSlice';
import { ModalHeader } from './ModalOptions';
import { BsCalendar4Week } from 'react-icons/bs';



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
			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}>Apply for Leave</li>
			</ul>

			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<ModalHeader setLgShow={setLgShow} icon={<BsCalendar4Week size={30} />} title={"Apply For Leave"} subtitle={"Fill the form to apply for leave"} />

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
						<div className='Modal-data-time mt-4'>
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
						<div className='btn-modal-container' style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button variant="contained" className="table-link-btn-new " onClick={handleLeave}>
								{isLoading ? <Spinner animation="border" size='sm' /> : "APPLY"}
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>


		</div>
	)
}

export default ApplyForLeave

