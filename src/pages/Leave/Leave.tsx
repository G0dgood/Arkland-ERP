import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { BsCheckCircle, BsClock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ApplyForLeave from '../../components/Modals/ApplyForLeave';
import { fireAlert } from '../../utils/Alert';
import Pagination from '../../components/Pagination';
import { EntriesPerPage, NoRecordFound, TableFetch } from '../../components/TableOptions';
import TableLoader from '../../components/TableLoader';
import moment from 'moment';
import { SlClose } from 'react-icons/sl';
import { getCreateLeave, reset } from '../../features/Leave/leaveSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import DataService from '../../utils/dataService';

const dataService = new DataService()
const Leave = () => {
 const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
 const dispatch = useAppDispatch();
 const { isSuccess } = useAppSelector((state: any) => state.leave)
 const { allLeavedata, allLeaveisLoading } = useAppSelector((state: any) => state.leave)


 // --- Pagination --- //
 const [entriesPerPage, setEntriesPerPage] = useState(() => {
  return localStorage.getItem("reportsPerPage") || "10";
 });

 useEffect(() => {
  localStorage.setItem("reportsPerPage", entriesPerPage);
 }, [entriesPerPage]);

 const id = userInfo?.employee?._id

 useEffect(() => {
  // @ts-ignore
  dispatch(getCreateLeave(id));
 }, [dispatch, id]);



 useEffect(() => {
  if (isSuccess) {
   fireAlert("Successful", "Leave application Successful", "success");
   dispatch(reset(id));
   dispatch(getCreateLeave(id));
  }
 }, [isSuccess, dispatch, id])

 const [displayData, setDisplayData] = useState([]);

 return (
  <div  >
   <div className='allemployees-container-main' >
    <div className='SiteWorkermaindivsub'>
     <span className='SupportmainTitleh3'>Create Leave</span>
    </div>
    <div>
     <EntriesPerPage
      data={displayData}
      entriesPerPage={entriesPerPage}
      setEntriesPerPage={setEntriesPerPage}
     />
    </div>
    <div>
     <ApplyForLeave />
    </div>
   </div>

   <section className="md-ui component-data-table">
    {allLeaveisLoading ? <TableLoader isLoading={allLeaveisLoading} /> : ""}
    <div className="main-table-wrapper">
     <table className="main-table-content">
      <thead className="data-table-header  " >
       <tr className="data-table-row ">
        <td className="table-datacell datatype-string">Leave Type</td>
        <td className="table-datacell datatype-numeric">Start Date</td>
        <td className="table-datacell datatype-numeric">End Date</td>
        <td className="table-datacell datatype-numeric">HOD Approval</td>
        <td className="table-datacell datatype-numeric">HR Approval</td>
        <td className="table-datacell datatype-numeric">Final Approval</td>
        <td className="table-datacell datatype-numeric">Status</td>
        <td className="table-datacell datatype-numeric">View</td>
       </tr>
      </thead>
      <tbody className="data-table-content">
       {
        allLeaveisLoading ? (
         <TableFetch colSpan={8} />
        ) : displayData?.length === 0 || displayData === undefined ? (
         <NoRecordFound colSpan={8} />
        ) : (displayData?.map((item: any, i: any) => (
         <tr className="data-table-row" key={i}>
          <td className="table-datacell datatype-string">{item?.type}</td>
          <td className="table-datacell datatype-numeric">{moment(item?.start_date).format("DD-MM-YYYY")}</td>
          <td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>
          <td className="table-datacell datatype-numeric">
           {item?.hod_approved ?
            <BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
             <SlClose size={25} color={"red"} className="icon-bold" /> :
             <BsClock size={25} color={"#bf8412"} className="icon-bold" />}

          </td>
          <td className="table-datacell datatype-numeric">
           {item?.hr_approved ?
            <BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
             <SlClose size={25} color={"red"} className="icon-bold" /> :
             <BsClock size={25} color={"#bf8412"} className="icon-bold" />}
          </td>
          <td className="table-datacell datatype-numeric">
           {item?.finally_approved ?
            <BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
             <SlClose size={25} color={"red"} className="icon-bold" /> :
             <BsClock size={25} color={"#bf8412"} className="icon-bold" />}
          </td>
          <td className="table-datacell datatype-numeric"  >

           <Button className={item?.status === "HOD approved" ? "table-link" :
            item?.status === "HR approved" ? "table-link-hr" :
             item?.status === "approved" ? "table-link-active" :
              item?.status === "rejected" ? "table-link-reject" : "table-link"}>{item?.status === "HOD approved" ? "HOD approved" :
               item?.status === "HR approved" ? "HR approved" :
                item?.status === "approved" ? "LEAVE approved" :
                 item?.status === "rejected" ? "LEAVE Rejected" : "IN Progress"}</Button>
          </td>
          <td className="table-datacell datatype-numeric">
           <Link to={`/leave/leave/${item?._id}`}  >
            {item?.status === "rejected" ? "" :
             <Button id="team-applicatiom-update">{item?.hod_approved === false ? "Update" : "View"}</Button>}
           </Link>
          </td>
         </tr>
        )))}

      </tbody>
     </table>
    </div>

   </section>
   <footer className="main-table-footer">
    <Pagination
     setDisplayData={setDisplayData}
     data={allLeavedata?.data}
     entriesPerPage={entriesPerPage}
     Total={"Leave"}
    />
   </footer>
  </div>
 )
}

export default Leave






