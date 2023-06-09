import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { fireAlert } from '../../utils/Alert';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { reset } from '../../features/TeamLead/teamleadSlice';
import { deleteTask } from '../../features/Tasks/taskSlice';


const DeleteTaskModal = ({ name, id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setDeleteShow] = useState(false);
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.task)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Task Deleted Successfully", "success");
			setDeleteShow(false)
			navigate(-1)
			dispatch(reset());
		} else if (deleteisError) {
			fireAlert("Task Deletion error", deletemessage, "error");
			dispatch(reset());
		}
	}, [deleteisError, deleteisSuccess, deletemessage, dispatch, navigate])

	const handleDeletion = () => {
		// @ts-ignore
		dispatch(deleteTask(id));
	}

	return (
		<div>
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setDeleteShow(true)}
			>
				Delete Task
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  >
					<span>{/*  */}</span>
					<span className="span-center-title">Delete Tead Lead</span>
					<Button style={{ color: "#fff" }} onClick={() => setDeleteShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete Task ?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setDeleteShow(false)}>
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleDeletion} >
								{deleteisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteTaskModal


