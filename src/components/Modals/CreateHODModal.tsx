import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import { fireAlert } from '../../utils/Alert'
import { reset } from '../../features/HOD/hodSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch'

const CreateHODModal = () => {
	const dispatch = useAppDispatch();
	const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.announcement)
	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState<any>({
		message: "",
		audience_scope: "",
	})

	const announcementOptions = [
		"general",
		"employee role",
		"team",
		"department",
		"project",
	];



	const title = "Successful";
	const html = "Announcement Created!";
	const icon = "success";
	const title1 = "Announcement creation failed";
	const html1 = createmessage;
	const icon1 = "error";


	useEffect(() => {
		if (createisSuccess) {
			fireAlert(title, html, icon);
			setInputs({
				message: "",
				audience_scope: ""
			})
			setLgShow(false)

			dispatch(reset());
		} else if (createisError) {
			fireAlert(title1, html1, icon1);
			dispatch(reset());
		}
	}, [createisError, createisSuccess, dispatch, html, html1])

	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	const handleCreate = (e: any) => {

		// dispatch(createAnnouncement(inputs));
	}
	// e.preventDefault();
	// 	// @ts-ignore

	return (
		<div>
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setLgShow(true)} >
				Create HOD
			</Button>

			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Create Announcement</span>
					<Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>

					<Form onSubmit={handleCreate}>
						<div className="Modal-Body">
							<div className="Modal-textarea-middle">
								<div className="col">
									<div className="form-group">
										<textarea rows={6} className='Modal-textarea' placeholder='Enter broadcast message'
											value={inputs.message}
											onChange={(e) => handleOnChange("message", e.target.value)} />
									</div>


								</div>
							</div>
							<div className="modal-input-sub-space">
								<div className="col">
									<select id="Modal-textarea-input-sub"

										value={inputs.audience_scope}
										onChange={(e) => handleOnChange("audience_scope", e.target.value)}>
										<option>Select audience scope</option>
										{announcementOptions?.map((employ: any) => (
											<option key={employ} value={employ}>
												{employ}
											</option>
										))}
									</select >
								</div>

								<div className="btn-modal-container" >
									<Button
										variant="contained"
										className="Add-btn-modal"
										type="submit"
										disabled={createisLoading}
									>
										{createisLoading ? <Spinner animation="border" /> : "Create"}
									</Button>
								</div>
							</div>
						</div>
					</Form>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CreateHODModal