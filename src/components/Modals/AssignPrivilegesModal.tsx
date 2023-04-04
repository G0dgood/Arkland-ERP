import React, { useEffect, useState } from 'react'
import { fireAlert } from '../../utils/Alert';
import Cookies from 'js-cookie';
import axios, { AxiosResponse } from 'axios';
import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import TableLoader from '../TableLoader';

const AssignPrivilegesModal = ({ setReload }: any) => {
	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		role: "",
		user: "",
	})

	const token = Cookies.get("token");
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isLoading1, setisLoading1] = useState(false);
	const [employees, setEmployees] = useState([]);



	const handleLeave = () => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/admin/privileges`, {
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
	const html = "Privileges Assigned!";
	const icon = "success";
	const title1 = "Privileges error";
	const html1 = message;
	const icon1 = "error";


	useEffect(() => {
		if (isSuccess) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisSuccess(false)
				setMessage("")
				setReload(false)
			}, 5000);
			setLgShow(false)
		} else if (isError) {
			fireAlert(title1, html1, icon1);
			setTimeout(() => {
				setisError(false)
				setMessage("")
				setInputs({
					role: "",
					user: "",
				})
			}, 5000);
		}
	}, [html, html1, isError, isSuccess, setReload])



	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};


	useEffect(() => {
		setisLoading1(true);
		axios
			.get(`${process.env.REACT_APP_API}/hr/employees`)
			.then((res: AxiosResponse) => {
				setEmployees(res?.data?.data);
				setisLoading1(false);
			})
			.catch((data) => {
				console.log(data);
				setisLoading1(false);
			});
	}, [])

	console.log('', inputs)

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
					<span className='span-center-title'>Assign Privilege</span>
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
									value={inputs.role}
									onChange={(e) => handleOnChange("role", e.target.value)}>
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
							value={inputs.user}
							onChange={(e) => handleOnChange("user", e.target.value)}>
							<option value=" ">Select Employees...</option>

							{employees?.map((employ: any) => (
								<option key={employ?._id} value={employ?._id}>
									{employ?.full_name}
								</option>
							))}
						</select >
						{isLoading1 ? <TableLoader isLoading={isLoading1} /> : ""}
						<div className='Modal-data-time'>
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

export default AssignPrivilegesModal
