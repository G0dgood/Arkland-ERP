import { useEffect } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import projectBack from "../../../assets/vectors/project-back.svg";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import RequestEmployeeTerminationModal from "../../../components/Modals/RequestEmployeeTerminationModal";
import { viewWarning } from "../../../features/Employee/employeeSlice";
import UpdateWarning from "./UpdateWarning";
// import RespondToWarning from "./RespondToWarning";
import { capitalizeFirstLetters } from "../../../components/CapitalizeFirstLetters";


const ViewWarning = () => {

 const navigate = useNavigate();
 const dispatch = useAppDispatch();
 const { id } = useParams<{ id: string }>();
 const { viewwarningdata, viewwarningisLoading } = useAppSelector((state: any) => state.employee)




 useEffect(() => {
  // @ts-ignore
  dispatch(viewWarning(id));
 }, [dispatch, id]);

 return (
  <div  >
   {viewwarningisLoading ? (
    <div className="isLoading-container-view" >
     <BounceLoader
      color={"#990000"}
      loading={viewwarningisLoading}
     />
    </div>
   ) : (
    <div className="EssentialsContainer">
     <div className="employee-main-div-col">
      <div className="employee-main-div-col-header">
       <div>
        <img
         src={projectBack}
         alt="User"
         className="project-back-img"
         onClick={() => navigate("/warning")}
         title="Return"
        />
       </div>

       <div className="employee-main-div-col-header-buttons">
        {/* <RespondToWarning id={id} /> */}
        <UpdateWarning id={id} />
        <RequestEmployeeTerminationModal />
       </div>

      </div>

      <h4 style={{ marginTop: "3rem" }}>Review Warning</h4>

      <div className="viewprofile-container">
       <div>
        <div className="getjob-application-details">
         <p>Employee</p>
         <p onClick={() =>
          navigate(`/employees/employees/${viewwarningdata?.data?.employee?._id}`)}
          style={{
           cursor: "pointer",
           color: "blue",
          }}
         >
          {viewwarningdata?.data?.employee?.full_name}
         </p>
         <p>Misconduct</p>
         <p>{capitalizeFirstLetters(viewwarningdata?.data?.misconduct)} </p>

         <p>Message</p>
         <p>{viewwarningdata?.data?.message} </p>

         {viewwarningdata.hdata?.as_response ? (
          <>
           <p>Response</p>
           <p> {viewwarningdata?.data?.response}</p>
          </>
         ) : (
          ""
         )}

         <p>Count</p>
         <p>{viewwarningdata?.data?.count}</p>
         <p>Status</p>
         <p> {viewwarningdata?.data?.status} </p>
         <p>Created by</p>
         <p>{viewwarningdata?.data?.created_by?.full_name}</p>
         <p>Created at</p>
         <p>
          {moment(viewwarningdata?.data?.created_at).format("DD-MM-YYYY")}
         </p>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
};

export default ViewWarning;
