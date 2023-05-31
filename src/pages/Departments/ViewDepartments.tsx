/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { reset, viewDepartments } from "../../features/Department/departmentSlice";
import { fireAlert } from "../../utils/Alert";
import { SyncLoader } from "react-spinners";
import DeleteDepartment from "../../components/Modals/DeleteDepartment";



const ViewDepartments = () => {
 const navigate = useNavigate();
 const dispatch = useAppDispatch();
 const { id } = useParams<{ id: string }>();
 const { viewdata, viewisError, viewisLoading, viewmessage, viewisSuccess } = useAppSelector((state: any) => state.department)


 useEffect(() => {
  if (viewisError) {
   fireAlert("Department error", viewmessage, "error");
   dispatch(reset());
  }
  else if (viewisSuccess) {
   dispatch(reset());
  }
 }, [viewisError, viewmessage, dispatch, viewisSuccess])


 useEffect(() => {
  // @ts-ignore
  dispatch(viewDepartments(id));
 }, [dispatch, id]);




 return (
  <div>
   {
    viewisLoading ? (
     <div className="isLoading-container" >
      <SyncLoader color={"#990000"} loading={viewisLoading} />
     </div>
    ) : !viewdata || viewdata === undefined ? (
     <div className="table-loader-announcement">
      <div>
       {/* eslint-disable-next-line jsx-a11y/alt-text */}
       <img src="https://img.icons8.com/wired/64/null/department.png" />
       <p className="mt-3">No department details</p>
      </div>
     </div>
    ) : (
     <div className="alt-services section-contruct">
      <div className="  aos-init aos-animate" data-aos="fade-up">

       <div className="row justify-content-around gy-4">
        <div className="col-lg-6 img-bg aos-init aos-animate construct-img" data-aos="zoom-in" data-aos-delay="100"></div>

        <div className="col-lg-5 d-flex flex-column justify-content-center">
         <h3>{viewdata?.department?.name}</h3>

         <div className="icon-box d-flex position-relative aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
          <i className="bi bi-easel flex-shrink-0">{viewdata?.department?.status === "active" ? <BsFillCheckCircleFill color="green" size={35} /> : <BsFillXCircleFill color="red" size={35} />} </i>
          <div>
           <h4>
            <a href="" className="stretched-link">{viewdata?.department?.name}</a>
           </h4>
           <p className={viewdata?.department?.status === "active" ? "active-view" : "active-not-view"}>{viewdata?.department?.status}</p>
          </div>
         </div>

         <div className="back-btn-icon-sub mt-5">
          <Button
           variant="contained"
           className="back-btn-icon"
           id="Add-btn-sub"
           onClick={() => navigate(-1)}
          >
           <FaArrowLeft size={25} />
          </Button>


          <DeleteDepartment id={viewdata?.department?.id} />
         </div>


        </div>
       </div>

      </div>
     </div>
    )
   }
  </div>

  // <div  >
  //   <div className="SiteWorkermaindiv">
  //     <div className="SiteWorkermaindivsub">
  //       <Button
  //         variant="contained"
  //         className="back-btn-icon"
  //         id="Add-btn-sub"
  //         onClick={() => navigate(-1)}
  //       >
  //         <FaArrowLeft size={25} />
  //       </Button>
  //     </div>
  //     <div>
  //       <EntriesPerPage
  //         data={displayData}
  //         entriesPerPage={entriesPerPage}
  //         setEntriesPerPage={setEntriesPerPage}
  //       />
  //     </div>
  //     <div>
  //       <MainSearch placeholder={`Search...          `} />
  //     </div>
  //   </div>
  //   <section className="md-ui component-data-table">
  //     {viewisLoading ? <TableLoader isLoading={viewisLoading} /> : ""}
  //     <div className="main-table-wrapper">
  //       <table className="main-table-content">
  //         <thead className="data-table-header">
  //           <tr className="data-table-row">
  //             {header.map((i, index) => {
  //               return (
  //                 <>
  //                   <td
  //                     className="table-datacell datatype-numeric"
  //                     key={index}
  //                   >
  //                     {i.title}
  //                   </td>
  //                 </>
  //               );
  //             })}
  //           </tr>
  //         </thead>
  //         <tbody className="data-table-content">
  //           {viewisLoading ? (
  //             <TableFetch colSpan={8} />
  //           ) : displayData?.length === 0 ||
  //             displayData == null ? (
  //             <NoRecordFound colSpan={9} />
  //           ) : (

  //             displayData?.map((item: any, i: any) => (
  //               <tr className="data-table-row">
  //                 <td className="table-datacell datatype-string">
  //                   {item?.employee_id}
  //                 </td>
  //                 <td className="table-datacell datatype-numeric">
  //                   {item?.full_name}
  //                 </td>
  //                 <td className="table-datacell datatype-numeric">
  //                   {item?.email}
  //                 </td>
  //                 {/* <td className="table-datacell datatype-numeric">
  //                   {checkForName(item?.role, roles)}
  //                 </td>
  //                 <td className="table-datacell datatype-numeric">
  //                   {checkForName(item?.department, departmentState)}
  //                 </td> */}
  //                 <td className="table-datacell datatype-numeric">
  //                   {item?.category}
  //                 </td>
  //                 <td className="table-datacell datatype-numeric">
  //                   {item?.status}
  //                 </td>
  //                 <td className="table-datacell datatype-numeric">
  //                   <div className="table-active-items">
  //                     <span>
  //                       <BsCheckCircle
  //                         size={25}
  //                         color={"green"}
  //                         onClick={() => navigate(`/employees/${item.id}`)}
  //                         title="View employee"
  //                       />
  //                     </span>
  //                   </div>
  //                 </td>
  //               </tr>
  //             ))
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </section>
  //   <footer className="main-table-footer">
  //     <Pagination
  //       setDisplayData={setDisplayData}
  //       data={viewdata}
  //       entriesPerPage={EntriesPerPage}
  //       Total={"Employee"}
  //     />
  //   </footer>

  // </div>
 );
};

export default ViewDepartments;
