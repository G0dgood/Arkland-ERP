import { useEffect, useState } from 'react'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions';
import TableLoader from '../../components/TableLoader';
import { fireAlert } from '../../utils/Alert';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { Button } from '@material-ui/core';
import { BsCheckCircle } from 'react-icons/bs';
import moment from 'moment';
import Pagination from '../../components/Pagination';
import { getAnnouncement, reset } from '../../features/Announcement/announcemetSlice';
import { useNavigate } from 'react-router-dom';
import CreateAnnouncementModal from '../../components/Modals/CreateAnnouncementModal';

const Announcements = () => {
	const dispatch = useAppDispatch();
	const { data, isLoading } = useAppSelector((state: any) => state.announcement)
	const navigate = useNavigate();



	useEffect(() => {
		dispatch(getAnnouncement());
	}, [dispatch]);


	const [sortData, setSortData] = useState([]);
	const [searchItem,] = useState("");



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
			const result = data?.filter((data) => data?.message.toString()?.includes(searchItem));
			setSortData(result);
		}
	}, [data, searchItem]);



	const [displayData, setDisplayData] = useState([]);



	return (
		<div  >

			<div className='SiteWorkermaindiv'>
				<div className='SiteWorkermaindivsub'>
					<CreateAnnouncementModal />
				</div>
				<div>
					<EntriesPerPage
						data={sortData}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<MainSearch placeholder={'Search...     Announcements '} />
				</div>
			</div>

			<section className="md-ui component-data-table">
				{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-numeric">Description</td>
								<td className="table-datacell datatype-numeric">Message</td>
								<td className="table-datacell datatype-numeric">Created Date</td>
								<td className="table-datacell datatype-numeric">Status</td>
								<td className="table-datacell datatype-numeric">VIEW</td>

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
										<td className="table-datacell datatype-numeric">{item?.description}</td>
										<td className="table-datacell datatype-numeric">{item?.message}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
										<td className="table-datacell datatype-numeric">
											{item?.status === "active" ? <BsCheckCircle size={25} color={"green"} /> : <BsCheckCircle size={25} color={"red"} className="icon-bold" />}
										</td>

										<td className="table-datacell datatype-numeric">
											<Button id="team-applicatiom-update" onClick={() => navigate(`/announcements/announcements/${item?.id}`)}>View</Button>
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
		</div>
	)
}

export default Announcements
