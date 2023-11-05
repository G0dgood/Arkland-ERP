import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/TableLoader";
import {
	NoRecordFound,
	SearchComponent,
	TableFetch,
} from "../../components/TableOptions";
import { getHOD } from "../../features/HOD/hodSlice";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import CreateHODModal from "../../components/Modals/CreateHODModal";
import { Button } from "@material-ui/core";



const HODList = () => {
	const { data, isLoading } = useAppSelector((state: any) => state.hod)
	const { createisSuccess } = useAppSelector((state: any) => state.hod)
	const [displayData, setDisplayData] = useState([]);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();



	useEffect(() => {
		dispatch(getHOD());
		if (createisSuccess) {
			dispatch(getHOD());
		}
	}, [createisSuccess, dispatch]);


	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "8";
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






	return (

		<div id="reports">
			<h5 className="page-title">HOD List</h5>
			<ul className="nav-tabs-btn mb-3">
				<CreateHODModal />
			</ul>
			<div className='half-background'>
				<SearchComponent sortData={data} entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} placeholder={"HOD"} />
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

													<Button id="view-status" onClick={() => navigate(`/hod/hod/viewhod/${item.id}`)}>View</Button>

												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</section>
			</div >
			<footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={data}
					entriesPerPage={entriesPerPage}
					Total={"HOD"}
				/>
			</footer>
		</div >
	);
};

export default HODList
	;
