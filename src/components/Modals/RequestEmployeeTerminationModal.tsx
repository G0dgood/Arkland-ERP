import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import SelectInput from '../SelectInput';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { createTerminations, reset } from '../../features/Employee/employeeSlice';
import createHttpService from '../HttpService';
import { ModalHeader } from './ModalOptions';
import { FiUserMinus } from 'react-icons/fi';

const RequestEmployeeTerminationModal = () => {
	const { TerminationsisLoading, TerminationsisSuccess } = useAppSelector((state: any) => state.employee)
	const [deleteShow, setLgShow] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const reasonOptions = [
		"Select reason",
		"misconduct",
		"resignation",
		"redundancy",
	];

	const [inputs, setInputs] = useState({
		employee: " ",
		warning: " ",
		reason: " ",
		description: " "
	})

	const [input, setInput] = useState<any>({
		employee: " ",
		warning: ""

	})

	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				employee: input?.employee?.value,
				warning: input?.warning?.value,
			});
		});
	}, [input?.employee, input?.warning?.value, setInputs]);



	const [isLoading, setisLoading] = useState<any>([]);
	const [employees, setEmployees] = useState<any>([]);
	const [warnings, setWarnings] = useState<any>([]);

	const getData = async () => {
		const HttpService = createHttpService();
		setisLoading(true)
		try {
			const employeesUrl = "hr/employees"
			const employees: any = await HttpService.get(employeesUrl)
			setEmployees(employees?.data?.data)
			setisLoading(false)
			const warningsUrl = "hr/warnings"
			const warnings: any = await HttpService.get(warningsUrl)
			setWarnings(warnings?.data?.data)
			setisLoading(false)

		} catch (error) {
			setisLoading(false)
		}
	}



	// const availableEmployees = [] as any;

	// employees &&
	// 	employees.forEach((employee: any) =>
	// 		availableEmployees.push({
	// 			value: employee?.id,
	// 			label: employee?.full_name,
	// 		})
	// 	);
	// const availableWarnings = [] as any;

	// warnings &&
	// 	warnings.forEach((employee: any) =>
	// 		availableWarnings.push({
	// 			value: employee?.id,
	// 			label: employee?.misconduct,
	// 		})
	// 	);

	const availableEmployees = employees?.data?.map((employee: any) => ({
		value: employee.id,
		label: employee.full_name,
	})) || [];

	const availableWarnings = warnings?.data?.map((warning: any) => ({
		value: warning.id,
		label: warning.name,
	})) || [];





	const handleTerminations = () => {
		const input = inputs
		dispatch(createTerminations(input));
	}



	useEffect(() => {
		if (TerminationsisSuccess) {
			fireAlert("success", "Termination Request Sucess", "success");
			setInputs({
				employee: " ",
				warning: " ",
				reason: " ",
				description: " "
			})

			dispatch(reset());
			setLgShow(false)
			navigate(-1)
		}
	}, [TerminationsisSuccess, dispatch, navigate])



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

	return (
		<div>
			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => { setLgShow(true); getData() }}>Request Employee Termination</li>
			</ul>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<FiUserMinus size={30} />} title={"Employee Termination"} subtitle={"		Request Employee Termination"} />
				<Modal.Body>
					<div className='Modal-Body'>
						<div>
							<h6>Name</h6>
							<SelectInput
								isDisabled={isLoading}
								isLoading={isLoading}
								options={availableEmployees}
								value={input.employee}
								onChange={(e: any) => handleOnChange1("employee", e)} />
						</div >
						<div className='Modal-data-time'>
						</div>
						<div className='mt-2  '>
							<h6>Warning</h6>
							<SelectInput
								isDisabled={isLoading}
								isLoading={isLoading}
								options={availableWarnings}
								value={input.warning}
								onChange={(e: any) => handleOnChange1("warning", e)} />
						</div >
						<div className='mt-2  '>
							<h6>Reason</h6>
							<select id="Modal-textarea-input-sub"
								value={inputs.reason}
								onChange={(e) => handleOnChange("reason", e.target.value)}>
								<option value=" ">Select Departments...</option>
								{reasonOptions?.map((employ: any) => (
									<option key={employ?._id} value={employ?.id}>
										{employ}
									</option>
								))}
							</select >
						</div>
						<div className='Modal-data-time'>
						</div>

						<div className='Modal-textarea-middle'>
							<h6>Description</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Enter role description'
								value={inputs?.description}
								onChange={(e) => handleOnChange("description", e.target.value)} />
						</div>
						<div className='btn-modal-container'>

							<Button variant="contained" className="Add-btn-modal" onClick={handleTerminations}  >
								{TerminationsisLoading ? (
									<Spinner animation="border" />
								) : (
									"Request Termination"
								)}
							</Button>
						</div>
					</div>

				</Modal.Body>


			</Modal>
		</div>
	)
}

export default RequestEmployeeTerminationModal