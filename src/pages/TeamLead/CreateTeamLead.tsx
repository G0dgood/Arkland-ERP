import { SetStateAction, useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap';

import SelectInput from '../../components/SelectInput';
import { fireAlert } from '../../utils/Alert';
import { createTeamLead, reset } from '../../features/TeamLead/teamleadSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import createHttpService from '../../components/HttpService';

import { ModalHeader } from '../../components/Modals/ModalOptions';
import { BsBuilding } from 'react-icons/bs';

const CreateTeamLead = () => {
	const dispatch = useAppDispatch();
	const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.teamlead)


	const [isLoading, setisLoading] = useState<any>([]);
	const [team, setTeam] = useState<any>([]);
	const [departments, setDepartments] = useState<any>([]);
	const [employees, setEmployees] = useState<any>([]);

	console.log("departments", team, departments, employees)

	const getData = async () => {
		const HttpService = createHttpService();
		setisLoading(true)
		try {
			const employeesUrl = "hr/employees"
			const employees: any = await HttpService.get(employeesUrl)
			setEmployees(employees?.data?.data)

			const departmentsUrl = "hr/departments"
			const departments: any = await HttpService.get(departmentsUrl)
			setDepartments(departments?.data?.data)

			const teamUrl = `teams`
			const team: any = await HttpService.get(teamUrl)
			setTeam(team?.data?.data)


			setisLoading(false)

		} catch (error) {
			setisLoading(false)
		}
	}

	// const getData = async () => {
	// 	const HttpService = createHttpService();
	// 	setisLoading(true);

	// 	try {
	// 		const fetchData = async (url: string, setDataFunction: { (value: SetStateAction<never[]>): void; (arg0: any): void; }) => {
	// 			const response = await HttpService.get(url);
	// 			setDataFunction(response?.data?.data);
	// 		};

	// 		const endpoints = [
	// 			{ url: "hr/employees", setter: setEmployees },
	// 			{ url: "hr/departments", setter: setDepartments },
	// 			{ url: "hr/teams", setter: setTeam },
	// 		];

	// 		await Promise.all(endpoints.map(({ url, setter }) => fetchData(url, setter)));
	// 	} catch (error) {
	// 		console.error("Error fetching data:", error);
	// 	} finally {
	// 		setisLoading(false);
	// 	}
	// };


	const [Show, setLgShow] = useState(false);

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
			setLgShow(false)
			fireAlert("Success", "Project Manager created  successfully", "success");
			dispatch(reset());
		}
	}, [createisError, createisSuccess, createmessage, dispatch]);


	const handleSubmit = () => {
		// @ts-ignore
		dispatch(createTeamLead(inputs));
	}




	const availabledepartment = departments?.map((departments: any) => ({
		value: departments.id,
		label: departments.name,
	})) || [];
	const availableEmployees = employees?.data?.map((employee: any) => ({
		value: employee.id,
		label: employee?.full_name,
	})) || [];

	const availableTeam = team?.map((teamLeads: any) => ({
		value: teamLeads?.id,
		label: teamLeads?.name,
	})) || [];


	const handleOnChange1 = (input: any, value: any) => {
		setNewid((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	console.log('availableEmployees', employees)

	return (
		<div>
			<li className={"active"} onClick={() => { setLgShow(true); getData() }}>	Create Project Manager</li>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<BsBuilding size={30} />} title={"Create Project Manager"} subtitle={"Create Project Manager"} />

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
										? <Spinner animation="border" size='sm' />
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
