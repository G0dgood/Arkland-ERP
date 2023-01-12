import React from 'react';
import { Button } from '@material-ui/core';

const EditNextKin = () => {
  return (
    <div className="form-cont">
      <form>
        <div className="form-grp">
          <label htmlFor="fname">Next of Kin First Name</label>
          <input type="text" id="fname" required />
        </div>
        <div className="form-grp">
          <label htmlFor="mname">Middle Name</label>
          <input type="text" id="mname" required />
        </div>
        <div className="form-grp">
          <label htmlFor="lname">Last Name</label>
          <input type="text" id="lname" required />
        </div>
        <div className="form-grp">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div className="form-grp">
          <label htmlFor="date">Date Joined</label>
          <input type="date" id="date" required />
        </div>
        <div className="form-grp">
          <label htmlFor="staffId">Staff ID</label>
          <input type="text" id="staffId" required />
        </div>
        <div className="form-grp">
          <label htmlFor="dept">Department</label>
          <select id="dept" required>
            <option></option>
            <option value=""></option>
          </select>
        </div>
        <div className="form_btn">
          <Button variant="outlined" className={"Add-btn-edit"}>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
};

export default EditNextKin;
