import { useEffect, useState } from 'react'
import WeeklyReportTable from '../../components/table_component/WeeklyReportTable';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdPostAdd } from 'react-icons/md';
import Cookies from 'js-cookie';
import { fireAlert } from '../../utils/Alert';
import { Spinner } from 'react-bootstrap';
import storage from '../../utils/storage';
import { Button } from '@material-ui/core';
import moment from 'moment';

const WeeklyReport = ({ setIsCheck }: any) => {

	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));


	const token = Cookies.get("token");
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [count, setCount] = useState<number>(0)


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

	const allinput = { ...inputs, activities }



	const title = "Successful";
	const html = "Week Report Created!";
	const icon = "success";
	const title1 = "Week Report error";
	const html1 = message;
	const icon1 = "error";

	const handleLeave = () => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/weekly-reports`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(allinput),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data?.success === false) {
					setMessage(data?.message)
					setisError(true)
				} else {
					setisSuccess(true)
					setTimeout(() => {
						setIsCheck(false)
					}, 2000);
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});
	}


	useEffect(() => {
		if (isSuccess) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisSuccess(false)
				setMessage("")
				setInputs({
					assessment: " ",
					week: "",
					activities: []
				})
				// setNewWeeklyField(
				// 	{
				// 		completed: "",
				// 		in_progress: "",
				// 		next: "",
				// 		due_date_for_next: "",
				// 		next_week_tasks: [""],
				// 		issues: [""],
				// 		blockers: [""]
				// 	}
				// )
			}, 5000);
		} else if (isError) {
			fireAlert(title1, html1, icon1);
			setTimeout(() => {
				setisError(false)
				setMessage("")
				setInputs({
					assessment: " ",
					week: "",
					activities: [
						{
							completed: "",
							in_progress: "",
							next: "",
							due_date_for_next: "",
							next_week_tasks: [""],
							issues: [""],
							blockers: [""]
						}
					]
				})
			}, 5000);
		}
	}, [html, html1, isError, isSuccess])

	return (
		<div className='weeklycontainer'>
			<div>
				<div>
					<div className='weekly-top-container'>
						<div className='weeklyreporttop-container-card-1'>
							<div className='weekly-top-card-1-sub'>
								<p>EMPLOYEE NAME</p>
								<p className='weekly-top-card-1-sub-second-child'>{userInfo?.data?.employee?.full_name.toUpperCase()}</p>
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


						<div >
							<Button onClick={handleAddField} id='btn-delete-field'>
								<MdPostAdd size={15} className='btn-delete-field-icon' />
								Add Field
							</Button>
						</div>
						{count > 0 && <div onClick={handleRemoveField} >
							<Button id='btn-delete-field'>
								<RiDeleteBin5Line size={14} className='btn-delete-field-icon' />
								Delete
							</Button>
						</div>}
					</div>
				</div>
			</div>
			<div>
				<WeeklyReportTable newWeeklyField={newWeeklyField} setNewWeeklyField={setNewWeeklyField} setInputs={setInputs} inputs={inputs} />
				<div className='WeeKlyReport-submit-container'>
					<button className="ccsnl-btn WeeKlyReport-tab"
						onClick={handleLeave}>
						{isLoading ? <Spinner animation="border" /> : "Sumbit"} </button>
				</div>
			</div>
		</div >
	)
}

export default WeeklyReport