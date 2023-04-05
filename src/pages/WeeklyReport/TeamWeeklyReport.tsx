import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TableLoader from '../../components/TableLoader'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions'
import moment from 'moment'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import axios, { AxiosResponse } from 'axios'
import storage from '../../utils/storage'

const TeamWeeklyReport = () => {
	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));



	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	const [data, setData] = useState<any>([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);

	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");


	const title = "Weekly Reports error";
	const html = message;
	const icon = "error";

	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);
	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	};


	React.useEffect(() => {
		setisLoading(true);
		axios
			.get(`${process.env.REACT_APP_API}/hr/weekly-reports?acknowledged_by=${userInfo?.data?.employee?._id}`)
			.then((res: AxiosResponse) => {
				console.log('res', res)
				setData(res?.data?.data);
				setisLoading(false);
			})
			.catch((err) => {
				setMessage(err?.message)
				setisLoading(false);
			});
	}, [userInfo?.data?.employee?._id]);




	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='SiteWorkermaindiv'>
					<div className='SiteWorkermaindivsub'>
						<span className='SupportmainTitleh3'>Team Week Report</span>
					</div>
					<div>
						<EntriesPerPage
							data={data?.data}
							entriesPerPage={entriesPerPage}
							setEntriesPerPage={setEntriesPerPage}
						/>
					</div>
					<div>
						<MainSearch placeholder={'Search...          Team Weekly Report'} />

					</div>
				</div>
				<section className="md-ui component-data-table">
					{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
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
								{isLoading ? (
									<TableFetch colSpan={8} />
								) : data?.length === 0 || data == null ? (
									<NoRecordFound colSpan={8} />
								) : (
									data?.map((item: any, i: any) => (
										<tr className="data-table-row" key={i}>
											<td className="table-datacell datatype-numeric"> {item?.employee_name}</td>
											<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
											<td className="table-datacell datatype-numeric">{item?.week}</td>
											<td className="table-datacell datatype-numeric">{item?.self_assessment}</td>
											<td className="table-datacell datatype-numeric">
												<Button className={item?.status === "submitted" ? "table-link " : "table-link-active"}>{item?.status}</Button>
											</td>
											<td className="table-datacell datatype-numeric">
												<Link to={`/teamWeeklyreportupdate/${item?._id}`}>

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
			</main>
			{/* <footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={sortData}
					entriesPerPage={entriesPerPage}
					Total={"Assessment"}
				/>
			</footer> */}
		</div >
	)
}

export default TeamWeeklyReport
