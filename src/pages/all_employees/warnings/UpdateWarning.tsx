import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { reset, updateWarning } from '../../../features/Employee/employeeSlice';
import { fireAlert } from '../../../utils/Alert';
import { useNavigate } from 'react-router-dom';



const UpdateWarning = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { updateWarningisLoading, updateWarningisSuccess } = useAppSelector((state: any) => state.employee)
	const navigate = useNavigate();

	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		decision: "",
	})

	const handlecreate = () => {
		const input = { inputs, id }
		// @ts-ignore
		dispatch(updateWarning(input));
	}

	const html = "Warning Update!";
	const icon = "success";



	useEffect(() => {
		if (updateWarningisSuccess) {
			fireAlert("success", html, icon);
			setInputs({ decision: "" })
			navigate(-1)
			dispatch(reset());
			setLgShow(false)
		}
	}, [updateWarningisSuccess, dispatch, html, navigate])



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
				Update Warning
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header  >

					<span>
					</span>
					<span className='span-center-title'>Update Warning </span>
					<Button style={{ color: '#fff' }} onClick={() => { setLgShow(false) }}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<div className='Modal-textarea-middle'>
							<h6>Decision</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Enter decision'
								value={inputs?.decision}
								onChange={(e) => handleOnChange("decision", e.target.value)} />
						</div>
						<div className='btn-modal-container'>

							<Button variant="contained" className="Add-btn-modal" onClick={handlecreate}  >
								{updateWarningisLoading ? <Spinner animation="border" /> : "Update"}
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default UpdateWarning





