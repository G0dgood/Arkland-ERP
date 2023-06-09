import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { deleteDepartments, reset } from '../../features/Department/departmentSlice';
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';

const DeleteDepartment = ({ id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setDeleteShow] = useState(false);
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.department)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Department Deleted Successfully", "success");
			setDeleteShow(false)
			navigate(-1)
			dispatch(reset());
		} else if (deleteisError) {
			fireAlert("Department Deletion error", deletemessage, "error");
			dispatch(reset());
		}
	}, [deleteisError, deleteisSuccess, deletemessage, dispatch, navigate])

	const handleEmployeeDeletion = () => {
		// @ts-ignore
		dispatch(deleteDepartments(id));
	}

	return (
		<div>
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setDeleteShow(true)}
			>
				Delete Department
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  >
					<span>{/*  */}</span>
					<span className="span-center-title">Delete Department</span>
					<Button style={{ color: "#fff" }} onClick={() => setDeleteShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete this Department ?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setDeleteShow(false)}>
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleEmployeeDeletion} >
								{deleteisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteDepartment