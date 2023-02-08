import React from "react";
import moment from "moment";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import logo from "../../../assets/images/ASLLOGO.svg";
import { fireAlert } from "../../../utils/Alert";

const CreateEmployeeView = ({ active, employee }: any) => {
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    const allEmployeeValues = { ...employee };
    await axios
      .post(`${process.env.REACT_APP_API}/hr/employees`, allEmployeeValues)
      .then((res: AxiosResponse) => {
        setLoading(false);
        const title = "Employee creation request successful";
        const html = `Request to create an employee sent`;
        const icon = "success";
        fireAlert(title, html, icon);
        navigate(`/allemployees`);
      })
      .catch((err) => {
        setLoading(false);
        const html = err.response.data.message;
        const icon = "error";
        const title = "Employee creation request failed";
        fireAlert(title, html, icon);
      });
  };
  return (
    <div
      className={
        active === 6 ? "EssentialsContainer  demo-wrap more-view" : "d-none"
      }
    >
      <img className="demo-bg" src={logo} alt="" />
      <h4 style={{ marginTop: "3rem" }}>Review Employee Details</h4>
      <h6 style={{ marginTop: "3rem" }}>Employee Essential Details</h6>
      <div className="viewprofile-container" style={{ marginTop: "2rem" }}>
        <div>
          <div className="getjob-application-details">
            <p>Full Name</p>
            <p>
              {`${employee?.first_name},` +
                " " +
                employee?.middle_name +
                " " +
                employee?.last_name}
            </p>
            <p>Email</p>
            <p>{employee?.email}</p>
            <p>Phone</p>
            <p>{employee?.phone} </p>
            <p>NIN</p>
            <p>{employee?.nin}</p>
            <p>Gender</p>
            <p> {employee?.gender}</p>
            <p>Marital Status</p>
            <p> {employee?.marital_status}</p>
            <p>Date of Birth (DD-MM-YYYY)</p>
            <p> {moment(employee?.date_of_birth).format("DD-MM-YYYY")}</p>
            <p>Age</p>
            <p>
              {" "}
              {moment(employee?.date_of_birth).fromNow().split(" ")[0]} years
              old.
            </p>
          </div>
        </div>
        <div>
          <div className="getjob-application-details">
            <p>Expatriate</p>
            <p>{employee.is_expatriate === true ? "Yes" : "No"}</p>
            <p>Country</p>
            <p>{employee?.country}</p>
            <p>State</p>
            <p> {employee?.state_of_origin} </p>
            <p>Address</p>
            <p>{employee?.address}</p>
            <p>City</p>
            <p>{employee?.city}</p>
            <p>Instiution attended</p>
            <p>{employee?.institution_attended}</p>
            <p>Course studied</p>
            <p>{employee.course_studied}</p>
            <p>Qualification</p>
            <p>{employee.qualification}</p>
          </div>
        </div>
      </div>
      <h6 style={{ marginTop: "3rem" }}>Employee Financial Details</h6>
      <div className="viewprofile-container" style={{ marginTop: "2rem" }}>
        <div>
          <div className="getjob-application-details">
            <p>Bank Name</p>
            <p>{employee?.bank_name}</p>
            <p>Bank Account Number</p>
            <p>{employee?.bank_account_number}</p>
            <p>Bank Account Name</p>
            <p>{employee?.bank_account_name} </p>
            <p> Basic Salary</p>
            <p> ₦ {employee?.basic_salary}</p>
            <p> Meal Allowance</p>
            <p> ₦ {employee?.meal_allowance}</p>
          </div>
        </div>
        <div>
          <div className="getjob-application-details">
            <p> Medical Allowance</p>
            <p> ₦ {employee?.medical_allowance}</p>
            <p> Housing Allowance</p>
            <p>₦ {employee?.housing_allowance}</p>
            <p> Transportation Allowance</p>
            <p>₦ {employee?.transportation_allowance} </p>
            <p> Utility Allowance</p>
            <p>₦ {employee?.utility_allowance}</p>
          </div>
        </div>
      </div>
      <h6 style={{ marginTop: "3rem" }}>Employee References</h6>
      <div className="viewprofile-container" style={{ marginTop: "2rem" }}>
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

      <h6 style={{ marginTop: "3rem" }}>Details of employment</h6>
      <div className="viewprofile-container" style={{ marginTop: "2rem" }}>
        <div>
          <div className="getjob-application-details">
            <p>Department</p>
            <p>{employee?.department}</p>
            <p>Role</p>
            <p>{employee?.role}</p>
            <p>Work Location Objection</p>
            <p>
              {employee.has_work_location_objection === true ? "Yes" : "No"}
            </p>
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

      <div id="Essential-btn" style={{ marginTop: "20rem" }}>
        <Button
          variant="outlined"
          className={"Add-btn-edit"}
          onClick={handleSubmit}
        >
          {isLoading ? "Processing..." : "          Create Employee"}
        </Button>
      </div>
    </div>
  );
};

export default CreateEmployeeView;
