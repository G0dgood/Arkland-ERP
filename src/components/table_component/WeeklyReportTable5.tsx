import React from 'react'
import TableLoader from '../TableLoader'
import { NoRecordFound, TableFetch } from '../TableOptions'

const WeeklyReportTable5 = ({ data, isLoading }: any) => {

	console.log('data?.length', data)
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
					) : data?.length === undefined ? (
						<NoRecordFound colSpan={8} />
					) : (
						data?.activities?.map((item: any, i: any) => (
							<tr  >
								<td >
									<div id="td-span-row">
										<textarea
											id='kpi-textarea'
											className='Performance-Indicator-input2'
											value={item.completed}
											// onChange={(e) => handleChange("completed", e.target.value, item.id)}
											rows={5}
											placeholder="Activities Completed This Week" />
									</div>
								</td>
								<td >
									<textarea
										id='kpi-textarea'
										className='Performance-Indicator-input2'
										value={item.in_progress}
										// onChange={(e) => handleChange("in_progress", e.target.value, item.id)}
										rows={5}
										placeholder="Activities" />
								</td>
								<td>	<textarea
									id='kpi-textarea'
									className='Performance-Indicator-input2'
									value={item.next}
									// onChange={(e) => handleChange("next", e.target.value, item.id)}
									rows={5}
									placeholder="Next Action" /></td>
								<td>	<input
									id='kpi-textarea'
									type="date"
									className='Performance-Indicator-input2'
									value={item.due_date_for_next}
									// onChange={(e) => handleChange("due_date_for_next", e.target.value, item.id)}
									placeholder="Due Date" /></td>
								<td>	<textarea
									id='kpi-textarea'
									className='Performance-Indicator-input2'
									value={item.next_week_tasks}
									// onChange={(e) => handleChange("next_week_tasks", e.target.value, item.id)}
									rows={5}
									placeholder="Activities To Be Started Next Week" /></td>
								<td>	<textarea
									id='kpi-textarea'
									className='Performance-Indicator-input2'
									value={item.issues}
									// onChange={(e) => handleChange("issues", e.target.value, item.id)}
									rows={5}
									placeholder="Issues For Immediate Attention" /></td>
								<td>
									<textarea
										id='kpi-textarea'
										className='Performance-Indicator-input2'
										value={item.blockers}
										// onChange={(e) => handleChange("blockers", e.target.value, item.id)}
										rows={5} placeholder="Challenges and Limitations" />
								</td>
							</tr>
						)))}

				</table>
			</div>
		</div>
	)
}

export default WeeklyReportTable5
