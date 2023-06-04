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
     <div className="isLoading-container-view" >
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
