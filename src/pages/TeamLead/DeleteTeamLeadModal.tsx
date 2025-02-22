import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { fireAlert } from '../../utils/Alert';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { reset } from '../../features/TeamLead/teamleadSlice';
import { ImBin } from 'react-icons/im';
import { AiOutlineDelete } from 'react-icons/ai';
import { ModalHeader } from '../../components/Modals/ModalOptions';


const DeleteTeamLeadModal = ({ name, id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setLgShow] = useState(false);
	const { deleteisLoading, deleteisSuccess } = useAppSelector((state: any) => state.teamlead)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Team Lead Deleted Successfully", "success");
			setLgShow(false)
			navigate(-1)
			dispatch(reset());
		}
	}, [deleteisSuccess, dispatch, navigate])

	const handleDeletion = () => {
		// @ts-ignore
		dispatch(deleteTeadLead(id));
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
				<ModalHeader setLgShow={setLgShow} icon={<AiOutlineDelete size={30} />} title={"Delete Tead Lead"} subtitle={" Delete Tead Lead"} />
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete ({name}) as a Team Lead ?</h5>
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

export default DeleteTeamLeadModal


