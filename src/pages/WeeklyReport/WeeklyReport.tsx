import { useEffect, useState } from 'react'
import WeeklyReportTable from '../../components/table_component/WeeklyReportTable';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdPostAdd } from 'react-icons/md';
import { fireAlert } from '../../utils/Alert';
import { Spinner } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { useAppDispatch } from '../../store/useStore';
import DataService from '../../utils/dataService';
import HttpService from '../../components/HttpService';
import Uploadfile from './Uploadfile';
import { useNavigate } from 'react-router-dom';

const dataService = new DataService()
const WeeklyReport = ({ setIsCheck }: any) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	// @ts-ignore
	const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)



	const [count, setCount] = useState<number>(0)
	const [files, setFile] = useState([]);
	const [inputs, setInputs] = useState<any>({
		assessment: "",
		week: "0",
		activities: [],
	})






	const [newWeeklyField, setNewWeeklyField] = useState<any>([
		{
			id: 1,
			completed: "",
			in_progress: "",
			next: "",
			due_date_for_next: "",
			next_week_tasks: [""],
			issues: [""],
			blockers: [""]
		}
	]);

	// --- Adds New Performance Field --- //
	const handleAddField = () => {
		setCount(count + 1)
		setNewWeeklyField([
			...newWeeklyField,
			{
				id: newWeeklyField.length + 1,
				completed: "",
				in_progress: "",
				next: "",
				due_date_for_next: "",
				next_week_tasks: [""],
				issues: [""],
				blockers: [""]
			}
		]);
	};

	// --- Remove New Weekly Field   --- //
	const handleRemoveField = (index: any) => {
		setCount(count - 1)
		const field = [...newWeeklyField];
		field.splice(index, 1);
		setNewWeeklyField(field);
	};

	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};


	const activities = newWeeklyField?.map((item: any) => ({
		completed: item.completed,
		in_progress: item.in_progress,
		next: item.next,
		due_date_for_next: item.due_date_for_next,
		next_week_tasks: item.next_week_tasks,
		issues: item.issues,
		blockers: item.blockers
	}));

	const allInput = { ...inputs, activities }

	const title = "Successful";
	const html = "Week Report Created!";
	const icon = "success";
	const [isLoading, setisLoading] = useState(false);
	const url = `hr/weekly-reports`


	const [message, setMessage] = useState("");
	const [isSuccess, setisSuccess] = useState(false);

	const blob = files?.map((item: any) => item.file)

	const submitHandler = async () => {

		setisLoading(true)
		const fileObject: any = {}
		// @ts-ignore
		for (let i = 0; i < blob?.length; i++) {
			fileObject[i] = blob[i]
		}

		allInput.activities = JSON.stringify(allInput.activities)
		await HttpService.uploadFile(url, allInput, fileObject, "file")
			.then((response) => {

				setisLoading(false)
				setisSuccess(true)
			})
			.catch((error) => {
				setisLoading(false)
				setMessage(error.response.data.message)
			})
	};



	useEffect(() => {
		if (isSuccess) {
			fireAlert(title, html, icon);
			setInputs({
				assessment: " ",
				week: "",
				activities: []
			})
			setShow(false)
			navigate('/weeklyreport/weeklyreport/myweeklyreport')
		}
	}, [html, setIsCheck, dispatch, isSuccess, message, navigate])


	const [show, setShow] = useState(false);



	return (
		<div className='weeklycontainer'>
			<div>
				<div>
					<div className='weekly-top-container'>
						<div className='weeklyreporttop-container-card-1'>
							<div className='weekly-top-card-1-sub'>
								<p>EMPLOYEE NAME</p>
								<p className='weekly-top-card-1-sub-second-child'>{userInfo?.employee?.full_name.toUpperCase()}</p>
								<p>SELF ASSESSMENT</p>
								<p>{inputs.assessment.toUpperCase()}</p>
								<p>WEEK</p>
								<p>{inputs.week.toUpperCase()}</p>
								<p>DATE</p>
								<p>{moment().format("MM DD YYYY")}</p>
							</div>
						</div>
						<div className='weekly-top-container-card-2'>
							<div className='weekly-grading-system'>
								<p>SELF ASSESSMENT OPTIONS</p>
								<p>Execellent</p>
								<p>Above Average</p>
								<p>Average</p>
								<p>Below Average</p>
							</div>
						</div>
					</div>
					<div className='weekly-report-title'>

						<div>
							<span id='weekly-report-title-text'>SELECT WEEKLY : </span>
							<span>
								<select
									id='weekly-report-select'
									required
									value={inputs.week}
									onChange={(e) => handleOnChange("week", e.target.value)} >
									<option value=""> </option>
									<option value="1">Week 1</option>
									<option value="2">Week 2</option>
									<option value="3">Week 3</option>
									<option value="4">Week 4</option>
									<option value="5">Week 5</option>
								</select> </span>

						</div>

						<div>
							<span id='weekly-report-title-text'>SELF ASSESSMENT OPTIONS : </span>
							<span>		<select
								id='weekly-report-select'
								required
								value={inputs.assessment}
								onChange={(e) => handleOnChange("assessment", e.target.value)}>
								<option value=""></option>
								<option value="excellent">Execellent</option>
								<option value="Above Average">Above Average</option>
								<option value="Average">Average</option>
								<option value="Below Average">Below Average</option>
							</select>
							</span>
						</div>

						<Uploadfile setFile={setFile} files={files} setShow={setShow} show={show} isLoading={isLoading} submitHandler={submitHandler} />
						{count > 0 && <div onClick={handleRemoveField} >
							<Button id='btn-delete-field'>
								<RiDeleteBin5Line size={14} className='btn-delete-field-icon' />
								Delete
							</Button>
						</div>}
						<div >
							<Button onClick={handleAddField} id='btn-delete-field'>
								<MdPostAdd size={15} className='btn-delete-field-icon' />
								Add Field
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div>
				<WeeklyReportTable newWeeklyField={newWeeklyField} setNewWeeklyField={setNewWeeklyField} setInputs={setInputs} inputs={inputs} />
				<div className='WeeKlyReport-submit-container'>
					<div className='file-containal'>
						{!show && <Button className="ccsnl-btn WeeKlyReport-tab"
							onClick={submitHandler}>
							{isLoading ? <Spinner animation="border" /> : "Sumbit"} </Button>}

					</div>
				</div>
			</div>
		</div >
	)
}

export default WeeklyReport