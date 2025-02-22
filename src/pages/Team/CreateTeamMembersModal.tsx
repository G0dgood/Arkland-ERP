import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { createTeamMembers, reset } from '../../features/Team/teamSlice';
import SelectInput from '../../components/SelectInput';
import { allEmployee } from '../../features/Employee/employeeSlice';
import { InputField } from '../../components/TableOptions';
import { useNavigate } from 'react-router-dom';
import { ModalHeader } from '../../components/Modals/ModalOptions';
import { AiOutlineTeam } from 'react-icons/ai';
import createHttpService from '../../components/HttpService';


const CreateTeamMembers = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { createTeamMembersisLoading, createTeamMembersisSuccess } = useAppSelector((state: any) => state.team)
	// const { data: employee, isLoading } = useAppSelector((state: any) => state.employee)
	const navigate = useNavigate();

	const [isLoading, setisLoading] = useState(false);
	const [employee, setEmployees] = useState<any>([]);


	const getData = async () => {
		const HttpService = createHttpService();
		setisLoading(true)
		try {
			const employees = "hr/employees"
			const employee: any = await HttpService.get(employees)
			setEmployees(employee?.data?.data)
			setisLoading(false)

		} catch (error) {
			setisLoading(false)
		}
	}

	console.log('employee', employee)

	useEffect(() => {
		dispatch(allEmployee());
	}, [dispatch]);

	const [Show, setLgShow] = useState(false);

	const [inputs, setInputs] = useState<any>({
		employee: "",
		name: "",
		team_name: "",
	})
	const [newid, setNewid] = useState<any>({
		id: "",
	})



	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				employee: newid.id.value
			});
		});
	}, [setInputs, newid.id]);

	useEffect(() => {
		if (createTeamMembersisSuccess) {
			dispatch(reset());
		}
	}, [createTeamMembersisSuccess, dispatch]);

	useEffect(() => {
		if (createTeamMembersisSuccess) {
			setLgShow(false)
			fireAlert("Success", "Team member created  successfully", "success");
			dispatch(reset());
			navigate(-1);
		}
	}, [createTeamMembersisSuccess, dispatch, navigate]);




	const availableEmployees = [] as any;

	employee &&
		employee?.data?.forEach((employee: any) =>
			availableEmployees.push({
				value: employee?.id,
				label: employee?.full_name,
			})
		);

	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};
	const handleOnChange1 = (input: any, value: any) => {
		setNewid((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};


	const [isInputs, setisInputs] = useState<boolean>(false)
	useEffect(() => {
		setInputs((prevState: any) => ({

			...prevState,
			name: isInputs,

		}));
	}, [isInputs])

	const handleOnChanges = () => {
		setisInputs(!isInputs)
	};

	const handleSubmit = () => {
		const input = { inputs, id, }
		// @ts-ignore
		dispatch(createTeamMembers(input));
	}



	return (
		<div>
			<ul className="nav-tabs-btn  ">
				<li className={"active"} onClick={() => { setLgShow(true); getData() }}>Create Team Members</li>
			</ul>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<AiOutlineTeam size={30} />} title={"Create Team Members"} subtitle={" Create Team Members"} />

				<Modal.Body>


					<div>
						<div className="Modal-Body">
							<div className="col">
								<div className="form-group">
									<SelectInput
										label="Select Employee"
										isDisabled={isLoading}
										isLoading={isLoading}
										options={availableEmployees}
										value={inputs.newid}
										onChange={(e: any) => handleOnChange1("id", e)}
									/>
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label htmlFor="YES" style={{ marginBottom: "1rem" }}>Exit from other teams</label>
									{/* <InputField
										label="Exit from other teams"
										name="Exit from other teams"
										placeholder="Exit from other teams"
										value={inputs.name}
										onChange={(e: any) => handleOnChange("name", e.target.value)}
									/> */}
									<div className="radio-contain">
										<div style={{ marginRight: "2rem" }}>
											<input type="radio" id="YES" name="name"
												disabled={isInputs === true}
												checked={isInputs === true}
												onChange={(e) => handleOnChanges()}
											/>
											<label htmlFor="YES">YES</label>
										</div>

										<div>
											<input type="radio" id="NO" name="name"
												disabled={isInputs === false}
												checked={isInputs === false}
												onChange={(e) => handleOnChanges()} />
											<label htmlFor="NO">NO</label>
										</div>
									</div>
								</div>
							</div>

							<div className="Modal-textarea-middle">
								<div className="col">
									<div className="form-group">

										<InputField
											type="text"
											label="Team name"
											name="team name"
											placeholder="Team name"
											onChange={(e: any) => handleOnChange("team_name", e.target.value)}
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
									{createTeamMembersisLoading
										? <Spinner animation="border" />
										: "Create Team"}
								</Button>
							</div>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div >
	)
}

export default CreateTeamMembers
