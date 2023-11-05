import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { removeTeamMembers, reset } from '../../features/Team/teamSlice';
import { fireAlert } from '../../utils/Alert';
import { RiTeamLine } from 'react-icons/ri';
import { ModalHeader } from '../../components/Modals/ModalOptions';

const RemoveTeamMember = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { removeMembersisLoading, removeMembersisSuccess } = useAppSelector((state: any) => state.team)

	const [showdelete, setLgShow] = useState(false);
	const handleDeleteClose = () => setLgShow(false);

	useEffect(() => {
		if (removeMembersisSuccess) {
			navigate(-1);
			dispatch(reset());
			fireAlert("Successful", "Team Member Remove!", "success");
		}
	}, [removeMembersisSuccess, dispatch, navigate])


	const handleDelete = () => {
		// @ts-ignore
		dispatch(removeTeamMembers(id));
	}

	return (
		<div>
			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}>		Remove Team Member</li>
			</ul>
			<Modal
				show={showdelete}
				onHide={handleDeleteClose}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<RiTeamLine size={30} />} title={"	Remove Team Member"} subtitle={" 	Remove Team Member"} />
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
								{removeMembersisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default RemoveTeamMember
