import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { fireAlert } from '../../utils/Alert';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { deleteTask, reset } from '../../features/Tasks/taskSlice';
import { ImBin } from 'react-icons/im';
import { ModalHeader } from '../../components/Modals/ModalOptions';
import { AiOutlineTeam } from 'react-icons/ai';


const DeleteTaskModal = ({ id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setLgShow] = useState(false);
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.task)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Task Deleted Successfully", "success");
			setLgShow(false)
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
			<Button onClick={() => setLgShow(true)}> <ImBin size={25} color='#bf8412' /></Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<AiOutlineTeam size={30} />} title={"Delete Tead Lead"} subtitle={"Delete Tead Lead"} />
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete Task ?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setLgShow(false)}>
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


