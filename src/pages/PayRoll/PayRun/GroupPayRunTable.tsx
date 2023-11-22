import React from 'react'
import { NoRecordFound } from '../../../components/TableOptions';

const GroupPayRunTable = ({ keys, data }: any) => {
	const valuesArray = [
		["", "Sponsorship Allow", "Basic Pay",],
		["", "Fixed Overtime ", "Housing Allowance ",],
		["", "Overtime", "Transport",],
		["", "Medical", "Utility",],
		["", "Utility", "Meal",],
		["", "Bonus", "Medical",],
		// Add more arrays for additional rows
	];


	return (
		<div>
			< div style={{ overflow: 'auto' }}>
				<div className='selected-sub-entries'>
					<p>Selected  21 Out of 25  Entries</p></div>
				<section className="md-ui component-data-table">
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row">
									{keys?.map((i: any, index: any) => {
										return (
											<>
												<td className="table-datacell datatype-numeric" key={index} >
													{i}
												</td>
											</>
										);
									})}
								</tr>
							</thead>
							<tbody className="data-table-content">
								{false ? (
									<NoRecordFound colSpan={3} />
								) : (
									valuesArray?.map((item: any, index: any) => (
										<tr className="data-table-row">
											<td className="table-datacell"   >
												<div style={{ display: "flex" }}>
													<span>
														<div className="radio"  >
															<input id={`radio-${index}`} name="radio" type="radio" />
															<label htmlFor={`radio-${index}`} className="radio-label">
															</label>
														</div>
													</span>
													<span>{item[1]}</span>
												</div>
											</td>
											<td className="table-datacell" >
												<div style={{ display: "flex" }}>
													<span>	<div className="radio"  >
														<input id={`radio-${index}`} name="radio" type="radio" />
														<label htmlFor={`radio-${index}`} className="radio-label">
														</label>
													</div>
													</span>
													<span>{item[2]}</span>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	)
}

export default GroupPayRunTable