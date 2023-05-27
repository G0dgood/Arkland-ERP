

import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { fireAlert } from "../../utils/Alert";
import Cookies from 'js-cookie';
import axios, { AxiosResponse } from 'axios';


const CreateRoleModal = ({ setReload, setShowTitle }: any) => {

	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		department: "",
		description: "",
	})

	const token = Cookies.get("token");
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isLoading1, setisLoading1] = useState(false);
	const [departments, setDepartments] = useState([]);



	const handleLeave = () => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/employee-roles`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(inputs),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data?.success === false) {
					setMessage(data?.message)
					setisError(true)
					console.log('data', data)
				} else {
					console.log('data', data)
					setisSuccess(true)
					setReload(true)
					setLgShow(false)
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});
	}


	const title = "Successful";
	const html = "Role Created!";
	const icon = "success";
	const title1 = "Role error";
	const html1 = message;
	const icon1 = "error";


	// useEffect(() => {
	// 	if (isSuccess) {
	// 		fireAlert(title, html, icon);
	// 		setTimeout(() => {
	// 			setisSuccess(false)
	// 			setMessage("")
	// 			setReload(false)
	// 		}, 5000);
	// 		setLgShow(false)
	// 	} else if (isError) {
	// 		fireAlert(title1, html1, icon1);
	// 		setTimeout(() => {
	// 			setisError(false)
	// 			setMessage("")
	// 			setInputs({
	// 				name: "",
	// 				department: "",
	// 				description: "",
	// 			})
	// 		}, 5000);
	// 	}
	// }, [html, html1, isError, isSuccess, setReload])



	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};


	useEffect(() => {
		setisLoading1(true);
		axios
			.get(`${process.env.REACT_APP_API}/hr/departments`)
			.then((res: AxiosResponse) => {
				setDepartments(res?.data?.data);
			})
			.catch((data) => {
				console.log(data);
				setisLoading1(false);
			});
	}, [])
	const Role: any = [
		"employee",
		"team lead",
		"head of department",
		"HR editor",
		"HR admin",
		"HR head",
		"admin",
		"super admin",
		"master"
	]

	return (
		<div>
			<Button variant="contained" className="Add-btn"
				onClick={() => setLgShow(true)}>
				Create Role
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header  >

					<span>

					</span>
					<span className='span-center-title'>Create Role</span>
					<Button style={{ color: '#fff' }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<div className='Modal-data-time'>
							<div className='Modal-two-input'>
								<h6>Name</h6>
								<select id="Modal-textarea-input-sub"
									value={inputs.name}
									onChange={(e) => handleOnChange("name", e.target.value)}>
									<option value=" ">Select Name...</option>
									{Role?.map((Role: any) => (
										<option key={Role} value={Role}>
											{Role}
										</option>
									))}
								</select >
							</div>
						</div>
						<div className='Modal-data-time'>
						</div>
						<h6>Department</h6>
						<select id="Modal-textarea-input-sub"
							value={inputs.department}
							onChange={(e) => handleOnChange("department", e.target.value)}>
							<option value=" ">Select Departments...</option>

							{departments?.map((employ: any) => (
								<option key={employ?._id} value={employ?.id}>
									{employ?.name}
								</option>
							))}
						</select >
						<div className='Modal-data-time'>
						</div>
						<div className='Modal-textarea-middle'>
							<h6>Description</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Enter role description'
								value={inputs.description}
								onChange={(e) => handleOnChange("description", e.target.value)} />
						</div>
						<div className='btn-modal-container'>
							<Button variant="contained" className="Add-btn-modal" onClick={handleLeave}>
								{isLoading ? <Spinner animation="border" /> : "Create"}
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CreateRoleModal


