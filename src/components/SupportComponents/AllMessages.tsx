import { MainSearch } from "../TableOptions";

const AllMessages = () => {
  return (
    <div className="my-message">
      <div className="msg-search">
        <MainSearch placeholder={"Search...   "} />
      </div>

      <section className="md-ui component-data-table">

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
                <td className="table-datacell datatype-numeric">25-08-2022</td>
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
      </section>
    </div>
  );
};

export default AllMessages;
