import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BsCheckCircle, BsDownload } from 'react-icons/bs';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import CreateWarningModal from '../../components/Modals/CreateWarningModal';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions';

const AllLeaveApplications = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);

	useEffect(() => {
		setisLoading(true)
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setisLoading(false)
			})
			.catch((err) => {
				console.log(err);
				setisLoading(false)
			});
	}, []);

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
						<Button variant="contained"
							className="back-btn-icon"
							id="Add-btn-sub"
							onClick={() => navigate("/allemployees")}>
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
					<Button variant="outlined" className="show-btn">
						Download-csv {" "} <FaDownload />
					</Button>
					<div>
						{/* <MainSearch placeholder={'Search...          Warnings'} /> */}
						<form id="form-inline">
							<input name="q" placeholder="Search ..." type="text" id="search-input" />
							<button type="submit" className="search-btn">Search</button>
						</form>
					</div>
				</div>
				<section className="md-ui component-data-table">

					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">Email Address</td>
									<td className="table-datacell datatype-numeric">Leave Type</td>
									<td className="table-datacell datatype-numeric">Start Date</td>
									<td className="table-datacell datatype-numeric">No of Days</td>
									<td className="table-datacell datatype-numeric">HOD Approval</td>
									<td className="table-datacell datatype-numeric">Final Approval</td>
									<td className="table-datacell datatype-numeric">ACTION</td>

								</tr>
							</thead>
							<tbody className="data-table-content">
								{isLoading ? (
									<TableFetch colSpan={8} />
								) : displayData?.length === 0 || displayData == null ? (
									<NoRecordFound colSpan={8} />
								) : (
									displayData.map((item: any, i: any) => (
										<tr className="data-table-row">
											<td className="table-datacell datatype-numeric">jamesb@arklandstructuresltd.com</td>
											<td className="table-datacell datatype-numeric">25-08-2022</td>
											<td className="table-datacell datatype-numeric">31-08-2022</td>
											<td className="table-datacell datatype-numeric">5</td>
											<td className="table-datacell datatype-numeric">
												<BsCheckCircle size={25} color={"red"} className="icon-bold" /></td>
											<td className="table-datacell datatype-numeric">
												<BsCheckCircle size={25} color={"green"} />
											</td>
											<td className="table-datacell datatype-numeric">
												<Button id="team-applicatiom-update">View</Button>
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
						Total={"Employee"}
					/>
				</footer>
			</main>
		</div>
	)
}

export default AllLeaveApplications
