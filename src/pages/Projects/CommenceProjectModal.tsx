import React, { useEffect, useState } from 'react'
import { InputField } from '../../components/TableOptions'
import SelectInput from '../../components/SelectInput'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { MdOutlineClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { fireAlert } from '../../utils/Alert'
import { commenceProject, reset } from '../../features/Project/projectSlice'

const CommenceProjectModal = ({ id, title }: any) => {
	const dispatch = useAppDispatch();
	const { commenceisError, commenceisLoading, commencemessage, commenceisSuccess } = useAppSelector((state: any) => state.project)
	const [Show, setShow] = useState(false);


	useEffect(() => {
		if (commenceisError) {
			fireAlert("Project commence  failed", commencemessage, "error");
			dispatch(reset());
		} else if (commenceisSuccess) {
			setShow(false)
			fireAlert("Success", "Project commenced successfully", "success");
			dispatch(reset());
		}
	}, [commenceisSuccess, commencemessage, dispatch, commenceisError]);


	const handleCommence = () => {
		// @ts-ignore
		dispatch(commenceProject(id));
	}

	return (
		<div>
			<Button className="add-button" onClick={() => setShow(true)}>Commence</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Commence Project </span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)} >
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5>Are you Sure?</h5>
					<h5>You want to commence ({title}) project?</h5>
					<h5 className="last-line">Ensure you've "Checked" before you hit "Commence"</h5>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active">
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleCommence} >
								{commenceisLoading ? <Spinner animation="border" /> : "Commence"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CommenceProjectModal
