import moment from 'moment'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { FiEye } from 'react-icons/fi'
import { viewTask } from '../../features/Tasks/taskSlice'
import { Button } from '@material-ui/core'
import { SVGLoader } from '../SVGLoader'
import { ModalHeader } from './ModalOptions'
import { FaTasks } from 'react-icons/fa'



const ViewScheduleModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { viewdata: schedule, viewisLoading } = useAppSelector((state: any) => state.task)
	const [viewShow, setLgShow] = useState(false)





	const priorityOptions = ["Lowest priority", "Low priority", "Medium priority", "High priority", "Top priority"]
	const difficultyOptions = ["Very easy", "Easy", "Moderate", "Challenging", "Very challenging"]




	const handleClick = (id: any) => {
		// @ts-ignore
		dispatch(viewTask(id));

	}

	return (

		<div>
			<FiEye
				size={20}
				onClick={() => { setLgShow(true); handleClick(id) }}
				cursor="pointer"
				title="VIEW TODO"
			/>
			<Modal
				size="lg"
				show={viewShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered >
				<ModalHeader setLgShow={setLgShow} icon={<FaTasks size={30} />} title={"Task Details"} subtitle={"View Task Details"} />
				<Modal.Body>
					{viewisLoading ? (
						<div className="table-loader-announcement1">
							<SVGLoader width={"40px"} height={"40px"} />
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
								{schedule?.priority ? priorityOptions[schedule.priority - 1] : "no priority assigned"}
							</p>
							<p>Difficulty Level</p>
							<p>
								{schedule?.points ? difficultyOptions[schedule?.points - 1] : "no points assigned"}
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
			</Modal>
		</div>
	)
}

export default ViewScheduleModal