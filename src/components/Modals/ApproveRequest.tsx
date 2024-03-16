import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { fireAlert } from "../../utils/Alert";
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { createLeave } from '../../features/Leave/leaveSlice';
import { reset } from '../../features/Announcement/announcemetSlice';
import { ModalHeader } from './ModalOptions';
import { BsCalendar4Week } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkSharp } from "react-icons/io5";
import createHttpService from '../HttpService';
import { payRollEmployeeSalaryApproval } from '../../features/PayRoll/payrollSlice';
import { customId } from '../../shared/shared';
import { toast } from 'react-toastify';



const ApproveRequest = ({ item, id }: any) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [lgShow, setLgShow] = useState(false);
	const { viewdata, viewisLoading, viewisError, viewmessage }: any = useAppSelector((state: any) => state.payroll)
	const { payRollApprovaldata, payRollApprovalisLoading, payRollApprovalisError, payRollApprovalmessage }: any = useAppSelector((state: any) => state.payroll)


	console.log('payRollApprovalmessage', payRollApprovalmessage)


	// useEffect(() => {
	// 	if (reductProductCountisError) {
	// 		toast.error(reductProductCountmessage, {
	// 			toastId: customId
	// 		});
	// 	}
	// 	else if (reductProductCountisSuccess) {
	// 		setLgShow(false)
	// 		setInput({
	// 			count: ''
	// 		})
	// 		toast.success("Inventory Reduced! ", { toastId: customId });
	// 	}
	// 	dispatch(reset());
	// }, [dispatch, reductProductCountisError, reductProductCountisSuccess, reductProductCountmessage]);

	const [isLoadings, setisLoadings] = useState(false);

	const [employees, setEmployees] = useState<any>([]);



	// const handleApproval = async () => {
	// 	const HttpService = createHttpService();
	// 	setisLoadings(true)
	// 	try {
	// 		const url = `payroll/employees/${id}/finance/approve`
	// 		const { data }: any = await HttpService.patch(url)

	// 		setEmployees(data?.data)
	// 		setisLoadings(false)

	// 	} catch (error) {
	// 		setisLoadings(false)
	// 	}
	// }
	const showAlert = () => {
		toast.error("No file Avialable!", { toastId: customId })
	};


	const handleApproval = () => {
		// @ts-ignore
		dispatch(payRollEmployeeSalaryApproval(id));
	}

	return (
		<div>
			<Button id="view-status" onClick={() => setLgShow(true)}>Approve</Button>
			<Modal
				fullscreen={true}
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<ModalHeader setLgShow={setLgShow} icon={<IoCheckmarkSharp size={30} />} title={"Approve Request"} subtitle={"View previous and new request before approving"} />

				<Modal.Body id='approve-container-black'>

					<div className='approve-container'>
						<div className='approve-container-main1'>
							<div id='next-vaule-container'>
								<h2>Current Value</h2>
							</div>
							<ol>
								{item?.changes?.map((change: any, index: any) => (
									<div key={index}>
										<div className='li-flex-item'>
											<div>
												<li>{change.title}</li>
											</div>
											<div>
												<li>{change?.current_value}</li>
											</div>
										</div>
									</div>
								))}
							</ol>
						</div>
						<div className='approve-container-divider'></div>
						<div className='approve-container-main2'>
							<ol>
								<h2>New Value</h2>
								{item?.changes?.map((change: any, index: any) => (
									<div key={index}>
										<div className='li-flex-item'>
											<div>
												<li>{change.title}</li>
											</div>
											<div>
												<li>{change?.new_value}</li>
											</div>
										</div>
									</div>
								))}
							</ol>
						</div>
					</div>
					{/* <textarea
						rows={3}
						cols={50}
						value={item?.comment}
						placeholder="Comment..."
						className='payroll-textarea'
					/> */}
					<div className='approve-buttons'>
						<Button className='approve-button' onClick={showAlert}>DECLINE</Button>
						<Button className='reject-button' onClick={handleApproval}>{payRollApprovalisLoading ? "logging" : "APPROVE"}</Button>
					</div>
				</Modal.Body>
			</Modal>


		</div>
	)
}

export default ApproveRequest

