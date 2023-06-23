import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { reset, responseWarning } from '../../../features/Employee/employeeSlice';
import { fireAlert } from '../../../utils/Alert';
import { useNavigate } from 'react-router-dom';



const RespondToWarning = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { responseisLoading, responseisSuccess } = useAppSelector((state: any) => state.employee)
	const navigate = useNavigate();

	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		response: "",
	})

	// console.log('response', responseisLoading)

	const input = { inputs, id }
	const handlecreate = () => {

		dispatch(responseWarning(input));
	}

	const html = "Respond Warning Updated!";
	const icon = "success";



	useEffect(() => {
		if (responseisSuccess) {
			fireAlert("success", html, icon);
			setInputs({ response: "" })
			navigate(-1)
			dispatch(reset());
			setLgShow(false)
		}
	}, [responseisSuccess, dispatch, html, navigate])



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
				Response Warning
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header  >

					<span>
					</span>
					<span className='span-center-title'>Respond Warning </span>
					<Button style={{ color: '#fff' }} onClick={() => { setLgShow(false) }}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<div className='Modal-textarea-middle'>
							<h6>Respond Warning</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Enter response'
								value={inputs?.response}
								onChange={(e) => handleOnChange("response", e.target.value)} />
						</div>
						<div className='btn-modal-container'>

							<Button variant="contained" className="Add-btn-modal" onClick={handlecreate}  >
								{responseisLoading ? <Spinner animation="border" /> : "Respond"}
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default RespondToWarning





