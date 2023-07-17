import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { fireAlert } from '../../utils/Alert';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { deleteTask, reset } from '../../features/Tasks/taskSlice';
import { ImBin } from 'react-icons/im';


const DeleteTaskModal = ({ id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setDeleteShow] = useState(false);
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.task)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Task Deleted Successfully", "success");
			setDeleteShow(false)
			navigate(-1)

			// dispatch(reset());
		}
	}, [deleteisError, deleteisSuccess, deletemessage, dispatch, navigate])

	const handleDeletion = () => {
		// @ts-ignore
		dispatch(deleteTask(id));
	}

	return (
		<div>
			<Button onClick={() => setDeleteShow(true)}> <ImBin size={25} color='#bf8412' /></Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  > 
					<span className="span-center-title">Delete Tead Lead</span>
					<Button   onClick={() => setDeleteShow(false)}>
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


