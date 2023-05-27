import { useEffect, useState } from 'react'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions'
import { BsCheckCircle } from 'react-icons/bs'
import { Button } from '@material-ui/core'
import Pagination from '../../components/Pagination'
import { ImBin } from 'react-icons/im'
import Cookies from 'js-cookie'
import moment from 'moment'
import TableLoader from '../../components/TableLoader'
import DeleteModals from '../../components/DeleteModals'
import axios, { AxiosResponse } from 'axios'
import CreateRoleModal from '../../components/Modals/CreateRoleModal'
import { fireAlert } from '../../utils/Alert'


const CreateRole = ({ setShowTitle }: any) => {
	const token = Cookies.get("token");

	const [data, setData] = useState([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");

	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [showdelete, setShowDelete] = useState(false);
	const [isLoading1, setisLoading1] = useState(false);
	const [rolesid, setRolesid] = useState(0);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/employee-roles`, {
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
				} else {
					setData(data?.data)
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});

	}, [token, reload])

	const handleDelete = () => {
		setisLoading1(true);
		axios
			.delete(`${process.env.REACT_APP_API}/hr/employee-roles/${rolesid}`)
			.then((res: AxiosResponse) => {
				setData(res?.data);
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

	const title = "Successful";
	const html = "Role Deleted!";
	const icon = "success";
	const title1 = "Delete Role error";
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
			const result = data?.filter((data) => data?.name.toString()?.includes(searchItem));
			setSortData(result);
		}
	}, [data, searchItem]);



	const [displayData, setDisplayData] = useState([]);



	return (
		<div  >
			<div className='SiteWorkermaindiv'>
				<div className='SiteWorkermaindivsub'>
					<CreateRoleModal setReload={setReload} />
				</div>
				<div>
					<EntriesPerPage
						data={data}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<MainSearch placeholder={'Search...         Role'} />
				</div>
			</div>
			<section className="md-ui component-data-table">
				{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-numeric">Name</td>
								<td className="table-datacell datatype-numeric">Description</td>
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
										<td className="table-datacell datatype-numeric">{item?.name}</td>
										<td className="table-datacell datatype-numeric">{item?.description}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>

										<td className="table-datacell datatype-numeric">
											{item?.status === "active" ? <BsCheckCircle size={25} color={"green"} /> : <BsCheckCircle size={25} color={"red"} className="icon-bold" />}

										</td>
										<td className="table-datacell datatype-numeric">
											<Button onClick={() => { setShowDelete(true); setRolesid(item?._id) }}> <ImBin size={25} color='#bf8412' /></Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
				<DeleteModals showdelete={showdelete} setShowDelete={setShowDelete} handleDelete={handleDelete} isLoading1={isLoading1} />
			</section>
			<footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={sortData}
					entriesPerPage={entriesPerPage}
					Total={"Employee"}
				/>
			</footer>
		</div>
	)
}

export default CreateRole


