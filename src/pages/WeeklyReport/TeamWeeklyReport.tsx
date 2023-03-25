import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableLoader from '../../components/TableLoader'
import { NoRecordFound, TableFetch } from '../../components/TableOptions'
import moment from 'moment'

const TeamWeeklyReport = () => {
	const [data, setData] = useState<any>([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);



	const [displayData, setDisplayData] = useState([]);

	return (
		<div  >

			<section className="md-ui component-data-table">
				{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-name">Full Name</td>
								<td className="table-datacell datatype-numeric">Year</td>
								<td className="table-datacell datatype-numeric">Month</td>
								<td className="table-datacell datatype-numeric">Average</td>
								<td className="table-datacell datatype-numeric">status</td>
								<td className="table-datacell datatype-numeric">Action</td>

							</tr>
						</thead>
						<tbody className="data-table-content">
							{isLoading ? (
								<TableFetch colSpan={8} />
							) : displayData?.length === 0 || displayData == null ? (
								<NoRecordFound colSpan={8} />
							) : (
								displayData?.map((item: any, i: any) => (
									<tr className="data-table-row" key={i}>
										<td className="table-datacell datatype-numeric"> {item?.employee_name}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
										<td className="table-datacell datatype-numeric">{
											item?.month === 1 ? 'January' :
												item?.month === 2 ? 'February' :
													item?.month === 3 ? "March" :
														item?.month === 4 ? "April" :
															item?.month === 5 ? "May" :
																item?.month === 6 ? "June" :
																	item?.month === 7 ? "July" :
																		item?.month === 8 ? "	August" :
																			item?.month === 9 ? "September" :
																				item?.month === 10 ? "October" :
																					item?.month === 11 ? "November" :
																						item?.month === 12 ? "December" : ''}</td>
										<td className="table-datacell datatype-numeric">{item?.performance_percentage_employee}%</td>
										<td className="table-datacell datatype-numeric">
											<Button className={item?.status === 'active' ? "table-link-active" : "table-link"}>{item?.status === 'active' ? 'Completed' : item?.status}</Button>
										</td>
										<td className="table-datacell datatype-numeric">
											{/* <ViewKPImodal id={item?._id} /> */}
											{/* <Link to={`/kpidetails/${item?.employee}`}  > */}
											<Link to={`/kpidetails/${item?._id}`}  >

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
