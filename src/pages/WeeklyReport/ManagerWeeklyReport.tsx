import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableLoader from '../../components/TableLoader'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions'
import moment from 'moment'
import Pagination from '../../components/Pagination'
import WeeklyReportDownloader from '../../components/Downloader/WeeklyReportDownloader'
import { managerReport } from '../../features/WeeklyReport/WeeklyReportSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import Lightboxs from '../../components/Lightboxs'

const ManagerWeeklyReport = () => {
	const dispatch = useAppDispatch();
	const { managerdata, managerisLoading } = useAppSelector((state: any) => state.Weeklyreport)


	useEffect(() => {

		dispatch(managerReport());
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
					<span className='SupportmainTitleh3'>Employee Weekly Report</span>
				</div>
				<div>
					<EntriesPerPage
						data={managerdata?.data}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<MainSearch placeholder={'Search...          Team Weekly Report'} />
					<span style={{ marginLeft: '20px' }}>
						<WeeklyReportDownloader data={managerdata} />
					</span>
				</div>
			</div>
			<section className="md-ui component-data-table">
				{managerisLoading ? <TableLoader isLoading={managerisLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-name">Full Name</td>
								<td className="table-datacell datatype-numeric">Year</td>
								<td className="table-datacell datatype-numeric">Week</td>
								<td className="table-datacell datatype-numeric">Self Assessment</td>
								<td className="table-datacell datatype-numeric">File</td>
								<td className="table-datacell datatype-numeric">status</td>
								<td className="table-datacell datatype-numeric">Action</td>

							</tr>
						</thead>
						<tbody className="data-table-content">
							{managerisLoading ? (
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
										<td className="table-datacell datatype-numeric"><Lightboxs img={item?.attachments} /></td>
										<td className="table-datacell datatype-numeric">
											<Button className={item?.status === "submitted" ? "table-link " : "table-link-active"}>{item?.status}</Button>
										</td>
										<td className="table-datacell datatype-numeric">
											<Link to={`/weeklyreport/weeklyreport/manager/view/${item?._id}`}>

												<Button id="team-applicatiom-update">View</Button>
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
					data={managerdata}
					entriesPerPage={entriesPerPage}
					Total={"Assessment"}
				/>
			</footer>

		</div >
	)
}

export default ManagerWeeklyReport
