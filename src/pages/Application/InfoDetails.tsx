import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import dp from '../../assets/images/display-pics.jpg';
import { NoRecordFound, TableFetch } from '../../components/TableOptions';

const InfoDetails = () => {



  const navigate = useNavigate();
  const keys = [
    "Customer Name",
    "Loan ID",
    "Repayment Amount",
    "Loan Repayment Date",
    "Loan Principal Repayment",
    "Last Interest Repayment",
  ]
  const data = [];

  const valuesArray = [
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000"],
    ["John Doe", "LN0002", "$400,000", "5-10-2021", "$80,000", "$60,000"],
    ["John Doe", "LN0002", "$400,000", "5-10-2021", "$80,000", "$60,000"],
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000"],
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000"],
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000"],
    ["Lindsey Stroud", "LN0001", "$600,000", "4-10-2021", "$100,000", "$100,000"],
    ["John Doe", "LN0002", "$400,000", "5-10-2021", "$80,000", "$60,000"],
    // Add more arrays for additional rows
  ];

  for (const values of valuesArray) {
    const obj = {
      "Customer Name": values[0],
      "Loan ID": values[1],
      "Repayment Amount": values[2],
      "Loan Repayment Date": values[3],
      "Loan Principal Repayment": values[4],
      "Last Interest Repayment": values[5]
    };
    data.push(obj);
  }


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
  }

  return (
    <div id="loan-inquiry">
      <h3 className="page-title">
        <NavLink to="/application">Application </NavLink>
        / Report Details
      </h3>
      <div className="navigate-btn">
        <div></div>
        <NavLink to="/application"><BsArrowLeft /> Back</NavLink>
      </div>
      <div className="borrower-details">
        <div className="borrower-details_header">
          <h3>View Information</h3>
        </div>
        <div className="borrower-details_main">
          <div className="borrower-details_profile">
            <div className="profile-pics">
              <div className="profile-pics_container">
                <img src={dp} alt="Profile Display" />
              </div>
            </div>
            <div className="profile-details">
              <div className="profile-details_row">
                <span>Customer Name</span>
                <span>Lindsey Stroud</span>
              </div>
              <div className="profile-details_row">
                <span>Info ID</span>
                <span>LN0001</span>
              </div>
              <div className="profile-details_row">
                <span>Loan Amount</span>
                <span>100,000</span>
              </div>
              <div className="profile-details_row">
                <span>Date Disbursed</span>
                <span>20-10-2021</span>
              </div>
            </div>
          </div>
          <h3 className="repayment-history">Report history</h3>
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
        </div>
      </div>
    </div>
  )
}

export default InfoDetails;