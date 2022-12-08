

const WeeklyReportTable = () => {



	return (
		<div>
			{/* <section className="md-ui component-data-table"> */}
			{/* {isLoading ? <TableLoader isLoading={isLoading} /> : ''} */}
			<div id="table-wrapper">

				<table>
					<tr>
						<th>Activities Completed This Week</th>
						<th colSpan={3}> <span className="Activities-title">Activities In Progress</span>
							<div className="table-iner-span">
								<span>Activities</span>
								<span>Next Action</span>
								<span>Due Date</span>
							</div>
						</th>
						<th>Activities To Be Started Next Week</th>
						<th>Issues For Immediate Attention</th>
						<th>Challenges and Limitations</th>
					</tr>


					<tr>
						<td  > <div id="td-span-row">
							Created payment plan  </div></td>
						<td >  One of Us Is Lying</td>
						<td>Young Adult Fiction2</td>
						<td>Young Adult Fiction3</td>
						<td>Young Adult Fiction4</td>
						<td>Young Adult Fiction5</td>
						<td>368</td>
					</tr>

					<tr>
						<td >Karen M. McManus</td>
						<td >One of Us Is Next</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>377</td>
					</tr>
					<tr>
						<td>Karen M. McManus</td>
						<td>One of Us Is Next</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>377</td>
					</tr>
					<tr>
						<td>Karen M. McManus</td>
						<td>One of Us Is Next</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>377</td>
					</tr>
					<tr>
						<td>Karen M. McManus</td>
						<td>One of Us Is Next</td>
						<td>Young Adult Fiction</td>
						<td>Created payment plan view and modification  editing </td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>377</td>
					</tr>
					<tr>
						<td>Karen M. McManus</td>
						<td>One of Us Is Next</td>
						<td>Created payment plan   modification editing </td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>377</td>
					</tr>
					<tr>
						<td>Karen M. McManus</td>
						<td>Improving the UI, working on optimizing  on and working on the completion of the payment plan</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>377</td>
					</tr>
					<tr>
						<td>Karen M. McManus</td>
						<td>One of Us Is Next</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>Young Adult Fiction</td>
						<td>377</td>
					</tr>

				</table>
			</div>
			{/* </section> */}
		</div>
	)
}

export default WeeklyReportTable
