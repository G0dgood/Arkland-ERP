


import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination';
import { NoRecordFound, TableFetch } from '../../components/TableOptions';
import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import TableLoader from '../../components/TableLoader';
import { Link } from "react-router-dom";
import storage from '../../utils/storage';

const MyKPIAssessment = ({ setkpidata }: any) => {
	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));



	const [data, setData] = useState<any>([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);


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
			const result = data?.filter((object: any) => {
				// @ts-ignore
				return JSON?.stringify(object)?.toString()?.includes(searchItem);
			});
			setSortData(result);
		}
	}, [data, searchItem]);

	const [displayData, setDisplayData] = useState([]);



	React.useEffect(() => {
		setisLoading(true);
		axios
			.get(`${process.env.REACT_APP_API}/hr/appraisals?employee=${userInfo?.data?.employee?._id}`)
			.then((res: AxiosResponse) => {
				setData(res?.data?.data);
				setkpidata(res?.data?.data?.length);
				setisLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setisLoading(false);
			});
	}, [setkpidata, userInfo?.data?.employee?._id]);





	return (

		<div  >
			{/* <div className='SiteWorkermaindiv'>
				<div className='SiteWorkermaindivsub'>
					<Button variant="contained"
						className="back-btn-icon"
						id="Add-btn-sub"
						onClick={() => navigate("/leave")}>
						<FaArrowLeft size={25} />
					</Button>

					<span className='SupportmainTitleh3'>Leave Applications</span>
				</div>
				<div>
					<EntriesPerPage
						data={data}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<MainSearch placeholder={'Search...          all leave'} />
					{/* <form id="form-inline">
							<input name="q" placeholder="Search ..." type="text" id="search-input" />
							<button type="submit" className="search-btn">Search</button>
						</form> */}
			{/* </div>
			</div> */}
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
			<footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={sortData}
					entriesPerPage={entriesPerPage}
					Total={"Assessment"}
				/>
			</footer>
		</div >
	)
}

export default MyKPIAssessment
