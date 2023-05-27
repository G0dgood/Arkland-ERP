import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from './TableOptions'
import { BsCheckCircle } from 'react-icons/bs'
import moment from 'moment'
import TableLoader from './TableLoader'
import Cookies from 'js-cookie'
import Pagination from './Pagination'
import { ImBin } from 'react-icons/im'
import DeleteModals from './DeleteModals'
import axios, { AxiosResponse } from 'axios'
import { fireAlert } from '../utils/Alert'
import AssignPrivilegesModal from './Modals/AssignPrivilegesModal'


const Userprivileges = ({ showprivileges, setShowprivileges, }: any) => {

	const token = Cookies.get("token");
	const [data, setData] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [sortData, setSortData] = useState([]);
	const [showdelete, setShowDelete] = useState(false);
	const [privilegesid, setPrivilegesid] = useState(0);
	const [isLoading1, setisLoading1] = useState(false);
	const [reload, setReload] = useState(false);
	const [result, setResult] = useState("");

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);


	useEffect(() => {
		if (data) {
			// @ts-ignore
			const results = data?.filter((data) => data?.role.toString()?.includes(result));
			setSortData(results);
		}
	}, [data, result]);

	const onChange = (e: any) => {
		setResult(e.target.value);
	}



	const title = "Successful";
	const html = "User Privilege Deleted!";
	const icon = "success";
	const title1 = "Delete Privilege error";
	const html1 = message;
	const icon1 = "error";


	// useEffect(() => {
	// 	if (isSuccess) {
	// 		fireAlert(title, html, icon);
	// 		setTimeout(() => {
	// 			setisSuccess(false)
	// 			setMessage("")
	// 		}, 5000);
	// 	} else if (isError) {
	// 		fireAlert(title1, html1, icon1);
	// 		setTimeout(() => {
	// 			setisError(false)
	// 			setMessage("")
	// 		}, 5000);
	// 	}
	// }, [html, html1, isError, isSuccess])

	useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/admin/privileges`, {
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
					setData(data?.data)
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});

	}, [token, showprivileges, reload])




	const handleDelete = () => {
		setisLoading1(true);
		axios
			.delete(`${process.env.REACT_APP_API}/admin/privileges/${privilegesid}`)
			.then((res: AxiosResponse) => {
				setisLoading1(false);
				setShowDelete(false);
				setReload(true);
				// setTimeout(() => {
				// 	navigate("/kpicontainer");
				// }, 5000);
			})
			.catch((data) => {
				console.log(data);
				setisLoading1(false);
			});

	}

	const [displayData, setDisplayData] = useState([]);




	return (
		<div  >
			<div className='SiteWorkermaindiv'>
				<div className='SiteWorkermaindivsub'>
					{/* <span className='SupportmainTitleh3'> */}
					<AssignPrivilegesModal setReload={setReload} />
					{/* </span> */}
				</div>
				<div>
					<EntriesPerPage
						data={data}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<MainSearch placeholder={'Search...      User Privileges'} onChange={onChange} result={result} />
				</div>
			</div>

			<section className="md-ui component-data-table">
				{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-numeric">Role</td>
								<td className="table-datacell datatype-numeric">Created Date</td>
								<td className="table-datacell datatype-numeric">Status</td>
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
									<tr className="data-table-row" key={i}>
										<td className="table-datacell datatype-numeric">{item?.role}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>

										<td className="table-datacell datatype-numeric">
											{item?.status === "active" ? <BsCheckCircle size={25} color={"green"} /> : <BsCheckCircle size={25} color={"red"} className="icon-bold" />}

										</td>
										<td className="table-datacell datatype-numeric">
											<Button onClick={() => { setShowDelete(true); setPrivilegesid(item?._id) }}> <ImBin size={25} color='#bf8412' /></Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</section>
			<DeleteModals showdelete={showdelete} setShowDelete={setShowDelete} handleDelete={handleDelete} isLoading1={isLoading1} />
			<footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={sortData}
					entriesPerPage={entriesPerPage}
					Total={"Privileges"}
				/>
			</footer>
		</div>
	)
}

export default Userprivileges
