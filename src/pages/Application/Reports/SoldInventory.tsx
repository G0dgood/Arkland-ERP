import React from 'react';
import { BsDownload } from 'react-icons/bs';
import { NoRecordFound, TableFetch } from '../../../components/TableOptions';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const SoldInventory = () => {
  const navigate = useNavigate();

  const keys = [
    "Customer Name",
    "Loan ID",
    "Repayment Amount",
    "Loan Repayment Date",
    "Loan Principal Repayment",
    "Last Interest Repayment",
    'View'
  ];
  const data = [];

  const valuesArray = [
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000", <Button id="team-applicatiom-update" onClick={() => navigate(`/tasks/tasks/`)}>View</Button>],
    ["John Doe", "LN0002", "$400,000", "5-10-2021", "$80,000", "$60,000", <Button id="team-applicatiom-update" onClick={() => navigate(`/tasks/tasks/`)}>View</Button>],
    ["John Doe", "LN0002", "$400,000", "5-10-2021", "$80,000", "$60,000", <Button id="team-applicatiom-update" onClick={() => navigate(`/tasks/tasks/`)}>View</Button>],
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000", <Button id="team-applicatiom-update" onClick={() => navigate(`/tasks/tasks/`)}>View</Button>],
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000", <Button id="team-applicatiom-update" onClick={() => navigate(`/tasks/tasks/`)}>View</Button>],
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000", <Button id="team-applicatiom-update" onClick={() => navigate(`/tasks/tasks/`)}>View</Button>],
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000", <Button id="team-applicatiom-update" onClick={() => navigate(`/tasks/tasks/`)}>View</Button>],
    ["John Doe", "LN0002", "$400,000", "5-10-2021", "$80,000", "$60,000", <Button id="team-applicatiom-update" onClick={() => navigate(`/tasks/tasks/`)}>View</Button>],
    // Add more arrays for additional rows
  ];

  for (const values of valuesArray) {
    const obj = {
      "Customer Name": values[0],
      "Loan ID": values[1],
      "Repayment Amount": values[2],
      "Loan Repayment Date": values[3],
      "Loan Principal Repayment": values[4],
      "Last Interest Repayment": values[5],
      "View": values[6]
    };
    data.push(obj);
  }


  return (
    <section className="md-ui component-data-table">
      {/* {isLoading ? <TableLoader isLoading={isLoading} /> : ""} */}
      <div className="main-table-wrapper">
        <table className="main-table-content">
          <thead className="data-table-header">
            <tr className="data-table-row">
              {keys.map((i, index) => {
                return (
                  <>
                    <td
                      className="table-datacell datatype-numeric"
                      key={index} >
                      {i}
                    </td>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody className="data-table-content">
            {
              false ? (
                <TableFetch colSpan={8} />
              ) : data?.length === 0 || data == null ? (
                <NoRecordFound colSpan={8} />
              ) : (
                data.map((item, index) => (
                  <tr key={index} className="data-table-row">
                    {Object.values(item).map((value, index) => (
                      <td className="table-datacell" key={index}>{value}</td>
                    ))}
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default SoldInventory;