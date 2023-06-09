import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import { checkForOptions } from '../../utils/checkForName'
import { BounceLoader } from 'react-spinners'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { FiEye } from 'react-icons/fi'
import { viewTask } from '../../features/Tasks/taskSlice'

const ViewScheduleModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	// const { data: schedule, isLoading } = useAppSelector((state: any) => state.task)
	const { viewdata: schedule, viewisError, viewisLoading, viewmessage } = useAppSelector((state: any) => state.task)
	const [viewShow, setViewShow] = useState(false)

	// useEffect(() => {
	// 	// @ts-ignore
	// 	dispatch(viewTask(id));
	// }, [dispatch, id]);



	const handleClick = (id: any) => {
		// @ts-ignore
		dispatch(viewTask(id));

	}

	return (

		<div>
			<FiEye
				size={20}
				onClick={() => { setViewShow(true); handleClick(id) }}
				cursor="pointer"
				title="VIEW TODO"
			/>
			<Modal
				size="lg"
				show={viewShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered >

				<Modal.Header>
					<span></span>
					<span className="span-center-title">View Schedule</span>
					<Button style={{ color: "#fff" }} onClick={() => setViewShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>

				<Modal.Body>
					{viewisLoading ? (
						<div className="table-loader-announcement1">
							<BounceLoader
								color={"#990000"}
								loading={viewisLoading}
							/>
						</div>
					) : (
						<div className="getjob-application-details">
							<p>ASSIGNED TO</p>
							<p>{schedule?.assigned_to?.full_name}</p>
							<p>TITLE</p>
							<p>{schedule?.title}</p>
							<p>STATUS</p>
							<p>{schedule?.status}</p>
							<p>PRIORITY</p>
							<p>
								{/* {checkForOptions(
									schedule?.priority, priorityOptions
								)} */}
							</p>
							<p>NOTES</p>
							<p>{schedule?.notes?.[0].text}</p>
							<p>DATE OF COMPLETION</p>
							<p>
								{" "}
								{moment(schedule?.expected_completion_date
								).format("DD-MMMM-YYYY")}
							</p>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<button
						className="btn btn-secondary"
						onClick={() => setViewShow(false)}
					>
						Cancel
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ViewScheduleModal