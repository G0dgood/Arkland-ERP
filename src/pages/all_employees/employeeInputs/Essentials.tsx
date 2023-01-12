import React from "react";
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import moment from "moment";
import InputField from "../../../components/Inputs/InputField";
import SelectField from "../../../components/Inputs/SelectField";

const Essentials = () => {
  const handleSubmit = (values: any) => {};
  const genderOptions = ["Select gender", "Male", "Female"];
  const disability = ["Select gender", "Male", "Female"];

  const validate = Yup.object().shape({
    first_name: Yup.string().required("Family name is required"),
  });
  const formatDate = (date: Date) => moment(date).format("YYYY-MM-DD");
  const dateChange = (date: Date, dateType: any) => {
    if (dateType === "dob") {
    }
  };
  return (
    <div className="EssentialsContainer">
      <Formik
        initialValues={{
          first_name: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        {(formik) => (
          <Form>
            <div className="testbox">
              <form>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="First name"
                        name="first_name"
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Middle Name"
                        name="middle_name"
                        placeholder="Enter middle name"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Last Name"
                        name="last_name"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                </div>
                <div className="imput-space" />
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Email"
                        name="Email"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Phone"
                        name="Phone"
                        placeholder="Enter Phone"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <SelectField
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <span className="input__label">Date of birth</span>
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        onChange={(value: any) =>
                          formik.setFieldValue(
                            "dob",
                            formatDate({ value }.value)
                          )
                        }
                        className="select-input agent-project__owner form-control"
                      />
                      {/* <label>Date of Birth</label>
                      <input type="date" placeholder="Enter Date of Birth" /> */}
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    {/* <div className="form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter first name" />
							</div> */}
                    <div className="form-group">
                      <SelectField
                        label="Disability"
                        name="disability"
                        options={genderOptions}
                      />
                      {/* <label htmlFor="status">Disability</label>
                      <select id="status">
                        <option></option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select> */}
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <label>Institution Attended</label>
                      <input
                        type="text"
                        placeholder="Enter Institution Attended"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <label>Course Studied</label>
                      <input type="text" placeholder="Enter Course Studied" />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <label>Qualification</label>
                      <input type="text" placeholder="Enter Qualification" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Essentials;
