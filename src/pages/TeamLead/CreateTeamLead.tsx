import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import SelectInput from '../../components/SelectInput';
import { fireAlert } from '../../utils/Alert';
import { createTeamLead, reset } from '../../features/TeamLead/teamleadSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { allEmployee } from '../../features/Employee/employeeSlice';
import { getTeam } from '../../features/Team/teamSlice';
import { allDepartments } from '../../features/Department/departmentSlice';

const CreateTeamLead = () => {
	const dispatch = useAppDispatch();
	const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.teamlead)
	const { data: employee, isLoading: eisLoading } = useAppSelector((state: any) => state.employee)
	const { data: department, isLoading: disLoading } = useAppSelector((state: any) => state.department)
	const { data: team, isLoading: tisLoading } = useAppSelector((state: any) => state.team)



	useEffect(() => {
		if (!employee) {
			dispatch(allEmployee());
		}

		if (!team) {
			dispatch(getTeam());
		}

		if (!department) {
			dispatch(allDepartments());
		}

	}, [department, dispatch, employee, team]);

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
		if (createisError) {
			fireAlert("Create Team Lead", createmessage, "error");
			dispatch(reset());
		} else if (createisSuccess) {
			setShow(false)
			fireAlert("Success", "Team member created  successfully", "success");
			// dispatch(viewTeamLead());
			dispatch(reset());
		}
	}, [createisError, createisSuccess, createmessage, dispatch]);


	const handleSubmit = () => {
		// @ts-ignore
		dispatch(createTeamLead(inputs));
	}

	const availableEmployees = [] as any;

	employee &&
		employee.forEach((employee: any) =>
			availableEmployees.push({
				value: employee?.id,
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

	department &&
		department.forEach((department: any) =>
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
				className="Add-btn"
				onClick={() => setShow(true)} >
				Create Team Members
			</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title"> Create Team Members</span>
					<Button
						style={{ color: "#fff" }}
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
										isDisabled={eisLoading}
										isLoading={eisLoading}
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
										isDisabled={tisLoading}
										isLoading={tisLoading}
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
											isDisabled={eisLoading}
											isLoading={eisLoading}
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
											isDisabled={disLoading}
											isLoading={disLoading}
											options={availabledepartment}
											value={newid.department}
											onChange={(e: any) => handleOnChange1("department", e)}
										/>
									</div>
								</div>
							</div>

							<div className="btn-modal-container">
								<Button
									variant="contained"
									className="Add-btn-modal"
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
