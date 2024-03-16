
import moment from 'moment';
import TableLoader from '../../../components/TableLoader';
import { NoRecordFound, TableFetch } from '../../../components/TableOptions';

const WeeklyReportTable = ({ isLoading, data }: any) => {






	return (
		<div>
			<div id="table-wrapper">
				{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
				<table>
					<tr>
						<th>
							<span className="weekly-report-padding">Activities Completed This Week</span>
						</th>
						<th colSpan={3}>
							<span className="Activities-title">Activities In Progress</span>
							<div className="table-iner-span">
								<span>Activities</span>
								<span>Next Action</span>
								<span>Due Date</span>
							</div>
						</th>
						<th><span className="weekly-report-padding">Activities To Be Started Next Week</span></th>
						<th><span className="weekly-report-padding">Issues For Immediate Attention</span></th>
						<th><span className="weekly-report-padding">Challenges and Limitations</span></th>
					</tr>

					{isLoading ? (
						<TableFetch colSpan={8} />
					) : data?.length === 0 || data?.length === undefined ? (
						<NoRecordFound colSpan={8} />
					) : (
						data?.map((item: any, i: any) => (
							<tr key={i}>
								<td >
									<div id="td-span-row">
										<textarea
											id='kpi-textarea'
											className='Performance-Indicator-input2'
											value={item.completed}

											rows={5}
											placeholder="Activities Completed This Week" />
									</div>
								</td>
								<td >
									<textarea
										id='kpi-textarea'
										className='Performance-Indicator-input2'
										value={item.in_progress}
										rows={5}
										placeholder="Activities" />
								</td>
								<td>	<textarea
									id='kpi-textarea'
									className='Performance-Indicator-input2'
									value={item.next}
									rows={5}
									placeholder="Next Action" /></td>
								<td>
									<div className='Performance-Indicator-input2 format-Indicator' id='kpi-textarea'>
										{moment(item?.due_date_for_next).format("DD-MM-YYYY")}
									</div></td>

								<td>	<textarea
									id='kpi-textarea'
									className='Performance-Indicator-input2'
									value={item.next_week_tasks}
									rows={5}
									placeholder="Activities To Be Started Next Week" /></td>
								<td>	<textarea
									id='kpi-textarea'
									className='Performance-Indicator-input2'
									value={item.issues}
									rows={5}
									placeholder="Issues For Immediate Attention" /></td>
								<td>
									<textarea
										id='kpi-textarea'
										className='Performance-Indicator-input2'
										value={item.blockers}
										rows={5} placeholder="Challenges and Limitations" />
								</td>
							</tr>
						)))}

				</table>
			</div>
		</div>
	)
}

export default WeeklyReportTable