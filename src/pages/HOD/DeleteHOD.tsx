import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { deleteHOD, reset } from '../../features/HOD/hodSlice';
import { ImBin } from 'react-icons/im';

const DeleteHOD = ({ id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setDeleteShow] = useState(false);
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.hod)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "HOD Deleted Successfully", "success");
			setDeleteShow(false)
			navigate(-1)
			dispatch(reset());
		}
	}, [deleteisError, deleteisSuccess, deletemessage, dispatch, navigate])

	const handleHODDeletion = () => {
		// @ts-ignore
		dispatch(deleteHOD(id));
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
					<span>{/**/}</span>
					<span className="span-center-title">Delete HOD</span>
					<Button style={{ color: "#fff" }} onClick={() => setDeleteShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete this HOD ?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setDeleteShow(false)}>
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleHODDeletion} >
								{deleteisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteHOD