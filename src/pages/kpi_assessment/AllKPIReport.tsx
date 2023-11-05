import { useEffect, useState } from 'react'
import { NoRecordFound, SearchComponent, TableFetch } from '../../components/TableOptions'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import DataService from '../../utils/dataService'
import TableLoader from '../../components/TableLoader'
import moment from 'moment'
import Pagination from '../../components/Pagination'
import { allAssessment } from '../../features/KPIAssessment/assessmentSlice'



const dataService = new DataService()
const AllKPIReport = () => {

	const dispatch = useAppDispatch();
	const { allkpidata, allkpiisLoading } = useAppSelector((state: any) => state.assessment)

	// @ts-ignore
	const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)

	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");

	const navigate = useNavigate();



	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});


	useEffect(() => {
		if (allkpidata) {
			const result = allkpidata?.data?.filter((object: any) => {
				// @ts-ignore
				return JSON?.stringify(object)?.toString()?.includes(searchItem);
			});
			setSortData(result);
		}
	}, [allkpidata, searchItem]);

	const [displayData, setDisplayData] = useState([]);
	const id = userInfo?.data?.employee?._id

	useEffect(() => {
		// @ts-ignore
		dispatch(allAssessment());
	}, [dispatch, id]);

	const handleView = (item: any) => {
		navigate(`/kpiassessment/adminkpiassessment/teamkpi/view/${item?._id}`, { state: { name: 'admin' } })
	}



	function getMonthName(month: number) {
		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];

		return monthNames[month - 1] || ''; // Subtract 1 to get the correct index, and return an empty string for invalid values.
	}


	return (
		<div id="reports">
			<h5 className="page-title">KPI Assessment</h5>

			<div className='half-background mt-4'>
				<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={entriesPerPage} placeholder={"Search KPI"} />

				<section className="md-ui component-data-table">
					{allkpiisLoading ? <TableLoader isLoading={allkpiisLoading} /> : ""}
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row">
									<td className="table-datacell  ">FULL NAME</td>
									<td className="table-datacell datatype-numeric">YEAR</td>
									<td className="table-datacell datatype-numeric">MONTH</td>
									<td className="table-datacell datatype-numeric">AVERAGE</td>
									<td className="table-datacell datatype-numeric">STATUS</td>
									<td className="table-datacell datatype-numeric">ACTION</td>
								</tr>
							</thead>
							<tbody className="data-table-content">
								{allkpiisLoading ? (
									<TableFetch colSpan={8} />
								) : displayData?.length === 0 || displayData === undefined ? (
									<NoRecordFound colSpan={8} />
								) : (
									displayData.map((item: any, i: any) => (
										<tr className="data-table-row" key={i}>
											<td className="table-datacell ">
												{item.employee_name}
											</td>
											<td className="table-datacell datatype-numeric">
												{moment(item?.created_at).format("DD-MM-YYYY")}
											</td>
											<td className="table-datacell datatype-numeric" key={i}>
												{getMonthName(item?.month)}
											</td>
											<td className="table-datacell datatype-numeric">
												{item?.performance_percentage_employee}%
											</td>
											<td className="table-datacell datatype-numeric" key={i}>
												<div className={item?.status === "active"
													? "status is-green  move-svg-left"
													: "status is-wait move-svg-left"}  >
													{item?.status === "active"
														? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
															<path d="M20 6L9 17l-5-5" />
														</svg>
														: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader">
															<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
														</svg>}
													{item?.status === "active" ? "Completed" : item?.status}
												</div>
											</td>
											<td className="table-datacell datatype-numeric" key={i}>

												{/* @ts-ignore */}
												<Button id="view-status" onClick={() => handleView(item)}>
													View
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
						data={sortData}
						entriesPerPage={entriesPerPage}
						Total={"Assessment"}
					/>
				</footer>
			</div>
		</div>
	)
}

export default AllKPIReport
