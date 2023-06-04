import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import { EntriesPerPage, NoRecordFound, TableFetch } from '../../components/TableOptions';
import TableLoader from '../../components/TableLoader';
import { getTeam, reset } from '../../features/Team/teamSlice';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Team = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data, isError, isLoading, message, isSuccess } = useAppSelector((state: any) => state.team)
	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});



	useEffect(() => {
		// @ts-ignore
		dispatch(getTeam());
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			fireAlert("error", message, "error");
			dispatch(reset());
		}
	}, [isError, message, dispatch])

	const header = ["NAME", "DESCRIPTION", "STATUS", "CREATED TIME", "UPDATED TIME", "VIEW"];
	const [displayData, setDisplayData] = useState([]);

	return (
		<div >
			{/* <div className="SiteWorkermaindiv">
				<div className="SiteWorkermaindivsub">
					<span className="SupportmainTitleh3">TASK </span>
				</div>
				<CreateTeamModal />
			</div> */}
			<div className='allemployees-container-main' >
				<div className='SiteWorkermaindivsub'>
					<span className='SupportmainTitleh3'>Team List</span>
				</div>
				<div>
					<EntriesPerPage
						data={displayData}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					ccc
					{/* <ApplyForLeave /> */}

				</div>
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
											{item?.name}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.description.slice(0, 10)}
										</td>
										<td className="table-datacell datatype-numeric">
											<Button
												className={
													item?.status !== "active"
														? "table-link"
														: "table-link-active"
												}
											>
												{item?.status}
											</Button>

										</td>
										<td className="table-datacell datatype-numeric">
											{item?.created_at}
										</td>
										<td className="table-datacell datatype-numeric">
											{/* {new Date(item?.time_in).toLocaleString()} */}
											{moment(item?.updated_by).format("DD-MM-YYYY")}
										</td>
										<td className="table-datacell datatype-numeric">

											<Button id="team-applicatiom-update" onClick={() => navigate(`/team/team/view/${item?.id}`)}>View</Button>
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
					data={data}
					entriesPerPage={entriesPerPage}
					Total={"Team"}
				/>
			</footer>
		</div>
	)
}

export default Team
