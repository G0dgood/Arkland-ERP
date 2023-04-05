import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BsCheckCircle, BsClock } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions';
import moment from 'moment';
import Cookies from 'js-cookie';
import storage from '../../utils/storage';
import TableLoader from '../../components/TableLoader';
import { SlClose } from 'react-icons/sl';
import axios, { AxiosResponse } from 'axios';

const AllLeaveApplications = () => {

	const navigate = useNavigate();
	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));
	const token = Cookies.get("token");
	const [data, setData] = useState([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [leaveid, setLeaveid] = useState(0);
	const [showLeave, setShowLeave] = useState(false)
	const [message, setMessage] = useState("");
	const [isError, setisError] = useState(false)
	const [isSuccess, setisSuccess] = useState(false);

	useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/leaves`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data?.success === false) {
					setMessage(data?.message)
					setisError(true)
				} else {
					setSortData(data?.data?.data)
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});
	}, [token, userInfo?.data?.department?.id])


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

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);

	useEffect(() => {
		if (data) {
			const result = data?.filter((object) => {
				// @ts-ignore
				return JSON?.stringify(object)?.toString()?.includes(searchItem);
			});
			setSortData(result);
		}

	}, [data, searchItem]);

	const [displayData, setDisplayData] = useState([]);




	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='SiteWorkermaindiv'>
					<div className='SiteWorkermaindivsub'>


						<span className='SupportmainTitleh3'>All Leave Applications</span>
					</div>
					<div>
						<EntriesPerPage
							data={sortData}
							entriesPerPage={entriesPerPage}
							setEntriesPerPage={setEntriesPerPage}
						/>
					</div>
					<div>
						<MainSearch placeholder={'Search...         Leave Applications'} />

					</div>
				</div>
				<section className="md-ui component-data-table">
					{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row" >
									<td className="table-datacell datatype-numeric">Date Applied</td>
									<td className="table-datacell datatype-numeric">Leave  Type</td>
									<td className="table-datacell datatype-numeric">Start Date</td>
									<td className="table-datacell datatype-numeric">End Date</td>
									<td className="table-datacell datatype-numeric">HOD Approval</td>
									<td className="table-datacell datatype-numeric">HR Approval</td>
									<td className="table-datacell datatype-numeric">Final Approval</td>
									<td className="table-datacell datatype-numeric">Leave Status</td>
									<td className="table-datacell datatype-numeric">View</td>

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
											<td className="table-datacell datatype-numeric">{moment(item?.updated_at).format("DD-MM-YYYY")}</td>
											<td className="table-datacell datatype-numeric">{item?.type}</td>
											<td className="table-datacell datatype-numeric">{moment(item?.start_date).format("DD-MM-YYYY")}</td>
											<td className="table-datacell datatype-numeric">{moment(item?.end_date).format("DD-MM-YYYY")}</td>
											<td className="table-datacell datatype-numeric">
												{item?.hod_approved ?
													<BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
														<SlClose size={25} color={"red"} className="icon-bold" /> :
														<BsClock size={25} color={"#bf8412"} className="icon-bold" />}
											</td>
											<td className="table-datacell datatype-numeric">
												{item?.hr_approved ?
													<BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
														<SlClose size={25} color={"red"} className="icon-bold" /> :
														<BsClock size={25} color={"#bf8412"} className="icon-bold" />}
											</td>
											<td className="table-datacell datatype-numeric">
												{item?.finally_approved ?
													<BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
														<SlClose size={25} color={"red"} className="icon-bold" /> :
														<BsClock size={25} color={"#bf8412"} className="icon-bold" />}
											</td>
											<td className="table-datacell datatype-numeric">
												<Button className={item?.hod_approved === false && item?.status !== "rejected" ? "table-link" : item?.hod_approved === true ? "table-link-active" : "table-link-reject"}>{item?.hod_approved === false && item?.status !== "rejected" ? "IN PROGRESS" : item?.status === "rejected" ? "Rejected" : 'LEAVE APPROVED'}</Button>
											</td>
											<td className="table-datacell datatype-numeric">
												<Link to={`/hrupdateleave/${item?._id}`}  >
													{item?.status === "rejected" ? "" :
														<Button id="team-applicatiom-update">{item?.hr_approved === false ? "Update" : "View"}</Button>}
												</Link>
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
						Total={"All Leave Applications"}
					/>
				</footer>
			</main>
		</div>
	)
}

export default AllLeaveApplications
