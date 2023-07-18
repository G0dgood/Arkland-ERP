import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



import { Button } from '@material-ui/core';
import moment from 'moment';

import { getTeamLead } from '../features/TeamLead/teamleadSlice';
import { useAppDispatch, useAppSelector } from '../store/useStore';
import { EntriesPerPage, NoRecordFound, TableFetch } from './TableOptions';
import TableLoader from './TableLoader';
import CreateTeamLead from '../pages/TeamLead/CreateTeamLead';
import Pagination from './Pagination';

const TeamLead = () => {

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data, isLoading } = useAppSelector((state: any) => state.teamlead)
	const { createisSuccess } = useAppSelector((state: any) => state.teamlead)
	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});


	useEffect(() => {
		// @ts-ignore
		dispatch(getTeamLead());

	}, [dispatch]);

	useEffect(() => {
		if (createisSuccess) {
			dispatch(getTeamLead());
		}
	}, [createisSuccess, dispatch]);



	const header = ["NAME", "STATUS", "CREATED TIME", "UPDATED TIME", "VIEW"];
	const [displayData, setDisplayData] = useState<any>([]);

	return (
		<div >
			<div className='allemployees-container-main' >
				<div className='SiteWorkermaindivsub'>
					<span className='SupportmainTitleh3'>Project Managers </span>
				</div>
				<div>
					<EntriesPerPage
						data={displayData}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<CreateTeamLead />
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
											<Button id="team-applicatiom-update" onClick={() => navigate(`/teamlead/teamlead/view/${item?.id}`)}>View</Button>
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
					data={data}
					entriesPerPage={entriesPerPage}
					Total={"Project Managers"}
				/>
			</footer>
		</div>
	)
}

export default TeamLead
