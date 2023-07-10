import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/useStore';
import { useEffect, useState } from 'react';
import { fireAlert } from '../utils/Alert';
import { deleteRole, reset } from '../features/Employee/employeeSlice';
import { ImBin } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const DeleteModals = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { deleteroleisLoading, deleteroleisSuccess } = useAppSelector((state: any) => state.employee)
	const [showdelete, setShowDelete] = useState(false);
	const handleDeleteClose = () => setShowDelete(false);

	useEffect(() => {
		if (deleteroleisSuccess) {
			navigate(-1);

			dispatch(reset());
			fireAlert("Successful", "Role Deleted!", "success");
		}
	}, [deleteroleisSuccess, dispatch, navigate])


	const handleDelete = () => {
		// @ts-ignore
		dispatch(deleteRole(id));
	}

	return (
		<div>
			<Button onClick={() => setShowDelete(true)}> <ImBin size={25} color='#bf8412' /></Button>
			<Modal
				show={showdelete}
				onHide={handleDeleteClose}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
				centered
			>
				<Modal.Header>
					<span>{/*  */}</span>
					<span className="span-center-title">Delete  Employee Role</span>
					<Button style={{ color: "#fff" }} onClick={() => setShowDelete(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<p>Are you Sure?</p>
					<p>This action cannot be reversed</p>
					<p className="last-line">Ensure you've "Checked" before you hit "Yes"</p>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active">
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleDelete} >
								{deleteroleisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteModals
