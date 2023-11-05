import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { deleteEmployees, reset } from '../../features/Employee/employeeSlice';
import { useNavigate } from 'react-router-dom';
import { ImBin } from 'react-icons/im';
import { ModalHeader } from './ModalOptions';
import { BsFileEarmarkText } from 'react-icons/bs';

const DeleteEmployeeModal = ({ id }: any) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setLgShow] = useState(false);
	const { deleteEmpisLoading, deleteEmpmessage, deleteEmpisSuccess } = useAppSelector((state: any) => state.employee)


	useEffect(() => {
		if (deleteEmpisSuccess) {
			fireAlert("Successful", "Employee Deleted Successfully", "success");
			setLgShow(false)
			navigate(-1)
			dispatch(reset());
		}
	}, [deleteEmpisSuccess, deleteEmpmessage, dispatch, navigate])

	const handleEmployeeDeletion = () => {
		// @ts-ignore
		dispatch(deleteEmployees(id));
	}

	return (
		<div>
			<Button onClick={() => setLgShow(true)}> <ImBin size={25} color='#bf8412' /></Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<BsFileEarmarkText size={30} />} title={"Delete Employee"} subtitle={"Delete Employee Record"} />
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete employee data?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setLgShow(false)}>
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleEmployeeDeletion} >
								{deleteEmpisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteEmployeeModal
