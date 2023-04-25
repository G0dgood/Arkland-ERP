import React from "react";
import { Button } from "@material-ui/core";

const ResetPassword = () => {
  return (
    <div className="form-cont">
      <form>
        <div className="form-grp">
          <label htmlFor="prev-pass">Previous Password</label>
          <input type="text" id="prev-pass" required />
        </div>
        <div className="form-grp">
          <label htmlFor="new-pass">New Password</label>
          <input type="text" id="new-pass" required />
        </div>
        <div className="form-grp">
          <label htmlFor="confirm-pass">Confirm Password</label>
          <input type="text" id="confirm-pass" required />
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

export default ResetPassword;
