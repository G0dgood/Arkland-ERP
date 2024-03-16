import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { deactivateWarning, reset } from '../../features/Employee/employeeSlice';
import { ModalHeader } from '../../components/Modals/ModalOptions';
import { IoMdWarning } from 'react-icons/io';

const DeactivateExpiredWarnings = () => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [setShow, setLgShow] = useState(false);
	const { deactivateWarningisLoading, deactivateWarningisSuccess } = useAppSelector((state: any) => state.employee)

	useEffect(() => {
		if (deactivateWarningisSuccess) {
			fireAlert("Successful", "Expired Warnings Deactivated", "success");
			setLgShow(false)
			dispatch(reset());
		}
	}, [deactivateWarningisSuccess, dispatch, navigate])

	const handleEmployeeDeletion = () => {
		dispatch(deactivateWarning());
	}

	return (
		<div>
			<li className={"active"} onClick={() => setLgShow(true)}>	Update Warning</li>
			<Modal
				size="lg"
				show={setShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<IoMdWarning size={30} />} title={"Upload Images"} subtitle={"You can add images"} />
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to Deactivate Expired Warnings  ?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setLgShow(false)}>
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleEmployeeDeletion} >
								{deactivateWarningisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeactivateExpiredWarnings
