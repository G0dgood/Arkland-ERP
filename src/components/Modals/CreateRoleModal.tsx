import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { fireAlert } from "../../utils/Alert";
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { allDepartments } from '../../features/Department/departmentSlice';
import { createEmployeeRole } from '../../features/Employee/employeeSlice';


const CreateRoleModal = () => {
	const dispatch = useAppDispatch();

	const { data } = useAppSelector((state: any) => state.department)
	const { createroleisLoading, createrolemessage, createroleisSuccess } = useAppSelector((state: any) => state.employee)

	const handleclick = () => {

		// @ts-ignore
		dispatch(allDepartments());
	}

	const [departmentss, setDepartmentss] = useState([]);


	useEffect(() => {
		if (data) {
			setDepartmentss(data)
		}
	}, [data])


	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		department: "",
		description: "",
	})





	const handlecreate = () => {

		// @ts-ignore
		dispatch(createEmployeeRole(inputs));
	}

	const html = "Role Created!";
	const icon = "success";



	useEffect(() => {
		if (createroleisSuccess) {
			fireAlert("success", html, icon);
			setInputs({
				name: "",
				department: "",
				description: "",
			})
			dispatch(allDepartments());
			setLgShow(false)
		}
	}, [createroleisSuccess, createrolemessage, dispatch, html])



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
					<Button style={{ color: '#fff' }} onClick={() => { setLgShow(false); handleclick() }}>
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
							{departmentss?.map((employ: any) => (
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
								value={inputs?.description}
								onChange={(e) => handleOnChange("description", e.target.value)} />
						</div>
						<div className='btn-modal-container'>

							<Button variant="contained" className="Add-btn-modal" onClick={handlecreate}  >
								{createroleisLoading ? <Spinner animation="border" /> : "Create"}
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CreateRoleModal


