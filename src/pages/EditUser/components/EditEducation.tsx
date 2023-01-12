import React from 'react';
import { Button } from "@material-ui/core";

const EditEducation = () => {
  return (
    <div className="profile-form-form">
      <form>
        <div className='profile-form-flex'>
          <div className="form-grp">
            <label htmlFor="institution">Institution Attended</label>
            <input type="text" id="institution" required />
          </div>
          <div className="form-grp">
            <label htmlFor="course">Course Of Study</label>
            <input type="text" id="course" required />
          </div>
        </div>
        <div className='profile-form-flex'>
          <div className="form-grp">
            <label htmlFor="membership">Proffesional Membership</label>
            <input type="text" id="membership" required />
          </div>
          <div className="form-grp">
            <label htmlFor="graduation">Year Of Graduation</label>
            <input type="date" id="graduation" required />
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

export default EditEducation;
