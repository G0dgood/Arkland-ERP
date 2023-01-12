import React from 'react';
import { Button } from "@material-ui/core";

const EditProfile = () => {
  return (
    <div className="form-cont">
      <form>
        <div className='profile-form-form'>
          <div className="form-grp">
            <label htmlFor="fname">Full Name</label>
            <input type="text" id="fname" required placeholder='Full Name' />
          </div>
          <div className="form-grp">
            <label htmlFor="lname">Contact Number</label>
            <input type="text" id="lname" required placeholder='Contact Number' />
          </div>
          <div className="form-grp">
            <label htmlFor="mname">Private Email</label>
            <input type="text" id="mname" required placeholder='Enter Private Email' />
          </div>

          <div className="form-grp">
            <label htmlFor="email">Gender</label>
            <input type="email" id="email" required placeholder='Gender' />
          </div>
          <div className="form-grp">
            <label htmlFor="dept">Date of Joining</label>
            <select id="department">
              <option value=" "></option>
            </select>
          </div>
          <div className="form-grp">
            <label htmlFor="staffid">Date of Last Promotion</label>
            <input type="date" id="staffid" required />
          </div>
          <div className="form-grp">
            <label htmlFor="role">Address</label>
            <input type="text" id="role" required placeholder='Enter Address' />
          </div>
          <div className="form-grp">
            <label htmlFor="promotion">State of Origin</label>
            <input type="date" id="promotion" required placeholder='Enter State of Origin' />
          </div>
          <div className="form-grp">
            <label htmlFor="joining">LGA</label>
            <input type="date" id="joining" required placeholder='Enter LGA' />
          </div>
        </div>

        <div className='profile-form-flex'>
          <div className="form-grp">
            <label htmlFor="leave">Marital Status</label>
            <input type="number" id="leave" required placeholder='Enter Marital Status' />
          </div>
          <div className="form-grp">
            <label htmlFor="leave">Religion</label>
            <input type="text" id="leave" required placeholder='Religion' />

          </div>
        </div>
        <div className="form_btn">
          <Button variant="outlined" className={"Add-btn-edit"}>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile;
