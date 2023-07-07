import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from "../../components/TableOptions";
import TableLoader from "../../components/TableLoader";
import Pagination from "../../components/Pagination";
import HttpService from "../../components/HttpService";
import moment from "moment";
import TeamLeadRequestTerminationModal from "./TeamLeadRequestTerminationModal";



const TeamLeadTerminationList = () => {

 const navigate = useNavigate();
 const [terminationsdata, setTerminationsdata] = useState<any>([])
 const [terminationsisLoading, setTerminationsisLoading] = useState<any>(false)




 useEffect(() => {
  getDataMembers()
 }, [])

 const getDataMembers = async () => {
  setTerminationsisLoading(true)
  try {
   const teamViewUrl = `teams/terminations/list`
   const teamView: any = await HttpService.get(teamViewUrl)
   setTerminationsdata(teamView?.data?.data)
   setTerminationsisLoading(false)

  } catch (error) {
   setTerminationsisLoading(false)
  }
 }

 const header = [
  { title: "EMPLOYEE NAME", prop: "employee" },
  { title: "REASON", prop: "reason" },
  { title: "DESCRIPTION", prop: "description" },
  { title: "STATUS", prop: "status" },
  { title: "DATE CREATED", prop: "date_created" },
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
      data={terminationsdata}
      entriesPerPage={entriesPerPage}
      setEntriesPerPage={setEntriesPerPage}
     />
    </div>
    <div>
     <MainSearch placeholder={"Search...          terminations"} />
    </div>
    <TeamLeadRequestTerminationModal />
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
          <td className="table-datacell datatype-numeric" key={i}>
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
           {moment(item?.item?.created_by).format("DD-MM-YYYY")}
          </td>
          <td className="table-datacell datatype-numeric" key={i}>
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
     data={terminationsdata}
     entriesPerPage={entriesPerPage}
     Total={"Termination List"}
    />
   </footer>
  </div>
 );
};

export default TeamLeadTerminationList;
