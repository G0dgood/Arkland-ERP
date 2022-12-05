<<<<<<< HEAD
=======
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import AddNewSupportMessageModal from '../../components/AddNewSupportMessageModal';
>>>>>>> 679f43b (new)


import { useEffect, useState } from 'react'
import Header from '../../components/Header';
import AddNewSupportMessageModal from '../../components/Modals/AddNewSupportMessageModal';
import Sidebar from '../../components/Sidebar';

const Support = () => {
	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);
	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	};

	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='SupportmainTitle'>
					<div>
						<h3 className='SupportmainTitleh3'>Support</h3>
					</div>
					<div>
<<<<<<< HEAD

						{/* <Button variant="contained" className="Add-btn">
							New Message
						</Button> */}

=======
>>>>>>> 679f43b (new)
						<AddNewSupportMessageModal />
					</div>
				</div>

				<section className="md-ui component-data-table">
					{/* <header className="main-table-header">
							<h1 className="table-header--title">Nutrition</h1>
							<span className="table-header--icons"><i className="material-icons">filter_list</i><i className="material-icons">more_vert</i>
							</span>
						</header> */}
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">DATE SENT</td>
									<td className="table-datacell datatype-numeric">SUBJECT</td>
									<td className="table-datacell datatype-numeric">VIEW</td>

								</tr>
							</thead>
							<tbody className="data-table-content">
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022 </td>
									<td className="table-datacell datatype-numeric">Request for New Laptop</td>
									<td className="table-datacell datatype-numeric">31-08-2022 </td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>

								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">J </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>


								</tr>
								<tr>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>
									<td className="table-datacell datatype-numeric"> </td>


								</tr>
							</tbody>
						</table>
					</div>
					{/* <footer className="main-table-footer">
							<span className="rows-selection">
								<span className="rows-selection-label">Rows per page:</span>
								<span className="rows-selection-dropdown">10<i className="material-icons">arrow_drop_down</i></span>
							</span>
							<span className="rows-amount">1-10 of 100</span>
							<span className="table-pagination">
								<i className="material-icons">keyboard_arrow_left</i>
								<i className="material-icons">keyboard_arrow_right</i>
							</span>
						</footer> */}
				</section>
			</main>
		</div>
	)
}

export default Support