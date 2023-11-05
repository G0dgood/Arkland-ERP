import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { deleteDepartments, reset } from '../../features/Department/departmentSlice';
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { ImBin } from 'react-icons/im';
import { ModalHeader } from './ModalOptions';
import { FaWarehouse } from 'react-icons/fa';

const DeleteDepartment = ({ id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setLgShow] = useState(false);
	const { deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.department)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Department Deleted Successfully", "success");
			setLgShow(false)
			navigate(-1)
			dispatch(reset());
		}
	}, [deleteisSuccess, deletemessage, dispatch, navigate])

	const handleEmployeeDeletion = () => {
		// @ts-ignore
		dispatch(deleteDepartments(id));
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
				<ModalHeader setLgShow={setLgShow} icon={<FaWarehouse size={30} />} title={"Delete Department"} subtitle={"Delete Department Below"} />

				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete this Department ?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setLgShow(false)}>
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