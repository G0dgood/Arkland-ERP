import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap'
import { fireAlert } from '../../utils/Alert'
import { createHOD, reset } from '../../features/HOD/hodSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import SelectInput from '../SelectInput'
import createHttpService from '../HttpService'
import { ModalHeader } from './ModalOptions'
import { GrUser } from 'react-icons/gr'



const CreateHODModal = () => {
	const dispatch = useAppDispatch();
	const { createisLoading, createisSuccess } = useAppSelector((state: any) => state.hod)


	const [lgShow, setLgShow] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [employees, setEmployees] = useState([]);
	const [departments, setDepartments] = useState([]);

	const [inputs, setInputs] = useState<any>({
		name: " ",
		department: " ",
		user: " "
	})



	const [input, setInput] = useState<any>({
		name: " ",
		department: " ",
		user: " "
	})

	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				name: inputs.name,
				department: inputs?.department?.value,
				user: inputs.user?.value
			});
		});
	}, [inputs?.department?.value, inputs.name, inputs.user?.value, setInputs]);



	const title = "Successful";
	const html = "HOD Created!";
	const icon = "success";

	useEffect(() => {
		if (createisSuccess) {
			fireAlert(title, html, icon);
			setInputs({
				name: " ",
				department: " ",
				user: " "
			})
			setLgShow(false)
			dispatch(reset());
		}
	}, [createisSuccess, dispatch, html])



	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	// const handleCreate = (e: any) => {
	// 	e.preventDefault();
	// 	// @ts-ignore
	// 	dispatch(createHOD(input));
	// }

	// const getData = async () => {
	// 	const HttpService = createHttpService();
	// 	setisLoading(true)
	// 	try {
	// 		const employees = "hr/employees"
	// 		const employee: any = await HttpService.get(employees)
	// 		setEmployees(employee?.data?.data)

	// 		const departmentsUrl = "hr/departments"
	// 		const departments: any = await HttpService.get(departmentsUrl)
	// 		setDepartments(departments?.data?.data)

	// 		setisLoading(false)

	// 	} catch (error) {
	// 		setisLoading(false)
	// 	}
	// }

	const handleCreate = (e: React.FormEvent) => {
		e.preventDefault();
		// @ts-ignore
		dispatch(createHOD(input));
	}

	const getData = async () => {
		const HttpService = createHttpService();
		setisLoading(true);

		try {
			const employeesUrl = "hr/employees";
			const departmentsUrl = "hr/departments";

			const [employeesResponse, departmentsResponse] = await Promise.all([
				HttpService.get(employeesUrl),
				HttpService.get(departmentsUrl),
			]);

			setEmployees(employeesResponse?.data?.data);
			setDepartments(departmentsResponse?.data?.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setisLoading(false);
		}
	}


	const availableDepartment = departments?.map((department: any) => ({
		value: department.id,
		label: department.name,
	})) || [];
	const availableEmployees = employees?.map((employee: any) => ({
		value: employee.id,
		label: employee.full_name,
	})) || [];


	// const availableDepartment = [] as any;
	// departments &&
	// 	departments.forEach((department: any) =>
	// 		availableDepartment.push({
	// 			value: department?.id,
	// 			label: department?.name,
	// 		})
	// 	);

	// const availableEmployees = [] as any;

	// employees &&
	// 	employees.forEach((employee: any) =>
	// 		availableEmployees.push({
	// 			value: employee?.user,
	// 			label: employee?.full_name,
	// 		})
	// 	);


	return (
		<div>
			<li className={"active"} onClick={() => { setLgShow(true); getData() }}>Create HOD</li>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<GrUser size={30} />} title={"Create HOD"} subtitle={"Create a HOD"} />
				<Modal.Body>

					<Form onSubmit={handleCreate}>
						<div className="Modal-Body">
							<div className="Modal-textarea-middle">
								<div className="col">
									<div className="form-group">
										<div>Name</div>
										<textarea rows={1} className='Modal-textarea' placeholder='Enter broadcast message'
											value={inputs.name}
											onChange={(e) => handleOnChange("name", e.target.value)} />
									</div>
								</div>
							</div>

							<div className="modal-input-sub-space">
								<div className="col" mt-2>
									<SelectInput
										label={"Select Department"}
										isDisabled={isLoading}
										isLoading={isLoading}
										options={availableDepartment}
										value={inputs.department}
										// defaultValue={defaultValue}
										// defaultInputValue={defaultValue}
										onChange={(e: any) => handleOnChange("department", e)} />
								</div>

								<div className="col mt-5">
									<SelectInput
										isDisabled={isLoading}
										isLoading={isLoading}
										options={availableEmployees}
										value={inputs.user}
										// defaultValue={defaultValue}
										// defaultInputValue={defaultValue}
										onChange={(e: any) => handleOnChange("user", e)}
										label={"Select HOD Name"} />
								</div>

								<div className="btn-modal-container" >
									<Button
										variant="contained"
										className="add-experience"
										type="submit"
										disabled={createisLoading}>

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