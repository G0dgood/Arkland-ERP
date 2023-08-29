import { useEffect, useState } from 'react'
import { fireAlert } from '../../utils/Alert';
import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { createprivileges, reset } from '../../features/User/userSlice';
import HttpService from '../HttpService';
import SelectInput from '../SelectInput';
import createHttpService from '../HttpService';


const AssignPrivilegesModal = ({ setReload }: any) => {
	const dispatch = useAppDispatch();
	const { createisLoading, createisSuccess } = useAppSelector((state: any) => state.userinfo)


	const [isLoadings, setisLoadings] = useState(false);

	const [employees, setEmployees] = useState([]);
	const [input, setInput] = useState<any>({
		isEmployee: "",
	})



	const handelclick = async () => {
		const HttpService = createHttpService();
		setisLoadings(true)
		try {
			const employees = "hr/employees"
			const employee: any = await HttpService.get(employees)
			setEmployees(employee?.data?.data)
			setisLoadings(false)

		} catch (error) {
			setisLoadings(false)
		}
	}



	const availableEmployees = [] as any;

	employees &&
		employees.forEach((employee: any) =>
			availableEmployees.push({
				value: employee?.user,
				label: employee?.full_name,
			})
		);
	const [lgShow, setLgShow] = useState(false);
	const [inputs, setInputs] = useState({
		role: "",
		user: "",
	})



	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				user: input?.isEmployee?.value,

			});
		});
	}, [input?.isEmployee, setInput]);


	const handleLeave = () => {
		// @ts-ignore
		dispatch(createprivileges(inputs));

	}
	const html = "Privileges Assigned!";
	const icon = "success";


	useEffect(() => {
		if (createisSuccess) {
			fireAlert("Successful", "Role Created Sucessfully", icon);
			setLgShow(false)
			setInputs({
				role: "",
				user: "",
			})
			setInput({
				isEmployee: "",
			})
			dispatch(reset());
		}
	}, [html, createisSuccess, setReload, dispatch])



	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};
	const handleOnChange1 = (input: any, value: any) => {
		setInput((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};


	const Role: any = [
		"employee",
		"team lead",
		"HR editor",
		"HR admin",
		"HR head",
		"admin",
		"support",
		"super admin",
		"management"
	]

	return (
		<div>
			<Button variant="contained" className="add-experience"
				onClick={() => { setLgShow(true); handelclick() }}>
				Assign Privilege
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header  >
					<span className='span-center-title'>Assign Privilege</span>
					<Button onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
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
						<div className='Modal-data-time'>
						</div>
						<h6>Employee</h6>
						{/* <select id="Modal-textarea-input-sub"
							value={inputs.user}
							onChange={(e) => handleOnChange("user", e.target.value)}>
							<option value=" ">Select Employees...</option>

							{employees?.map((employ: any) => (
								<option key={employ?._id} value={employ?._id}>
									{employ?.full_name}
								</option>
							))}
						</select > */}
						<SelectInput
							isDisabled={isLoadings}
							isLoading={isLoadings}
							options={availableEmployees}
							value={input.isEmployee}
							onChange={(e: any) => handleOnChange1("isEmployee", e)}
						/>
						<div className='btn-modal-container' style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button variant="contained" className="add-experience" onClick={handleLeave} disabled={createisLoading}>
								{createisLoading ? <Spinner animation="border" /> : "Create"}
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default AssignPrivilegesModal
