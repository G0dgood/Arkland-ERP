import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { fireAlert } from '../../../utils/Alert';
import { deactivateWarning, reset } from '../../../features/Employee/employeeSlice';

const DeactivateExpiredWarnings = () => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setDeleteShow] = useState(false);
	const { deactivateWarningisLoading, deactivateWarningisSuccess } = useAppSelector((state: any) => state.employee)

	useEffect(() => {
		if (deactivateWarningisSuccess) {
			fireAlert("Successful", "Expired Warnings Deactivated", "success");
			setDeleteShow(false)
			dispatch(reset());
		}
	}, [deactivateWarningisSuccess, dispatch, navigate])

	const handleEmployeeDeletion = () => {
		dispatch(deactivateWarning());
	}

	return (
		<div>
			<Button variant="contained" className="add-experience"
				onClick={() => setDeleteShow(true)}>
				Update Warning
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  >
					<span className="span-center-title">Deactivate Expired Warnings </span>
					<Button onClick={() => setDeleteShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to Deactivate Expired Warnings  ?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setDeleteShow(false)}>
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
