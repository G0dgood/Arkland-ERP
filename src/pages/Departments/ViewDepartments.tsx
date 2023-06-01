/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { reset, viewDepartments } from "../../features/Department/departmentSlice";
import { fireAlert } from "../../utils/Alert";
import { SyncLoader } from "react-spinners";
import DeleteDepartment from "../../components/Modals/DeleteDepartment";
import projectBack from "../../assets/vectors/project-back.svg";


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
     // <div className="alt-services section-contruct">
     //  <div className="  aos-init aos-animate" data-aos="fade-up">

     //   <div className="row justify-content-around gy-4">
     //    <div className="col-lg-6 img-bg aos-init aos-animate construct-img" data-aos="zoom-in" data-aos-delay="100"></div>

     //    <div className="col-lg-5 d-flex flex-column justify-content-center">
     //     <h3>{viewdata?.department?.name}</h3>

     //     <div className="icon-box d-flex position-relative aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
     //      <i className="bi bi-easel flex-shrink-0">{viewdata?.department?.status === "active" ? <BsFillCheckCircleFill color="green" size={35} /> : <BsFillXCircleFill color="red" size={35} />} </i>
     //      <div>
     //       <h4>
     //        <a href="" className="stretched-link">{viewdata?.department?.name}</a>
     //       </h4>
     //       <p className={viewdata?.department?.status === "active" ? "active-view" : "active-not-view"}>{viewdata?.department?.status}</p>
     //      </div>
     //     </div>

     //     <div className="back-btn-icon-sub mt-5">
     //      <Button
     //       variant="contained"
     //       className="back-btn-icon"
     //       id="Add-btn-sub"
     //       onClick={() => navigate(-1)}
     //      >
     //       <FaArrowLeft size={25} />
     //      </Button>


     //      <DeleteDepartment id={viewdata?.department?.id} />
     //     </div>


     //    </div>
     //   </div>

     //  </div>
     // </div>
     <div  >

      <div className="EssentialsContainer">
       <div className="employee-main-div-col">
        <div className="employee-main-div-col-header">
         <div>
          <img
           src={projectBack}
           alt="User"
           className="project-back-img"
           onClick={() => navigate(-1)}
           title="Return"
          />
         </div>
         <div className="employee-main-div-col-header-buttons">
          <DeleteDepartment id={viewdata?.department?.id} />
         </div>
        </div>

        <h4 style={{ marginTop: "3rem" }}>
         Review Termination request
        </h4>

        <div
         className="viewprofile-container"
         style={{ marginTop: "2rem" }}
        >
         <div>
          <div className="getjob-application-details">
           <p>Employee</p>
           <p onClick={() => navigate(`/employees/${viewdata?.department?.employee?.id}`)}
            style={{ cursor: "pointer", color: "blue", }}  >
            {viewdata?.department?.employee?.full_name}
           </p>
           <p>Description</p>
           <p> {viewdata?.department?.description} </p>

           <p>Status</p>
           <p> {viewdata?.department?.status} </p>
          </div>
         </div>
        </div>
       </div>
      </div>

     </div>
    )
   }
  </div>


 );
};

export default ViewDepartments;
