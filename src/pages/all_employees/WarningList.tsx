import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions';
import Pagination from "../../components/Pagination";
import CreateWarningModal from '../../components/Modals/CreateWarningModal';

const WarningList = () => {

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
						<Button variant="contained" className="back-btn-icon" id="Add-btn-sub" onClick={() => navigate("/allemployees")}>
							<FaArrowLeft size={25} />
						</Button>

						<span className='SupportmainTitleh3'>
							<CreateWarningModal />
						</span>
					</div>
					<div>
						<EntriesPerPage
							data={data}
							entriesPerPage={entriesPerPage}
							setEntriesPerPage={setEntriesPerPage}
						/>
					</div>
					<div>
						<MainSearch placeholder={'Search...          Warnings'} />
					</div>
				</div>
				<section className="md-ui component-data-table">
					{/* <header className="main-table-header">
							<h1 className="table-header--title">Nutrition</h1>
							<span className="table-header--icons"><i className="material-icons">filter_list</i><i className="material-icons">more_vert</i>
							</span>
						</header> */}
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">EMPLOYER ID</td>
									<td className="table-datacell datatype-numeric">FULL NAME</td>
									<td className="table-datacell datatype-numeric">MISCONDUCT</td>
									<td className="table-datacell datatype-numeric">COMMENT</td>
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
											<td className="table-datacell datatype-numeric">asl/adm/264</td>
											<td className="table-datacell datatype-numeric">James Abiodun</td>
											<td className="table-datacell datatype-numeric">INSURBORDINATION</td>
											<td className="table-datacell datatype-numeric">Lorem Ipsum greth hg,,,,</td>
											<td className="table-datacell datatype-numeric">LOREM IPSUM</td>
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

export default WarningList
