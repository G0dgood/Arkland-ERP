import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableLoader from '../../components/TableLoader'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions'
import moment from 'moment'
import Pagination from '../../components/Pagination'
import WeeklyReportDownloader from '../../components/Downloader/WeeklyReportDownloader'

import { getHODWeeklyReport } from '../../features/WeeklyReport/WeeklyReportSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'


const TeamWeeklyReport = () => {
	const dispatch = useAppDispatch();
	const { HODdata, HODisLoading } = useAppSelector((state: any) => state.Weeklyreport)


	useEffect(() => {
		// @ts-ignore
		dispatch(getHODWeeklyReport());
	}, [dispatch]);


	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});






	const [displayData, setDisplayData] = useState([]);

	return (
		<div  >
			<div className='SiteWorkermaindiv'>
				<div className='SiteWorkermaindivsub'>
					<span className='SupportmainTitleh3'>Team Weekly Report</span>
				</div>
				<div>
					<EntriesPerPage
						data={HODdata?.data}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<MainSearch placeholder={'Search...          Team Weekly Report'} />
					<span style={{ marginLeft: '20px' }}>
						<WeeklyReportDownloader data={HODdata} />
					</span>
				</div>
			</div>
			<section className="md-ui component-data-table">
				{HODisLoading ? <TableLoader isLoading={HODisLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-name">Full Name</td>
								<td className="table-datacell datatype-numeric">Year</td>
								<td className="table-datacell datatype-numeric">Week</td>
								<td className="table-datacell datatype-numeric">Self Assessment</td>
								<td className="table-datacell datatype-numeric">status</td>
								<td className="table-datacell datatype-numeric">Action</td>

							</tr>
						</thead>
						<tbody className="data-table-content">
							{HODisLoading ? (
								<TableFetch colSpan={8} />
							) : displayData?.length === 0 || displayData == null ? (
								<NoRecordFound colSpan={8} />
							) : (
								displayData?.map((item: any, i: any) => (
									<tr className="data-table-row" key={i}>
										<td className="table-datacell datatype-numeric"> {item?.employee_name}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
										<td className="table-datacell datatype-numeric">{item?.week}</td>
										<td className="table-datacell datatype-numeric">{item?.self_assessment}</td>
										<td className="table-datacell datatype-numeric">
											<Button className={item?.status === "submitted" ? "table-link " : "table-link-active"}>{item?.status}</Button>
										</td>
										<td className="table-datacell datatype-numeric">
											<Link to={`/weeklyreport/weeklyreport/update/${item?._id}`}>

												<Button id="team-applicatiom-update">	{item?.status === "acknowledged" ? 'View' : 'Update'}</Button>
											</Link>

										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

			</section >
			<footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={HODdata}
					entriesPerPage={entriesPerPage}
					Total={"Assessment"}
				/>
			</footer>

		</div >
	)
}

export default TeamWeeklyReport
