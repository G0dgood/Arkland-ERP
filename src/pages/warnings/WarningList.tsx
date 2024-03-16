import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
 NoRecordFound,
 SearchComponent,
 TableFetch,
} from "../../components/TableOptions";
import Pagination from "../../components/Pagination";
import CreateWarningModal from "../../components/Modals/CreateWarningModal";
import TableLoader from "../../components/TableLoader";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { getWarning } from "../../features/Employee/employeeSlice";
import { Button } from "@material-ui/core";
import DeactivateExpiredWarnings from "./DeactivateExpiredWarnings";
import { capitalizeFirstLetters } from "../../components/CapitalizeFirstLetters";



const WarningList = () => {
 const dispatch = useAppDispatch();
 const { warningdata, warningisError, warningisLoading, warningmessage } = useAppSelector((state: any) => state.employee)
 const { createwarningisSuccess } = useAppSelector((state: any) => state.employee)
 const { deactivateWarningisSuccess } = useAppSelector((state: any) => state.employee)

 useEffect(() => {
  dispatch(getWarning());
  if (deactivateWarningisSuccess) {
   dispatch(getWarning());
  }
 }, [deactivateWarningisSuccess, dispatch]);


 console.log('warningdata', warningdata)


 const header = [
  { title: "FULL NAME", prop: "last_name" },
  { title: "MESSAGE", prop: "message" },
  { title: "MISCONDUCT", prop: "misconduct" },
  { title: "NUMBER OF WARNINGS", prop: "count" },
  { title: "STATUS", prop: "status" },
  { title: "VIEW", prop: "view" }
 ];


 // --- Pagination --- //
 const [entriesPerPage, setEntriesPerPage] = useState(() => {
  return localStorage.getItem("reportsPerPage") || "10";
 });

 useEffect(() => {
  localStorage.setItem("reportsPerPage", entriesPerPage);
 }, [entriesPerPage]);


 useEffect(() => {
  if (createwarningisSuccess) {
   dispatch(getWarning());
  }
 }, [warningmessage, warningisError, dispatch, createwarningisSuccess])

 const [displayData, setDisplayData] = useState([]);


 return (
  <div id="reports">
   <h5 className="page-title">Warning List</h5>
   <ul className="nav-tabs-btn mb-4">
    <CreateWarningModal />
    <DeactivateExpiredWarnings />
   </ul>
   <div className='half-background'>
    <SearchComponent sortData={warningdata} entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} parameter={false} addemployee={false} placeholder={"Warnings"} />

    <section className="md-ui component-data-table">
     <div className="main-table-wrapper">
      {warningisLoading ? <TableLoader isLoading={warningisLoading} /> : ""}
      <table className="main-table-content">
       <thead className="data-table-header">
        <tr className="data-table-row">
         {header.map((i, index) => {
          return (
           <>
            <td
             className="table-datacell datatype-numeric"
             key={index}
            >
             {i?.title}
            </td>
           </>
          );
         })}
        </tr>
       </thead>
       <tbody className="data-table-content">
        {warningisLoading ? (
         <TableFetch colSpan={8} />
        ) : displayData?.length === 0 || displayData == null ? (
         <NoRecordFound colSpan={8} />
        ) : (
         displayData?.map((item: any, i: any) => (
          <tr className="data-table-row" key={i}>
           <td className="table-datacell  ">
            {item?.employee?.full_name}
           </td>
           <td className="table-datacell datatype-numeric">
            {item?.message}
           </td>
           <td className="table-datacell datatype-numeric">
            {capitalizeFirstLetters(item?.misconduct)}
           </td>
           <td className="table-datacell datatype-numeric">
            {item?.count}
           </td>
           <td className="table-datacell datatype-numeric">
            {item?.status}
           </td>
           <td className="table-datacell datatype-numeric" key={i}>
            <Link to={`/warning/warning/${item?._id}`}  >
             <Button id="view-status">  View</Button>
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
      data={warningdata?.data}
      entriesPerPage={entriesPerPage}
      Total={"Warning"}
     />
    </footer>
   </div>
  </div>
 );
};

export default WarningList;
