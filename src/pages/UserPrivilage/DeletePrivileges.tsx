import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { Button } from '@material-ui/core';
import { ImBin } from 'react-icons/im';
import { deleteprivileges, reset } from '../../features/User/userSlice';
import { ModalHeader } from '../../components/Modals/ModalOptions';
import { AiOutlineTeam } from 'react-icons/ai';


const DeletePrivileges = ({ id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setLgShow] = useState(false);
	const { deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.userinfo)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Privilege Deletion Successfully", "success");
			setLgShow(false)
			navigate(-1)
			dispatch(reset());
		}
	}, [deleteisSuccess, deletemessage, dispatch, navigate])

	const handleDelete = () => {
		// @ts-ignore
		dispatch(deleteprivileges(id));
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
				<ModalHeader setLgShow={setLgShow} icon={<AiOutlineTeam size={30} />} title={"Delete Privilege"} subtitle={" Delete Privilege"} />
				<Modal.Body>
					<h5 className="last-line m-5"> Are you sure you want to delete this Privilege?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setLgShow(false)}>
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleDelete} >
								{deleteisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeletePrivileges