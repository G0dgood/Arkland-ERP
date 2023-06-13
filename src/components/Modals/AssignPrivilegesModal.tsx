import { useEffect, useState } from 'react'
import { fireAlert } from '../../utils/Alert';
import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';

import DataService from '../../utils/dataService';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { allEmployee } from '../../features/Employee/employeeSlice';

const dataService = new DataService()
const AssignPrivilegesModal = ({ setReload }: any) => {
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state: any) => state.employee)



	const handelclick = () => {
		// @ts-ignore
		dispatch(allEmployee());
	}



	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		role: "",
		user: "",
	})

	const token = dataService.getToken()
	const [message, setMessage] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [employees, setEmployees] = useState([]);


	useEffect(() => {
		if (data) {
			setEmployees(data)
		}
	}, [data])


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
				} else {
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



	const html = "Privileges Assigned!";
	const icon = "success";
	const html1 = message;



	useEffect(() => {
		if (isSuccess) {
			fireAlert("Successful", html, icon);
			setTimeout(() => {
				setisSuccess(false)
				setMessage("")
				setReload(false)
			}, 5000);
			setLgShow(false)
		}
	}, [html, html1, isSuccess, setReload])



	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};





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
				Assign Privilege
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
					<Button style={{ color: '#fff' }} onClick={() => { setLgShow(false); handelclick() }}>
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
