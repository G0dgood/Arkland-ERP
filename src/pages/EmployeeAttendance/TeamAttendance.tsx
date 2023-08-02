import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import TableLoader from "../../components/TableLoader";
import {
	EntriesPerPage,
	MainSearch,
	NoRecordFound,
	TableFetch,
} from "../../components/TableOptions";
import { useAppDispatch } from "../../store/useStore";
import HttpService from "../../components/HttpService";
import Pagination from "../../components/Pagination";


const TeamAttendance = () => {
	const dispatch = useAppDispatch();

	const [mydata, setData] = useState([])
	const [myisLoading, setisLoading] = useState(false)


	useEffect(() => {
		getData()
	}, [])


	const getData = async () => {
		setisLoading(true)
		try {
			const teamsUrl = "hr/attendances/list/for-teams"
			const teams: any = await HttpService.get(teamsUrl)
			setData(teams?.data?.data)


			setisLoading(false)

		} catch (error) {
			setisLoading(false)
		}
	}


	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});



	const header = [
		{ title: "NAME", prop: "employee_name" },
		{ title: "DEPARTMENT", prop: "employee_department" },
		{ title: "ARRIVAL", prop: "time_in" },
		{ title: "WEEK DAY", prop: "week_day_created" },
		{ title: "CHECKED-IN OFFICE", prop: "ip_checked" },
		{ title: "HR ASSISTED CHECK-IN", prop: "is_hr_assisted" },
		// { title: "DATE", prop: "created_at" },
		// { title: "ACTION" },
	];

	const [displayData, setDisplayData] = useState([]);

	return (
		<div  >
			<div className="SiteWorkermaindiv">
				<div className="SiteWorkermaindivsub">
					<span className="SupportmainTitleh3">Team Attendance</span>
				</div>
				<div>
					<EntriesPerPage
						data={mydata}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<MainSearch placeholder={"Search...          Attendance"} />
				</div>
			</div>
			<section className="md-ui component-data-table">
				{myisLoading ? <TableLoader isLoading={myisLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row">
								{header.map((i, index) => {
									return (
										<>
											<td className="table-datacell datatype-numeric"
												key={index}>
												{i.title}
											</td>
										</>
									);
								})}
							</tr>
						</thead>
						<tbody className="data-table-content">
							{myisLoading ? (
								<TableFetch colSpan={8} />
							) : mydata?.length === 0 || mydata == null ? (
								<NoRecordFound colSpan={8} />
							) : (
								displayData?.map((item: any, i: any) => (
									<tr className="data-table-row" key={i}>
										<td className="table-datacell  ">
											{item?.employee_name}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.employee_department?.name}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.week_day_created}
										</td>
										<td className="table-datacell datatype-numeric">
											{new Date(item?.time_in).toLocaleString()}
										</td>
										<td className="table-datacell datatype-numeric">
											<Button
												className={
													item?.ip_checked === true
														? "table-link"
														: "table-link-active"
												}
											>
												{item?.ip_checked === true ? "Yes" : "No"}
											</Button>
										</td>
										<td className="table-datacell datatype-numeric">
											<Button
												className={
													item?.is_hr_assisted === true
														? "table-link"
														: "table-link-active"} >
												{item?.is_hr_assisted === true ? "Yes" : "No"}
											</Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</section>

			<footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={mydata}
					entriesPerPage={entriesPerPage}
					Total={"Team Attendance"}
				/>
			</footer>
		</div>
	);
};

export default TeamAttendance;


