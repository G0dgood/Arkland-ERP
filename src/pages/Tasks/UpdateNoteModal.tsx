import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { fireAlert } from '../../utils/Alert'
import { noteTask, reset } from '../../features/Tasks/taskSlice'
import { ModalHeader } from '../../components/Modals/ModalOptions'
import { GoNote } from 'react-icons/go'

const UpdateNoteModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { noteisLoading, notemessage, noteisSuccess } = useAppSelector((state: any) => state.task)

	const [Show, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		note: "",
	});



	useEffect(() => {
		if (noteisSuccess) {
			setLgShow(false)
			fireAlert("Success", "Task Note updated successfully", "success");
			dispatch(reset());
		}
	}, [noteisSuccess, notemessage, dispatch, id]);



	const handleSubmit = () => {

		const input = { ...inputs, id }
		// @ts-ignore
		dispatch(noteTask(input));
	}

	const handleOnChange = (input: string, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	return (
		<div>
			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}>	Update Task Note</li>
			</ul>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<GoNote size={30} />} title={"Update Task"} subtitle={"Update Task Note"} />
				<Modal.Body>
					<div className={"input "}>
						<label className={"input__label"} >
							{"Note"}
						</label>
						<textarea
							rows={5}
							className={"input__field "}
							placeholder={"note"}
							value={inputs.note}
							name="note"
							onChange={(e) => handleOnChange("note", e.target.value)}
						/>
					</div>
					<div className="btn-modal-container">
						<Button
							variant="contained"
							className="add-experience"
							type="submit"
							onClick={handleSubmit}
							disabled={noteisLoading}
						>
							{noteisLoading
								? <Spinner animation="border" />
								: "Update"}
						</Button>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default UpdateNoteModal
