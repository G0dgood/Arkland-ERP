import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination';
import { NoRecordFound, TableFetch } from '../../components/TableOptions';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { getTask, reset } from '../../features/Tasks/taskSlice';
import { fireAlert } from '../../utils/Alert';
import TableLoader from '../../components/TableLoader';
import moment from 'moment';
import CreateTaskModal from './CreateTaskModal';



const TaskList = () => {
	const dispatch = useAppDispatch();
	const { data: tasks, isError, isLoading, message, isSuccess } = useAppSelector((state: any) => state.task)
	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});



	useEffect(() => {
		// @ts-ignore
		dispatch(getTask());
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			fireAlert("error", message, "error");
			dispatch(reset());
		}
	}, [isError, message, dispatch])

	const header = ["PROJECT", "TASK CREATED BY", "TASK ASSIGNED TO", "TASK STATUS", "TASK TITLE", "TASK CREATED TIME"];
	const [displayData, setDisplayData] = useState([]);

	return (
		<div >
			<div className="SiteWorkermaindiv">
				<div className="SiteWorkermaindivsub">
					<span className="SupportmainTitleh3">TASK </span>
				</div>
				<CreateTaskModal />
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
												key={index} >
												{i}
											</td>
										</>
									);
								})}
							</tr>
						</thead>
						<tbody className="data-table-content">
							{false ? (
								<TableFetch colSpan={8} />
							) : displayData?.length === 0 || displayData == null ? (
								<NoRecordFound colSpan={8} />
							) : (
								displayData?.map((item: any, i: any) => (
									<tr className="data-table-row" key={i}>
										<td className="table-datacell datatype-numeric">
											{item?.project?.name}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.created_by?.full_name}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.assigned_to?.full_name}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.status}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.title}
										</td>
										<td className="table-datacell datatype-numeric">
											{/* {new Date(item?.time_in).toLocaleString()} */}
											{moment(item?.created_at).format("DD-MM-YYYY")}
										</td>
										{/* <td className="table-datacell datatype-numeric">
											<Button
												className={
													item?.ip_checked === true
														? "table-link"
														: "table-link-active"
												}
											>
												{item?.ip_checked === true ? "Yes" : "No"}
											</Button>
										</td> */}
										{/* <td className="table-datacell datatype-numeric">
											<Button
												className={
													item?.is_hr_assisted === true
														? "table-link"
														: "table-link-active"
												}
											>
												{item?.is_hr_assisted === true ? "Yes" : "No"}
											</Button>
										</td> */}
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
					data={tasks}
					entriesPerPage={entriesPerPage}
					Total={"Task"}
				/>
			</footer>
		</div>
	)
}

export default TaskList
