import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import { fireAlert } from '../../utils/Alert'
import { createHOD, reset } from '../../features/HOD/hodSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { allEmployee } from '../../features/Employee/employeeSlice'
import { allDepartments } from '../../features/Department/departmentSlice'
import SelectInput from '../SelectInput'



const CreateHODModal = () => {
	const dispatch = useAppDispatch();
	const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.hod)
	const { data: department, isLoading: departmentisLoading } = useAppSelector((state: any) => state.department)
	const { data: employee, isLoading } = useAppSelector((state: any) => state.employee)

	useEffect(() => {
		setTimeout(() => {
			dispatch(allDepartments());
		}, 2000);

	}, [dispatch]);

	useEffect(() => {
		setTimeout(() => {
			dispatch(allEmployee());
		}, 4000);
	}, [dispatch]);



	const [lgShow, setLgShow] = useState(false);

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

	console.log('inputs', inputs)


	const title = "Successful";
	const html = "HOD Created!";
	const icon = "success";
	const title1 = "HOD creation failed";
	const html1 = createmessage;
	const icon1 = "error";


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
		e.preventDefault();
		// @ts-ignore
		dispatch(createHOD(inputs));
	}
	const availableDepartment = [] as any;
	department &&
		department.forEach((department: any) =>
			availableDepartment.push({
				value: department?.id,
				label: department?.name,
			})
		);
	const availableEmployees = [] as any;

	employee &&
		employee.forEach((employee: any) =>
			availableEmployees.push({
				value: employee?.id,
				label: employee?.full_name,
			})
		);


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
					<span className="span-center-title">Create HOD</span>
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
											value={inputs.name}
											onChange={(e) => handleOnChange("name", e.target.value)} />
									</div>


								</div>
							</div>
							<div className="modal-input-sub-space">
								<div className="col" mt-2>
									<SelectInput
										label={"Select Department"}
										isDisabled={departmentisLoading}
										isLoading={departmentisLoading}
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