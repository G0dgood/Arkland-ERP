import { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination';
import moment from 'moment';
import { EntriesPerPage, NoRecordFound, TableFetch } from '../../components/TableOptions';
import TableLoader from '../../components/TableLoader';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import HttpService from '../../components/HttpService';


const TeamLeadTeams = () => {

	const navigate = useNavigate();
	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});
	const [data, setData] = useState([])
	const [isLoading, setisLoading] = useState(false)




	useEffect(() => {
		getData()
	}, [])
	const getData = async () => {
		setisLoading(true)
		try {
			const projectsUrl = "teams"
			const projects: any = await HttpService.get(projectsUrl)
			setData(projects?.data?.data)
			setisLoading(false)

		} catch (error) {
			setisLoading(false)
		}
	}





	const header = ["NAME", "DESCRIPTION", "STATUS", "CREATED TIME", "UPDATED TIME", "VIEW"];
	const [displayData, setDisplayData] = useState([]);

	return (
		<div >
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
														: "table-link-active"} 	>
												{item?.status}
											</Button>

										</td>
										<td className="table-datacell datatype-numeric">
											{moment(item?.created_at).format("DD-MM-YYYY")}
										</td>
										<td className="table-datacell datatype-numeric">
											{moment(item?.updated_by).format("DD-MM-YYYY")}
										</td>
										<td className="table-datacell datatype-numeric" key={i}>

											<Button id="team-applicatiom-update" onClick={() => navigate(`/teamleadprojects/teamleadprojects/teamleadviewteam/${item?.id}`)}>View</Button>
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
					Total={"Team"}
				/>
			</footer>
		</div>
	)
}

export default TeamLeadTeams
