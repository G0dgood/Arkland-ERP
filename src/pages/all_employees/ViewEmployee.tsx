import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import projectBack from "../../assets/vectors/project-back.svg";
import CreateWarningModal from "../../components/Modals/CreateWarningModal";
import { getUserPrivileges } from "../../functions/auth";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { hrViewEmployees } from "../../features/Employee/employeeSlice";
import DeleteEmployeeModal from "../../components/Modals/DeleteEmployeeModal";
import { SVGLoader } from "../../components/SVGLoader";




const ViewEmployee = () => {
 const navigate = useNavigate();
 const dispatch = useAppDispatch();

 const { viewdata, viewisLoading } = useAppSelector((state: any) => state.employee)
 const { employee, salary } = viewdata
 const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();
 const { id } = useParams<{ id: string }>();

 console.log('viewdata', viewdata)


 useEffect(() => {
  // @ts-ignore
  dispatch(hrViewEmployees(id));
 }, [dispatch, id]);



 const [isEssentialDetailsOpen, setIsEssentialDetailsOpen] = useState(true);
 const [isFinancialDetailsOpen, setIsFinancialDetailsOpen] = useState(false);
 const [isReferencesOpen, setIsReferencesOpen] = useState(false);
 const [isDetailsOpen, setIsDetailsOpen] = useState(false);



 return (
  <div>
   {viewisLoading ? (
    <div className="isLoading-container-view">
     <SVGLoader width={"60px"} height={"60px"} />
    </div>
   ) : (
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
       {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
        <CreateWarningModal id={id} />
       )}
       {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
        <Button
         className="add-experience"
         onClick={() => navigate(`/employees/employees/edit/${id}`, { state: { data: viewdata } })}
        >
         Edit Employee
        </Button>
       )}
       {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
        <DeleteEmployeeModal id={id} />
       )}
      </div>

     </div>

     <h4 style={{ marginTop: "3rem" }}>Review Employee Details</h4>
     <h6
      style={{ marginTop: "3rem", cursor: "pointer" }}
      onClick={() =>
       setIsEssentialDetailsOpen(!isEssentialDetailsOpen)
      }
     >
      Employee Essential Details{"  "}
      {isEssentialDetailsOpen ? "▼" : "►"}
     </h6>
     {isEssentialDetailsOpen && (
      <div
       className="viewprofile-container"
       style={{ marginTop: "2rem" }}
      >
       <div>
        <div className="getjob-application-details">
         <p>Full Name</p>
         <p>{employee?.full_name}</p>
         <p>Email</p>
         <p>{employee?.personal_email}</p>
         <p>Phone</p>
         <p>{employee?.phone} </p>
         <p>Date of Birth (DD-MM-YYYY)</p>
         <p>
          {" "}
          {moment(employee?.date_of_birth).format("DD-MM-YYYY")}
         </p>
         <p>Age</p>
         <p>
          {" "}
          {
           moment(employee?.date_of_birth).fromNow().split(" ")[0]
          }{" "}
          years old
         </p>
         <p>Gender</p>
         <p> {employee?.gender}</p>
         <p>Marital Status</p>
         <p> {employee?.marital_status}</p>
         <p>Country</p>
         <p>{employee?.country}</p>
         <p>State</p>
         <p> {employee?.state_of_origin} </p>
         <p>Address</p>
         <p>{employee?.address}</p>
         <p>City</p>
         <p>{employee?.city}</p>
        </div>
       </div>
       <div>
        <div className="getjob-application-details">
         <p>Expatriate</p>
         <p>
          {employee?.is_expatriate === true ? "Yes" : "No"}
         </p>
         {employee?.is_expatriate === true ? (
          <>
           <>
            <p>Passport Number</p>
            <p>{employee?.passport_number}</p>
           </>
           <>
            <p>Visa Type</p>
            <p>{employee?.visa_type}</p>
           </>
           <>
            <p>Visa Duration</p>
            <p>{employee?.visa_duration} months </p>
           </>
          </>
         ) : (
          <>
           <p>NIN</p>
           <p>{employee?.nin}</p>
          </>
         )}

         <p>Instiution attended</p>
         <p>{employee?.institution_attended}</p>
         <p>Course studied</p>
         <p>{employee?.course_studied}</p>
         <p>Qualification</p>
         <p>{employee?.qualification}</p>
        </div>
       </div>
      </div>
     )}
     <h6
      style={{ marginTop: "3rem", cursor: "pointer" }}
      onClick={() =>
       setIsFinancialDetailsOpen(!isFinancialDetailsOpen)
      }
     >
      Employee Financial Details
      {isFinancialDetailsOpen ? "▼" : "►"}
     </h6>
     {isFinancialDetailsOpen && (
      <div
       className="viewprofile-container"
       style={{ marginTop: "2rem" }}
      >
       <div>
        <div className="getjob-application-details">
         <p>Bank Nameeeeeee</p>
         <p>{employee?.bank_name}</p>
         <p>Bank Account Number</p>
         <p>{employee?.bank_account_number}</p>
         <p>Bank Account Name</p>
         <p>{employee?.bank_account_name} </p>
         <p>Gross Salary</p>
         <p>₦ {salary?.basic_salary}</p>
         <p>Meal Allowance</p>
         <p>₦ {salary?.meal_allowance}</p>
        </div>
       </div>
       <div>
        <div className="getjob-application-details">
         <p>Basic Salary</p>
         <p>₦ {salary?.basic_salary}</p>
         <p> Medical Allowance</p>
         <p> ₦ {salary?.medical_allowance}</p>
         <p> Housing Allowance</p>
         <p>₦ {salary?.housing_allowance}</p>
         <p> Transportation Allowance</p>
         <p>₦ {salary?.transportation_allowance} </p>
         <p> Utility Allowance</p>
         <p>₦ {salary?.utility_allowance}</p>
        </div>
       </div>
      </div>
     )}

     <h6
      style={{ marginTop: "3rem", cursor: "pointer" }}
      onClick={() => setIsReferencesOpen(!isReferencesOpen)}
     >
      Employee References
      {isReferencesOpen ? "▼" : "►"}
     </h6>
     {isReferencesOpen && (
      <div className="viewprofile-container" style={{ marginTop: "2rem" }} >
       <div>
        <div className="getjob-application-details">
         <p>Next of Kin</p>
         <p>{employee?.next_of_kin}</p>
         <p>Next of Kin Phone Number</p>
         <p>{employee?.next_of_kin_phone}</p>
         <p>Next of Kin Email</p>
         <p>{employee?.next_of_kin_email} </p>
         <p> Next of Kin Address</p>
         <p> ₦ {employee?.next_of_kin_address}</p>
        </div>
       </div>
       <div>
        <div className="getjob-application-details">
         <p>Referee Name</p>
         <p>{employee?.referee_name}</p>
         <p>Referee Phone Number</p>
         <p>{employee?.referee_phone}</p>
         <p>Emergency Contact Name</p>
         <p>{employee?.emergency_contact_name} </p>
         <p>Emergency Contact Phone</p>
         <p>{employee?.emergency_contact_phone}</p>
        </div>
       </div>
      </div>
     )}

     <h6 style={{ marginTop: "3rem", cursor: "pointer" }} onClick={() => setIsDetailsOpen(!isDetailsOpen)}  >
      Details of employment
      {isDetailsOpen ? "▼" : "►"}
     </h6>
     {isDetailsOpen && (
      <div className="viewprofile-container" style={{ marginTop: "2rem" }} >
       <div>
        <div className="getjob-application-details">
         <p>Department</p>
         <p>{employee?.department?.name}</p>
         <p>Role</p>
         <p>{employee?.role?.name}</p>
         <p>Work Location Objection</p>
         <p> {employee.has_work_location_objection === true ? "Yes" : "No"} </p>
         <p>Tally Number</p>
         <p>{employee?.tally_number}</p>
        </div>
       </div>
       <div>
        <div className="getjob-application-details">
         <p>Employment ID</p>
         <p>{employee?.employee_id} </p>
         <p>Employment Type</p>
         <p>{employee?.employment_type}</p>
         <p>Employment Date (DD-MM-YYYY)</p>
         <p>{moment(employee?.employment_date).format("DD-MM-YYYY")}</p>
         <p>Employment Duration (Months)</p>
         <p>{employee?.employment_duration}</p>
        </div>
       </div>
      </div>
     )}
    </div>
   )}
  </div>
 );
};

export default ViewEmployee;
