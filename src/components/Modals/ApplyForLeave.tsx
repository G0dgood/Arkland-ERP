import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { fireAlert } from "../../utils/Alert";
import Cookies from 'js-cookie';
import LeaveApplicationEligibiltyModal from './LeaveApplicationEligibiltyModal';


const ApplyForLeave = ({ setReload, daysLeft, showLogout, setShowLogout, diffDays }: any) => {
	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: "",
	})

	const token = Cookies.get("token");
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);


	const handleLeave = () => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/leaves`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(inputs),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data?.success === false) {
					setMessage(data?.message)
					setisError(true)
				} else {
					setisSuccess(true)
					setReload(true)
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});
	}


	const title = "Successful";
	const html = "Leave Created!";
	const icon = "success";
	const title1 = "Leave error";
	const html1 = message;
	const icon1 = "error";


	useEffect(() => {
		if (isSuccess) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisSuccess(false)
				setMessage("")
			}, 5000);
			setLgShow(false)
		} else if (isError) {
			fireAlert(title1, html1, icon1);
			setTimeout(() => {
				setisError(false)
				setMessage("")
				setInputs({
					start_date: "",
					end_date: "",
					description: "",
					leave_type: "",
				})
			}, 5000);
		}
	}, [html, html1, isError, isSuccess])



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

			{diffDays > 365 ? (
				<Modal
					size="lg"
					show={lgShow}
					aria-labelledby="contained-modal-title-vcenter"
					centered>
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
								<option value="annual">ANNUAL</option>
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
								<Button variant="contained" className="Add-btn-modal" onClick={handleLeave}>
									{isLoading ? <Spinner animation="border" /> : "APPLY"}
								</Button>
							</div>
						</div>

					</Modal.Body>
				</Modal>)
				: (
					<LeaveApplicationEligibiltyModal daysLeft={daysLeft} lgShow={lgShow} setLgShow={setLgShow} />
				)}

		</div>
	)
}

export default ApplyForLeave

