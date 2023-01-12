import React, { useState } from "react";
import { Button } from "@material-ui/core";

const EditProfile = () => {
  const [dob, setDob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [privateEmail, setPrivateEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [dateOfLastPromotion, setDateOfLastPromotion] = useState("");
  const [address, setAddress] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [lga, setLga] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");

  // useEffect(() => {
  //   if(employee.employee) {
  //     setDob(employee.employee.dob)
  //     setContactNo(employee.employee.contactNo)
  //     setPrivateEmail(employee.employee.privateEmail)
  //     setGender(employee.employee.gender)
  //     setDateOfJoining(employee.employee.dateOfJoining)
  //     setDateOfLastPromotion(employee.employee.dateOfLastPromotion)
  //     setAddress(employee.employee.address)
  //     setStateOfOrigin(employee.employee.stateOfOrigin)
  //     setLga(employee.employee.lga)
  //     setMaritalStatus(employee.employee.maritalStatus)
  //     setReligion(employee.employee.religion)
  //   }
  // }, [employee])

  return (
    <div className="form-cont">
      <form>
        <div className="profile-form-form">
          <div className="form-grp">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="form-grp">
            <label htmlFor="number">Contact No:</label>
            <input
              type="text"
              id="number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div className="form-grp">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={privateEmail}
              onChange={(e) => setPrivateEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="profile-form-form">
          <div className="form-grp">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}>
              <option></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-grp">
            <label htmlFor="date">Date Joined</label>
            <input
              type="date"
              id="date"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
            />
          </div>
          <div className="form-grp">
            <label htmlFor="date-lastPr">Date of Last Promotion</label>
            <input
              type="date"
              id="date-lastPr"
              value={dateOfLastPromotion}
              onChange={(e) => setDateOfLastPromotion(e.target.value)}
            />
          </div>
        </div>
        <div className="profile-form-form">
          <div className="form-grp">
            <label htmlFor="state">State of Origin</label>
            <input
              type="text"
              id="state"
              value={stateOfOrigin}
              onChange={(e) => setStateOfOrigin(e.target.value)}
            />
          </div>
          <div className="form-grp">
            <label htmlFor="lga">L.G.A</label>
            <input
              type="text"
              id="lga"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
            />
          </div>
          <div className="form-grp">
            <label htmlFor="address">Residential Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="profile-form-flex">
          <div className="form-grp">
            <label htmlFor="status">Marital Status</label>
            <select
              id="status"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}>
              <option></option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div className="form-grp">
            <label htmlFor="religion">Religion</label>
            <input
              type="text"
              id="religion"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            />
          </div>
        </div>
        <div className="form_btn">
          <Button variant="outlined" className={"Add-btn-edit"}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
