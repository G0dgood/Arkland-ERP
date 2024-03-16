import React, { useEffect, useState } from 'react'
import { NoRecordFound, SearchComponent, TableFetch } from '../../../components/TableOptions';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import ApproveRequest from '../../../components/Modals/ApproveRequest';
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { getListChangeRequests } from '../../../features/PayRoll/payrollSlice';
import TableLoader from '../../../components/TableLoader';

const ApprovalRequests = () => {
	const { getListChangedata, getListChangeisLoading, getListChangeisError, getListChangemessage }: any = useAppSelector((state: any) => state.payroll)
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [displayData, setDisplayData] = useState([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem,] = useState("");
	const data = getListChangedata?.data




	useEffect(() => {
		// @ts-ignore
		dispatch(getListChangeRequests());
	}, [dispatch])

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "8";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);



	const keys = [
		"Name",
		"Salary",
		"Employment Date",
		"Status ",
	];






	return (
		<div id="reports">
			<h5 className="page-title">Approval Requests</h5>

			<ul className="nav-tabs-btn mb-3">
			</ul>
			<div className='half-background'>
				<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={entriesPerPage} parameter={false} addemployee={true} placeholder={"Employees"} CSV={true} ApprovalRequests={true} />

				<section className="md-ui component-data-table">
					{getListChangeisLoading ? <TableLoader isLoading={getListChangeisLoading} /> : ""}
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row">
									{keys.map((i, index) => {
										return (
											<>
												<td
													className="table-datacell datatype-numeric"
													key={index} >
													{i}
												</td>
											</>
										);
									})}
								</tr>
							</thead>

							<tbody className="data-table-content">
								{
									false ? (
										<TableFetch colSpan={8} />
									) : data?.length === 0 || data == null ? (
										<NoRecordFound colSpan={8} />
									) : (

										data?.map((item: any, index: any) => (
											<tr key={index} className="data-table-row">
												<td className="table-datacell datatype-numeric">
													<h4>{item?.employee?.first_name}</h4>
													<p style={{ fontSize: "12px", color: "#808080" }}>{item?.employee?.tally_number}</p>
												</td>
												<td className="table-datacell datatype-numeric">-</td>
												<td className="table-datacell datatype-numeric">₦{item?.changes[0]?.current_value}</td>
												<td className="table-datacell datatype-numeric">
													{item?.status === "approved" ? <button id='approved'>Approved</button> : item?.status === "rejected" ? <ApproveRequest item={item} id={item.id} /> : <ApproveRequest />}
													{/* {item?.status === "approved" ? <button id='approved'>Approved</button> : item?.status === "rejected" ? <button id='rejected'>rejected</button> : <ApproveRequest />} */}

												</td>
											</tr>
										))
									)}
							</tbody>
						</table>
					</div>
				</section>
				<footer className="main-table-footer">

					<div className="paginations">
						<ul>
							<li className="prev">
								<a >
									<MdArrowBackIos />
								</a>
							</li>
							<li><a >1</a></li>
							<li className="active"><a >2</a></li>
							<li><a >3</a></li>
							<li><a >4</a></li>
							<li><a >5</a></li>
							<li><span className="delimeter">...</span></li>
							<li><a >8</a></li>
							<li className="next">
								<a ><MdArrowForwardIos /></a></li>
						</ul>
					</div>
					{/* <Pagination
						setDisplayData={setDisplayData}
						data={sortData}
						entriesPerPage={entriesPerPage}
						Total={"Employee"}
					/> */}
				</footer>
			</div>
		</div>
	)
}
export default ApprovalRequests
