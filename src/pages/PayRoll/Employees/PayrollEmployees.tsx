/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { NoRecordFound, SearchComponent, TableFetch } from '../../../components/TableOptions';
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { getUserPrivileges } from '../../../functions/auth';
import TableLoader from '../../../components/TableLoader';
import { getEmployeePayroll } from '../../../features/PayRoll/payrollSlice';
import { Helmet } from 'react-helmet-async';
import createHttpService from '../../../components/HttpService';
import moment from 'moment';



const PayrollEmployees = () => {
	const dispatch = useAppDispatch();

	const { isSuperAdmin, isAdmin, isMaster } = getUserPrivileges();
	const { data, isLoading } = useAppSelector((state: any) => state.payroll)

	const { approveisSuccess } = useAppSelector((state: any) => state.employee)
	const [reset, setReset] = useState(false);
	const [displayData, setDisplayData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [sortedItem, setSortedItem] = useState<any>([]);
	const navigate = useNavigate();
	const [sortData, setSortData] = useState([]);
	const [Query, setQuery] = useState(
		{
			size: undefined,
			page: undefined,
			sort: true,
			limit: undefined,
			search: undefined,
			base: undefined
		}
	);

	const handleQueryClick = () => {
		// @ts-ignore  
		dispatch(getEmployeePayroll(Query));
	};


	useEffect(() => {
		dispatch(getEmployeePayroll());
	}, [dispatch]);


	useEffect(() => {
		if (approveisSuccess || reset) {
			dispatch(getEmployeePayroll());
		}
	}, [approveisSuccess, dispatch, reset]);



	// Function to sort data by status, with "In Review" first, and then alphabetically by name
	const sortDataByReview = (data: any[]) => {
		const inReviewData = !data ? [] : data?.filter((item) => item?.status === 'in review');
		const otherData = !data ? [] : data?.filter((item) => item?.status !== 'in review');
		const sortedInReview = inReviewData?.sort((a, b) => a?.full_name?.localeCompare(b?.full_name));
		const sortedOther = otherData?.sort((a, b) => a?.full_name?.localeCompare(b?.full_name));
		return [...sortedInReview, ...sortedOther];
	};




	useEffect(() => {
		// Sort the data by "In Review" first
		const sorted = sortDataByReview(data?.data);
		const unLinked: any = !sorted ? [] : sorted?.filter((suggestion: any) =>
			// @ts-ignore  
			suggestion?.full_name?.toLowerCase()?.startsWith(searchItem?.toLowerCase()) ||
			// @ts-ignore  
			suggestion?.email?.toLowerCase()?.startsWith(searchItem?.toLowerCase()) ||
			// @ts-ignore  
			suggestion?.role?.toLowerCase()?.startsWith(searchItem?.toLowerCase()) ||
			// @ts-ignore  
			suggestion?.department?.toLowerCase()?.startsWith(searchItem?.toLowerCase())
		);
		setSortedItem(unLinked)

	}, [data, searchItem]);


	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "8";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]); // State to hold selected IDs





	const handleCheckboxChange = (itemId: string) => {
		setIsDrawerOpen(true);
		// Check if the item's ID is already selected
		if (selectedIds.includes(itemId)) {
			// Remove the ID from the selectedIds array
			setSelectedIds(selectedIds.filter((id) => id !== itemId));
		} else {
			// Add the ID to the selectedIds array
			setSelectedIds([...selectedIds, itemId]);
		}
	};

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const keys = [
		"Name",
		"Employee Role",
		"Email Address",
		"Contact",
		"Location",
		"Department",
		"Salary",
		"Employment Date",
		"Action ",
		"Status",
	];

	// const [isLoadings, setisLoadings] = useState(false);
	// const [isData, setisData] = useState([]);


	// const getData = async () => {
	// 	const HttpService = createHttpService();
	// 	setisLoadings(true)
	// 	try {
	// 		const teamsUrl = "/payroll/employees/export/csv"
	// 		const teams: any = await HttpService.get(teamsUrl)
	// 		setisData(teams?.data?.data)


	// 		setisLoadings(false)

	// 	} catch (error) {
	// 		setisLoadings(false)
	// 	}
	// }





	return (
		<>
			<Helmet>
				<title>All Employee | Arkland ERP</title>
			</Helmet>
			<div id="reports">
				<h5 className="page-title">All Employee</h5>
				<ul className="nav-tabs-btn mb-3">
					<li className={"active"} onClick={() => navigate("/payroll/payroll/employeesonboarding")}>Add Employee</li>
				</ul>
				<div className='half-background'>
					<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={entriesPerPage} parameter={false} addemployee={true} placeholder={"Employees"} PayrollEmployee={sortData} handleQuery={handleQueryClick} />
					<section className="md-ui component-data-table">
						{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
						<div className="main-table-wrapper">
							<table className="main-table-content">
								<thead className="data-table-header">
									<tr className="data-table-row">
										{keys.map((i, index) => {
											return (<td className="table-datacell datatype-numeric" key={index} >
												{i}
											</td>)
										})}
									</tr>
								</thead>
								<tbody className="data-table-content">
									{isLoading ? (
										<TableFetch colSpan={10} />
									) : data?.length === 0 || data == null ? (
										<NoRecordFound colSpan={10} />
									) : (sortedItem?.map((item: any, index: any) => (
										<tr key={index} className="data-table-row">
											<td className="table-datacell datatype-numeric">{item?.full_name}</td>
											<td className="table-datacell datatype-numeric">{item?.role}</td>
											<td className="table-datacell datatype-numeric">{item?.email}</td>
											<td className="table-datacell datatype-numeric">{item?.phone}</td>
											<td className="table-datacell datatype-numeric">A&A </td>
											<td className="table-datacell datatype-numeric">{item?.department}</td>
											<td className="table-datacell datatype-numeric">{item?.salary?.gross_salary}</td>
											<td className="table-datacell datatype-numeric">{moment(item?.employment_date).format("DD-MM-YYYY")}</td>
											<td className="table-datacell datatype-numeric">
												<Button id="view-btn" onClick={() => navigate(`/payroll/payroll/employeepayrollview/${item?.id}/details`)}>View</Button>
											</td>
											<td className="table-datacell datatype-numeric">
												<Button id="view-status" onClick={() => navigate(``)}>Approve</Button>
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
								<li><a>1</a></li>
								<li className="active">
									<a >2</a></li>
								<li><a>3</a></li>
								<li><a>4</a></li>
								<li><a>5</a></li>
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
		</>
	)
}

export default PayrollEmployees


// < td className = "table-datacell  " >
// 	{ item?.full_name }
//           </ >
//           <td className="table-datacell  ">
//            {item?.email}
//           </td>
//           <td className="table-datacell">
//            {item?.role}
//           </td>
//           <td className="table-datacell  ">
//            {item?.department}
//           </td>
//           <td className="table-datacell datatype-numeric">
//            {/* {item?.category} */}
//           </td>
//           <td className="table-datacell datatype-numeric">
//            {item?.status}
//           </td>