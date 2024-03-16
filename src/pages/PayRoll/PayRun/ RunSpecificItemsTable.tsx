import React from 'react'
import { NoRecordFound } from '../../../components/TableOptions';
import { Helmet } from 'react-helmet-async';

const RunSpecificItemsTable = ({ keys, data }: any) => {


	return (
		<>
			<Helmet>
				<title>Run Specific Items Table | Arkland ERP</title>
			</Helmet>
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
										data?.map((item: any, index: any) => (
											<tr key={index} className="data-table-row">

												<td className="table-datacell" key={index} >
													<div style={{ display: "flex" }}>
														<span>
															<div className="radio"  >
																<input id={`radio-${index}`} name="radio" type="radio" />
																<label htmlFor={`radio-${index}`} className="radio-label">
																</label>
															</div>
														</span> <span>Sponsorship Allow</span>
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
														<span>Basic Pay</span>
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
		</>
	)
}

export default RunSpecificItemsTable