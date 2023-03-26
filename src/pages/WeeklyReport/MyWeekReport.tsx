import React, { useEffect, useState } from 'react'
import { NoRecordFound, TableFetch } from '../../components/TableOptions';
import moment from 'moment';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TableLoader from '../../components/TableLoader';
import Cookies from 'js-cookie';
import storage from '../../utils/storage';
import { fireAlert } from '../../utils/Alert';

const MyWeekReport = ({ setkpidata }: any) => {

	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));
	const token = Cookies.get("token");
	const [data, setData] = useState<any>([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");

	const [displayData, setDisplayData] = useState([]);


	const title = "Week Report error";
	const html = message;
	const icon = "error";





	useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/weekly-reports`, {
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
					// setisError(true)
				} else {
					setisSuccess(true)
					setData(data)
					setkpidata(data?.data?.length)
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});

	}, [setkpidata, token])



	useEffect(() => {
		if (isError) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisError(false);
			}, 1000);
		}
	}, [html, isError, isSuccess]);


	return (
		<div  >
			<section className="md-ui component-data-table">
				{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-name">Full Name</td>
								<td className="table-datacell datatype-numeric">Year</td>
								<td className="table-datacell datatype-numeric">Week</td>
								<td className="table-datacell datatype-numeric">Self Assessment</td>
								<td className="table-datacell datatype-numeric">status</td>
								<td className="table-datacell datatype-numeric">Action</td>

							</tr>
						</thead>
						<tbody className="data-table-content">
							{isLoading ? (
								<TableFetch colSpan={8} />
							) : data?.length === 0 || data == null ? (
								<NoRecordFound colSpan={8} />
							) : (
								data?.data?.map((item: any, i: any) => (
									<tr className="data-table-row" key={i}>
										<td className="table-datacell datatype-numeric"> {item?.employee_name}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
										<td className="table-datacell datatype-numeric">{item?.week}</td>
										<td className="table-datacell datatype-numeric">{item?.self_assessment}</td>
										<td className="table-datacell datatype-numeric">
											<Button className={item?.status === "submitted" ? "table-link " : "table-link-active"}>{item?.status}</Button>
										</td>
										<td className="table-datacell datatype-numeric">
											<Link to={`/weeklyreportview/${item?._id}`}>

												<Button id="team-applicatiom-update">	{item?.status === "acknowledged" ? 'View' : 'Update'}</Button>
											</Link>

										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

			</section >
		</div>
	)
}

export default MyWeekReport