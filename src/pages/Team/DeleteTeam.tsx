import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { deleteTeam, reset } from '../../features/Team/teamSlice';
import { ImBin } from 'react-icons/im';
import { ModalHeader } from '../../components/Modals/ModalOptions';
import { RiTeamLine } from 'react-icons/ri';

const DeleteTeam = ({ id }: any) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setLgShow] = useState(false);
	const { deleteisLoading, deleteisSuccess } = useAppSelector((state: any) => state.team)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Team Deleted Successfully", "success");
			setLgShow(false)
			navigate(-1)
			dispatch(reset());
		}
	}, [deleteisSuccess, dispatch, navigate])

	const handleEmployeeDeletion = () => {
		// @ts-ignore
		dispatch(deleteTeam(id));
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
				<ModalHeader setLgShow={setLgShow} icon={<RiTeamLine size={30} />} title={"Delete Team"} subtitle={" Delete Team"} />
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete this Team ?</h5>
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

export default DeleteTeam

