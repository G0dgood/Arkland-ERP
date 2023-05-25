import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiEye } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import {
	MainSearch,
	NoRecordFound,
	TableFetch,
} from "../../components/TableOptions";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { getUserPrivileges } from "../../functions/auth";
import { fireAlert } from "../../utils/Alert";
import { getHOD } from "../../features/HOD/hodSlice";
import moment from "moment";


const HODList = ({ setEmployee, setData }: any) => {
	const { data, isError, isLoading, message } = useAppSelector((state: any) => state.hod)

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		// @ts-ignore
		dispatch(getHOD());
	}, [dispatch]);

	const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();
	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);




	const header = [
		{ title: "FULL NAME", prop: "full_name" },
		{ title: "CREATED AT", prop: "created_at" },
		{ title: "STATUS", prop: "status" },
		{ title: "VIEW", prop: "view" },
		{ title: "ACTION", prop: "action" },
	];


	const title = "Successful";
	const html = "HOD Deleted!";
	const icon = "success";
	const title1 = "Delete HOD error";
	const html1 = message;
	const icon1 = "error";


	useEffect(() => {
		if ("") {
			fireAlert(title, html, icon);
		} else if (isError) {
			fireAlert(title1, html1, icon1);
		}
	}, [html, html1, isError,])


	const [displayData, setDisplayData] = useState([]);

	return (
		<div  >

			<div>
				<div className="allemployees-container">
					<div className="allemployees-container-main">
						<div className="SiteWorkermaindivsub">
							<span className="SupportmainTitleh3">HOD List</span>
						</div>
						<div >
							{(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
								<Button
									variant="contained"
									className="Add-btn"
									onClick={() => navigate("/createemployee")}
								// onClick={handleCreateEmployeeClick}
								>
									<GoPlus className="icon-space" />
									Create HOD
								</Button>
							)}
						</div>

						<div>
							<MainSearch
								//  setSearchItem={setSearchItem}
								// searchItem={searchItem}
								placeholder={"Search...          HOD"} />
						</div>


					</div>
					<section className="md-ui component-data-table">
						{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
						<div className="main-table-wrapper">
							<table className="main-table-content">
								<thead className="data-table-header">
									<tr className="data-table-row">
										{header.map((i, index) => {
											return (
												<>
													<td
														className="table-datacell datatype-numeric"
														key={index}
													>
														{i.title}
													</td>
												</>
											);
										})}
									</tr>
								</thead>
								<tbody className="data-table-content">
									{false ? (
										<TableFetch colSpan={9} />
									) : displayData?.length === 0 || displayData === undefined ? (
										<NoRecordFound colSpan={9} />
									) : (
										displayData?.map((item: any, i: any) => (
											<tr className="data-table-row" key={i}>
												<td className="table-datacell datatype-numeric">
													{item?.name}
												</td>
												<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
												<td className="table-datacell datatype-numeric">
													{item?.status}
												</td>
												<td className="table-datacell datatype-numeric">
													<div className="table-active-items">
														{/* <span> */}
														{item?.status === "in review" ? (
															<span
																className="edit-icon-color"
																title="Approve employee"
																color="#d32f2f"
															// onClick={() => handleApproval(item?.id)}
															>
																<FiCheckCircle
																	size={25}
																	title="Approve Employee"
																	color="green"
																/>
															</span>
														) : (
															""
														)}

														<span
															className="lock-icon-color"
															title="View employee "
															style={{
																marginLeft: "10px",
															}}
															onClick={() => navigate(`/employees/${item.id}`)}
														>
															<FiEye
																size={25}
																title="View Employee"
																color="green"
															/>
														</span>
														{/* </span> */}
													</div>
												</td>
												<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</section>
				</div>
				<footer className="main-table-footer">
					<Pagination
						setDisplayData={setDisplayData}
						data={data}
						entriesPerPage={entriesPerPage}
						Total={"HOD"}
					/>
				</footer>
			</div>
		</div>
	);
};

export default HODList
	;
