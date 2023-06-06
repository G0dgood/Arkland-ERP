import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { BsCheckCircle, BsClock, BsExclamationLg } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import {
 EntriesPerPage,
 MainSearch,
 NoRecordFound,
 TableFetch,
} from "../../../components/TableOptions";
import Pagination from "../../../components/Pagination";


import TableLoader from "../../../components/TableLoader";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { getTerminations } from "../../../features/Employee/employeeSlice";

const TerminationList = () => {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();

 const { terminationsdata, terminationsisError, terminationsisLoading, terminationsmessage } = useAppSelector((state: any) => state.employee)
 useEffect(() => {
  // @ts-ignore
  dispatch(getTerminations());
 }, [dispatch]);


 const header = [
  { title: "EMPLOYEE NAME", prop: "employee" },
  { title: "REASON", prop: "reason" },
  { title: "DESCRIPTION", prop: "description" },
  { title: "STATUS", prop: "status" },
  { title: "CREATED BY", prop: "created_by" },
  { title: "VIEW", prop: "view" }
 ];



 // --- Pagination --- //
 const [entriesPerPage, setEntriesPerPage] = useState(() => {
  return localStorage.getItem("reportsPerPage") || "10";
 });

 useEffect(() => {
  localStorage.setItem("reportsPerPage", entriesPerPage);
 }, [entriesPerPage]);



 const [displayData, setDisplayData] = useState([]);

 return (
  <div >
   <div className="SiteWorkermaindiv">
    <div className="SiteWorkermaindivsub">
     {/* <Button
      variant="contained"
      className="back-btn-icon"
      id="Add-btn-sub"
      onClick={() => navigate(-1)}
     >
      <FaArrowLeft size={25} />
     </Button> */}
     <span className="SupportmainTitleh3">TERMINATIONS</span>
    </div>
    <div>
     <EntriesPerPage
      data={terminationsdata?.data}
      entriesPerPage={entriesPerPage}
      setEntriesPerPage={setEntriesPerPage}
     />
    </div>
    <div>
     <MainSearch placeholder={"Search...          terminations"} />
    </div>
   </div>
   <section className="md-ui component-data-table">
    <div className="main-table-wrapper">
     {terminationsisLoading ? <TableLoader isLoading={terminationsisLoading} /> : ""}
     <table className="main-table-content">
      <thead className="data-table-header">
       <tr className="data-table-row">
        {header.map((i, index) => {
         return (
          <>
           <td className="table-datacell datatype-numeric" key={index}  >
            {i?.title}
           </td>
          </>
         );
        })}
       </tr>
      </thead>
      <tbody className="data-table-content">
       {terminationsisLoading ? (
        <TableFetch colSpan={8} />
       ) : displayData?.length === 0 || displayData == null ? (
        <NoRecordFound colSpan={8} />
       ) : (
        displayData.map((item: any, i: any) => (
         <tr
          className="data-table-row"
          onClick={() => navigate(`/terminations/${item._id}`)}
          key={i}>
          <td className="table-datacell datatype-numeric">
           {item?.employee?.full_name}
          </td>
          <td className="table-datacell datatype-numeric">
           {item?.reason}
          </td>
          <td className="table-datacell datatype-numeric">
           {item?.description}
          </td>
          <td className="table-datacell datatype-numeric">
           {item?.status === "pending" ? (
            <BsClock
             size={25}
             color={"#bf8412"}
             className="icon-bold"
            />
           ) : item?.status === "rejected" ? (
            <SlClose
             size={25}
             color={"red"}
             className="icon-bold"
            />
           ) : (
            <BsCheckCircle size={25} color={"green"} />
           )}
          </td>
          <td className="table-datacell datatype-numeric">
           {item?.created_by?.full_name}
          </td>
          <td className="table-datacell datatype-numeric">
           <Link to={`/terminations/${item?._id}`} >
            <Button id="team-applicatiom-update"  >View</Button>
           </Link>

          </td>
         </tr>
        ))
       )}
      </tbody>
     </table>
    </div>
   </section>
   <footer className="main-table-footer">
    <Pagination
     setDisplayData={setDisplayData}
     data={terminationsdata?.data}
     entriesPerPage={entriesPerPage}
     Total={"Employee"}
    />
   </footer>
  </div>
 );
};

export default TerminationList;
