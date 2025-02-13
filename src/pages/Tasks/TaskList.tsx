import { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination';
import { NoRecordFound, SearchComponent, TableFetch } from '../../components/TableOptions';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { getTask, reset } from '../../features/Tasks/taskSlice';
import TableLoader from '../../components/TableLoader';
import moment from 'moment';
import CreateTaskModal from './CreateTaskModal';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';



const TaskList = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data: tasks, isLoading } = useAppSelector((state: any) => state.task)
	const { deleteisSuccess } = useAppSelector((state: any) => state.task)
	const { createisSuccess } = useAppSelector((state: any) => state.task)
	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "8";
	});




	useEffect(() => {
		// @ts-ignore
		dispatch(getTask());
		if (createisSuccess) {
			// @ts-ignore
			dispatch(getTask());
		} else if (deleteisSuccess) {
			dispatch(reset());
		}
	}, [createisSuccess, deleteisSuccess, dispatch]);


	const header = ["TASK CREATED BY", "TASK ASSIGNED TO", "TASK STATUS", "TASK TITLE", "TASK CREATED TIME", "VIEW"];
	const [displayData, setDisplayData] = useState([]);

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
	}

	return (
		<div id="reports">
			<h5 className="page-title">Task</h5>
			<CreateTaskModal />
			<div className='half-background'>
				<SearchComponent sortData={tasks} entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} placeholder={"Task"} />
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
											<td className="table-datacell ">
												{item?.created_by?.full_name}
											</td>
											<td className="table-datacell">
												{item?.assigned_to?.full_name}
											</td>
											<td className="table-datacell datatype-numeric">
												{item?.status}
											</td>
											<td className="table-datacell datatype-numeric">
												{item?.title}
											</td>
											<td className="table-datacell datatype-numeric">
												{moment(item?.created_at).format("DD-MM-YYYY")}
											</td>
											<td className="table-datacell datatype-numeric" key={i}>
												<Button id="view-status" onClick={() => navigate(`/tasks/tasks/${item?.id}`)}>View</Button>
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
						data={tasks}
						entriesPerPage={entriesPerPage}
						Total={"Task"}
					/>
				</footer>
			</div>
		</div>
	)
}

export default TaskList
