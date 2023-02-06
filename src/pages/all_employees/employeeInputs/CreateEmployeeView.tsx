import React from "react";
import { Button } from "@material-ui/core";
import logo from "../../../assets/images/ASLLOGO.svg";

const CreateEmployeeView = ({
  active,
  employee,
  setEmployee,
  setActive,
}: any) => {
  console.log("create complete view", employee);
  return (
    <div
      className={
        active === 6 ? "EssentialsContainer  demo-wrap more-view" : "d-none"
      }
    >
      <img className="demo-bg" src={logo} alt="" />
      <h4 style={{ marginTop: "3rem" }}>New Employee Details</h4>
      <div className="viewprofile-container" style={{ marginTop: "7rem" }}>
        <div>
          <div className="getjob-application-details">
            <p>Date of Birth</p>
            <p>03/16/1988</p>
            <p>Full Name</p>
            <p>James Abiodun</p>
            <p>Address</p>
            <p>24 Eze Str Lekki 1</p>
            <p>City</p>
            <p>Lagos Island</p>
            <p>State</p>
            <p>Lagos</p>
            <p>Phone</p>
            <p>+234 706 345 6677 </p>
          </div>
        </div>
        <div>
          <div className="getjob-application-details">
            <p>Date of Joining</p>
            <p>10/01/2021</p>
            <p>Role</p>
            <p>Developer</p>
            <p>Line Manager</p>
            <p>Peter Obi</p>
            <p>Department</p>
            <p>IT</p>
            <p>Employer ID</p>
            <p>340-2222</p>
            <p>Station</p>
            <p>A&A Towers, Floor 3, Room 5 </p>
          </div>
        </div>
      </div>
      <div id="Essential-btn" style={{ marginTop: "20rem" }}>
        <Button
          variant="outlined"
          className={"Add-btn-edit"}
          onClick={() => setActive(6)}
        >
          Create Employee
        </Button>
      </div>
    </div>
  );
};

export default CreateEmployeeView;
