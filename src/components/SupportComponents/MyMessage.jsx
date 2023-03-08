import React from "react";
import { MainSearch } from "../TableOptions";
import AddNewSupportMessageModal from "../AddNewSupportMessageModal";

const MyMessage = ({ handleShow }) => {
  return (
    <div className="my-message">
      <div className="msg-search">
        <MainSearch placeholder={"Search...    "} />
        <div className="add-request">
          {/* <button
            type="button"
            className="hrm-btn clr-blue"
            onClick={handleShow}>
            New Message
          </button> */}
          <AddNewSupportMessageModal />
        </div>
      </div>

      <section className="md-ui component-data-table">
        {/* <header className="main-table-header">
// 							<h1 className="table-header--title">Nutrition</h1>
// 							<span className="table-header--icons">
<i className="material-icons">filter_list</i>
<i className="material-icons">more_vert</i>
// 							</span>
// 						</header> */}

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

                <td className="table-datacell datatype-numeric">
                  Request for New Laptop
                </td>

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
// 							<span className="rows-selection">
// 								<span className="rows-selection-label">Rows per page:</span>
// 								<span className="rows-selection-dropdown">10<i className="material-icons">arrow_drop_down</i></span>
// 							</span>
// 							<span className="rows-amount">1-10 of 100</span>
// 							<span className="table-pagination">
// 								<i className="material-icons">keyboard_arrow_left</i>
// 								<i className="material-icons">keyboard_arrow_right</i>
// 							</span>
// 						</footer> */}
      </section>
    </div>
  );
};

export default MyMessage;
