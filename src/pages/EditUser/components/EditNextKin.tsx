import React from 'react';
import { Button } from "@material-ui/core";

const EditNextKin = () => {
  return (
    <div className="form-cont">
      <form>
        <div className='profile-form-form'>
          <div className="form-grp">
            <label htmlFor="fname">Next of Kin First Name</label>
            <input type="text" id="fname" required />
          </div>
          <div className="form-grp">
            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" required />
          </div>
          <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
        </div>
        <div className='profile-form-flex'>
          <div className="form-grp">
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" required />
          </div>
          <div className="form-grp">
            <label htmlFor="relationship">Relationship</label>
            <input type="text" id="relationship" required />
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
};

export default EditNextKin;
