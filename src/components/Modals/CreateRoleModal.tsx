import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { fireAlert } from "../../utils/Alert";
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { allDepartments } from '../../features/Department/departmentSlice';
import { createEmployeeRole, editRole, reset } from '../../features/Employee/employeeSlice';
import { useNavigate } from 'react-router-dom';


const CreateRoleModal = ({ id, viewroledata }: any) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [departmentss, setDepartmentss] = useState([]);
	const { data } = useAppSelector((state: any) => state.department)
	const { createroleisLoading, createroleisSuccess } = useAppSelector((state: any) => state.employee)
	const { editroleisLoading, editroleisSuccess } = useAppSelector((state: any) => state.employee)

	const handleclick = () => {
		// @ts-ignore
		dispatch(allDepartments());
	}
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

	const input = { id, inputs }
	const handleEdit = () => {
		// @ts-ignore
		dispatch(editRole(input));
	}




	useEffect(() => {
		if (createroleisSuccess) {
			fireAlert("success", "Role Created!", "success");
			setInputs({
				name: "",
				department: "",
				description: "",
			})
			dispatch(allDepartments());
			dispatch(reset());
			setLgShow(false)
		}
	}, [createroleisSuccess, dispatch])



	useEffect(() => {
		if (editroleisSuccess) {
			fireAlert("success", "Role Edited!", "success");
			setInputs({
				name: "",
				department: "",
				description: "",
			})
			dispatch(reset());
			setLgShow(false)
			navigate(-1)
		}
	}, [editroleisSuccess, dispatch, navigate])


	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	// Gets the previous state
	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				name: viewroledata?.name,
				department: viewroledata?.department?.id,
				description: viewroledata?.description,
			});
		});
	}, [viewroledata, setInputs]);

	return (
		<div>
			<Button variant="contained" className="add-experience"
				onClick={() => setLgShow(true)}>
				{id ? "Edit Role" : "	Create Role"}
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header  >
					<span className='span-center-title'>	{id ? "Edit Role" : "	Create Role"}</span>
					<Button onClick={() => { setLgShow(false); handleclick() }}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<h6>Name</h6>
						<div className='Modal-data-time mb-3'>
							<input
								type='text'
								id="Modal-textarea-input-sub"
								value={inputs.name}
								onChange={(e) => handleOnChange("name", e.target.value)} />
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

						<div className='Modal-textarea-middle mt-3'>
							<h6>Description</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Enter role description'
								value={inputs?.description}
								onChange={(e) => handleOnChange("description", e.target.value)} />
						</div>
						<div className='btn-modal-container' style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button variant="contained" className="add-experience" onClick={id ? handleEdit : handlecreate}  >
								{createroleisLoading || editroleisLoading ? <Spinner animation="border" /> : id ? "Edit Role" : "	Create Role"}
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CreateRoleModal


