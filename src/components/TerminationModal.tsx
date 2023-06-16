import { Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/useStore';
import { approveTerminations, rejectTerminations, reset, viewTerminations } from '../features/Employee/employeeSlice';
import { fireAlert } from '../utils/Alert';


const TerminationModal = ({ item, id }: any) => {
	const dispatch = useAppDispatch();
	const { approveterminationsisLoading, approveterminationsisSuccess }: any = useAppSelector((state: any) => state.employee)
	const { rejectterminationsisLoading, rejectterminationsisSuccess }: any = useAppSelector((state: any) => state.employee)
	const [deleteShow, setDeleteShow] = React.useState(false);


	useEffect(() => {
		if (approveterminationsisSuccess) {
			// @ts-ignore
			dispatch(viewTerminations(id));
			setDeleteShow(false);
			dispatch(reset());
			fireAlert("Successful", "Termination Approved Successfully!", "success");
		}
	}, [
		approveterminationsisSuccess, dispatch, id, rejectterminationsisSuccess])

	const handleapproved = () => {
		// @ts-ignore
		dispatch(approveTerminations(id));

	}
	const handlereject = () => {
		// @ts-ignore
		dispatch(rejectTerminations(id));

	}

	return (
		<div>
			<Button variant="contained" className="Add-btn" onClick={() => setDeleteShow(true)}>
				UPDATE TERMINATION
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered >
				<Modal.Header id="displayTermination">
					<span></span>
					<Modal.Title>Terminate Employee</Modal.Title>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setDeleteShow(false)}
					>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5 className='mt-5 mb-5' >Are you sure you want to Update this terminate for {item?.employee?.full_name}?</h5>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={handlereject}>
								{rejectterminationsisLoading ? <Spinner animation="border" /> : "Reject"}
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleapproved} >
								{approveterminationsisLoading ? <Spinner animation="border" /> : "Approve"}
							</Button>
						</span>
					</div>
				</Modal.Body>

			</Modal>
		</div>
	)
}

export default TerminationModal
