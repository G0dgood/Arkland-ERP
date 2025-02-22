import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import TableLoader from "../../components/TableLoader";
import {
	NoRecordFound,
	SearchComponent,
	TableFetch,
} from "../../components/TableOptions";
import Pagination from "../../components/Pagination";

import createHttpService from "../../components/HttpService";


const TeamAttendance = () => {

	const [mydata, setData] = useState([])
	const [myisLoading, setisLoading] = useState(false)


	useEffect(() => {
		getData()
	}, [])


	const getData = async () => {
		const HttpService = createHttpService();
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

		<div id="reports">
			<h5 className="page-title">Team Attendance</h5>
			<div className='half-background mt-4'>
				<SearchComponent sortData={mydata} entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} placeholder={"Team Attendance"} />
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
		</div>
	);
};

export default TeamAttendance;


