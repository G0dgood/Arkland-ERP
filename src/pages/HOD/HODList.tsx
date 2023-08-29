import { useEffect, useState } from "react";
import { FiCheckCircle, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import {
	MainSearch,
	NoRecordFound,
	TableFetch,
} from "../../components/TableOptions";
import { getHOD } from "../../features/HOD/hodSlice";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import CreateHODModal from "../../components/Modals/CreateHODModal";



const HODList = () => {
	const { data, isLoading } = useAppSelector((state: any) => state.hod)
	const { createisSuccess } = useAppSelector((state: any) => state.hod)
	const dispatch = useAppDispatch();
	const navigate = useNavigate();



	useEffect(() => {
		dispatch(getHOD());
		if (createisSuccess) {
			getHOD()
		}
	}, [createisSuccess, dispatch]);


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
	];



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
						</div>

						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<MainSearch
								//  setSearchItem={setSearchItem}
								// searchItem={searchItem}
								placeholder={"Search...          HOD"} />
							<span style={{ marginLeft: "20px" }}>
								<CreateHODModal />
							</span>
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
													<td className="table-datacell datatype-numeric" key={index} >
														{i.title}
													</td>
												</>);
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
												<td className="table-datacell ">
													{item?.name}
												</td>
												<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
												<td className="table-datacell datatype-numeric">
													{item?.status}
												</td>
												<td className="table-datacell datatype-numeric">
													<div className="table-active-items" key={i}>
														{/* <span> */}
														{item?.status === "in review" ? (
															<span
																className="edit-icon-color"
																title="Approve employee"
																color="#d32f2f"
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
															onClick={() => navigate(`/hod/hod/viewhod/${item.id}`)}
														>
															<FiEye
																size={25}
																title="View Employee"
																color="green"
															/>
														</span>
													</div>
												</td>
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
