import React, { useState } from "react";
import { Button } from '@material-ui/core';

const EditEducation = () => {
  const [institutionAttended, setInstitutionAttended] = useState("");
  const [courseOfStudy, setCourseOfStudy] = useState("");
  const [yearOfGraduation, setYearOfGraduation] = useState("");
  const [professionalMembership, setProfessionalMembership] = useState("");

  return (
    <div className="form-cont">
      <form>
        <div className='profile-form-flex'>
          <div className="form-grp">
            <label htmlFor="uni">Institution Attended</label>
            <input
              type="text"
              id="uni"
              value={institutionAttended}
              onChange={(e) => setInstitutionAttended(e.target.value)}
              required
            />
          </div>
          <div className="form-grp">
            <label htmlFor="course">Course of Study</label>
            <input
              type="text"
              id="course"
              value={courseOfStudy}
              onChange={(e) => setCourseOfStudy(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='profile-form-flex'>
          <div className="form-grp">
            <label htmlFor="prof">Professional Membership</label>
            <input
              type="text"
              id="prof"
              value={professionalMembership}
              onChange={(e) => setProfessionalMembership(e.target.value)}
              required
            />
          </div>
          <div className="form-grp">
            <label htmlFor="year">Year of Graduation</label>
            <input
              type="text"
              id="year"
              value={yearOfGraduation}
              onChange={(e) => setYearOfGraduation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form_btn">
          <Button variant="outlined" className={"add-experience"}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEducation;
