import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import SelectInput from '../../components/SelectInput';
import { fireAlert } from '../../utils/Alert';
import { createTeamLead, reset } from '../../features/TeamLead/teamleadSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import HttpService from '../../components/HttpService';

const CreateTeamLead = () => {
	const dispatch = useAppDispatch();
	const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.teamlead)



	const [isLoading, setisLoading] = useState<any>([]);
	const [team, setTeam] = useState<any>([]);
	const [departments, setDepartments] = useState<any>([]);
	const [employees, setEmployees] = useState<any>([]);

	const getData = async () => {
		setisLoading(true)
		try {
			const employeesUrl = "hr/employees"
			const employees: any = await HttpService.get(employeesUrl)
			setEmployees(employees?.data?.data)

			const departmentsUrl = "hr/departments"
			const departments: any = await HttpService.get(departmentsUrl)
			setDepartments(departments?.data?.data)

			const teamUrl = "hr/teams"
			const team: any = await HttpService.get(teamUrl)
			setTeam(team?.data?.data)
			setisLoading(false)

		} catch (error) {
			setisLoading(false)
		}
	}



	const [Show, setShow] = useState(false);

	const [inputs, setInputs] = useState<any>({
		name: "",
		team: "",
		user: "",
		department: "",
	})
	const [newid, setNewid] = useState<any>({
		name: "",
		team: "",
		user: "",
		department: "",
	})

	console.log('inputs', inputs)



	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				name: newid?.name?.label,
				user: newid?.user?.value,
				team: newid?.team?.value,
				department: newid?.department?.value
			});
		});
	}, [newid, setInputs]);

	useEffect(() => {
		if (createisSuccess) {
			setShow(false)
			fireAlert("Success", "Project Manager created  successfully", "success");
			dispatch(reset());
		}
	}, [createisError, createisSuccess, createmessage, dispatch]);


	const handleSubmit = () => {
		// @ts-ignore
		dispatch(createTeamLead(inputs));
	}

	const availableEmployees = [] as any;

	employees &&
		employees.forEach((employee: any) =>
			availableEmployees.push({
				value: employee?.user,
				label: employee?.full_name,
			})
		);

	const availableTeam = [] as any;

	team &&
		team.forEach((team: any) =>
			availableTeam.push({
				value: team?.id,
				label: team?.name,
			})
		);


	const availabledepartment = [] as any;

	departments &&
		departments.forEach((department: any) =>
			availabledepartment.push({
				value: department?.id,
				label: department?.name,
			})
		);


	const handleOnChange1 = (input: any, value: any) => {
		setNewid((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	return (
		<div>
			<Button
				variant="contained"
				className="add-experience"
				onClick={() => { setShow(true); getData() }} >
				Create Team Lead
			</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span className="span-center-title"> Create Project Manager</span>
					<Button
						onClick={() => setShow(false)}
					>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>


					<div>
						<div className="Modal-Body">
							<div className="col">
								<div className="form-group">
									<SelectInput
										label="Employees"
										isDisabled={isLoading}
										isLoading={isLoading}
										options={availableEmployees}
										value={newid.name}
										onChange={(e: any) => handleOnChange1("name", e)}
									/>
								</div>
							</div>

							<div className="col">
								<div className="form-group">
									<SelectInput
										label="Team"
										isDisabled={isLoading}
										isLoading={isLoading}
										options={availableTeam}
										value={newid.team}
										onChange={(e: any) => handleOnChange1("team", e)}
									/>
								</div>
							</div>

							<div className="Modal-textarea-middle">
								<div className="col">
									<div className="form-group">

										<SelectInput
											label="User"
											isDisabled={isLoading}
											isLoading={isLoading}
											options={availableEmployees}
											value={newid.user}
											onChange={(e: any) => handleOnChange1("user", e)}
										/>
									</div>
								</div>
							</div>

							<div className="Modal-textarea-middle">
								<div className="col">
									<div className="form-group">

										<SelectInput
											label="Department"
											isDisabled={isLoading}
											isLoading={isLoading}
											options={availabledepartment}
											value={newid.department}
											onChange={(e: any) => handleOnChange1("department", e)}
										/>
									</div>
								</div>
							</div>

							<div className="btn-modal-container">
								<Button
									disabled={createisLoading || isLoading}
									variant="contained"
									className="add-experience"
									type="submit"
									onClick={handleSubmit}
								>
									{createisLoading
										? <Spinner animation="border" />
										: "Create Team Lead"}
								</Button>
							</div>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div >
	)
}

export default CreateTeamLead
