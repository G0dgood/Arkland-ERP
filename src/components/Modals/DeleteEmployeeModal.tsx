import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { deleteEmployees, reset } from '../../features/Employee/employeeSlice';
import { useNavigate } from 'react-router-dom';

const DeleteEmployeeModal = ({ id }: any) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setDeleteShow] = useState(false);
	const { deleteEmpisError, deleteEmpisLoading, deleteEmpmessage, deleteEmpisSuccess } = useAppSelector((state: any) => state.employee)



	useEffect(() => {
		if (deleteEmpisSuccess) {
			fireAlert("Successful", "Employee Deleted Successfully", "success");
			setDeleteShow(false)
			navigate(-1)
			dispatch(reset());
		} else if (deleteEmpisError) {
			fireAlert("Employee Deletion error", deleteEmpmessage, "error");
			dispatch(reset());
		}
	}, [deleteEmpisError, deleteEmpisSuccess, deleteEmpmessage, dispatch, navigate])

	const handleEmployeeDeletion = () => {
		// @ts-ignore
		dispatch(deleteEmployees(id));
	}

	return (
		<div>
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setDeleteShow(true)}
			>
				Delete Employee
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  >
					<span>{/*  */}</span>
					<span className="span-center-title">Delete Employee Data</span>
					<Button style={{ color: "#fff" }} onClick={() => setDeleteShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete employee data?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setDeleteShow(false)}>
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
