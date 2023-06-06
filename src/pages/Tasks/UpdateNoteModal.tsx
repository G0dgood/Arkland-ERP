import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { MdOutlineClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { fireAlert } from '../../utils/Alert'
import { noteTask, reset } from '../../features/Tasks/taskSlice'

const UpdateNoteModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { noteisError, noteisLoading, notemessage, noteisSuccess } = useAppSelector((state: any) => state.task)

	const [Show, setShow] = useState(false);
	const [inputs, setInputs] = useState({
		note: "",
	});



	useEffect(() => {
		if (noteisError) {
			fireAlert("Task Note updated failed", notemessage, "error");
			dispatch(reset());
		} else if (noteisSuccess) {
			setShow(false)
			fireAlert("Success", "Task Note updated successfully", "success");
			dispatch(reset());
		}
	}, [noteisSuccess, notemessage, dispatch, noteisError, id]);



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
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setShow(true)} >
				Update Task Note
			</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Update Task Note</span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)} >
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
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
							className="Add-btn-modal"
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
