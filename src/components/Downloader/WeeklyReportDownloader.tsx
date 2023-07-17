import React from "react";
import { CSVLink } from "react-csv";
import moment from "moment";
import { Button } from "@material-ui/core";
import { AiOutlineDownload } from "react-icons/ai";

const WeeklyReportDownloader = ({ data }: any) => {
	const headers = [
		{ label: "FULL NAME", key: "employee_name" },
		{ label: "EMPLOYEE SUPERVISOR", key: "employee_supervisor" },
		{ label: "MONTH CREATED", key: "month_created" },
		{ label: "WEEK", key: "week" },
		{ label: "WEEK DAY CREATED", key: "week_day_created" },
		{ label: "SELF ASSESSMENT", key: "self_assessment" },
		{ label: "DATE CREATED", key: "created_at" },
		{ label: "YEAR CREATED", key: "year_created" },
		{ label: "ACTIVITIES", key: "activities" },
	];

	const loopData = (data: any) => {
		const newData: any = [];
		data?.forEach((item: any) => {
			newData.push({
				employee_name: item.employee_name,
				employee_supervisor: item.employee_supervisor,
				month_created: item.month_created === 1 ? "January" :
					item.month_created === 2 ? "February" :
						item.month_created === 3 ? "March" :
							item.month_created === 4 ? "April" :
								item.month_created === 5 ? "May" :
									item.month_created === 6 ? "June" :
										item.month_created === 7 ? "July" :
											item.month_created === 8 ? "August" :
												item.month_created === 9 ? "September" :
													item.month_created === 10 ? "October" :
														item.month_created === 11 ? "November" : "December",
				week: item.week === 1 ? "Monday" :
					item.week === 2 ? "Tuesday" :
						item.week === 3 ? "Wednesday" :
							item.week === 4 ? "Thursday" :
								item.week === 5 ? "Friday" :
									item.week === 6 ? "Saturday" : "Sunday",
				week_day_created: item?.week_day_created,
				self_assessment: item?.self_assessment,
				employment_date: moment(item?.created_at).format("DD-MM-YYYY") === "Invalid date" ? "No Date Given" : moment(item?.created_at).format("DD-MM-YYYY"),
				year_created: item?.year_created,
				activities: item?.activities,
			});
		});
		return newData;
	};
	const exportData = loopData(data);

	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();

	const csvdate =
		"EMPLOYEE WEEKLY REPORT  [" + day + "-" + month + "-" + year + "].csv";

	return (
		<CSVLink data={exportData} headers={headers} filename={csvdate}>

			<Button
				variant="contained"
				className="add-experience" >
				<AiOutlineDownload size={20} />
				Download Report
			</Button>
		</CSVLink>
	);
};


export default WeeklyReportDownloader
