import { Button } from '@material-ui/core';
import React, { useState } from 'react';

const ResetPassword = () => {


  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")



  return (
    <div className="form-cont">
      <form  >
        <div className="form-grp">
          <label htmlFor="n-password">New Password</label>
          <input type="password" id="n-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className="form-grp">
          <label htmlFor="c-password">Confirm Password</label>
          <input type="password" id="c-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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

export default ResetPassword;
