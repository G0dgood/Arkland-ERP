import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/Inputs/InputField";

const Refrence = () => {
  const handleSubmit = (values: any) => {};
  const validate = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    middle_name: Yup.string(),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
  });
  return (
    <div className="EssentialsContainer">
      <Formik
        initialValues={{
          next_of_kin: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        {(formik) => (
          <Form>
            <div className="testbox">
              <form>
                <div className="imput-space" />
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Next of Kin"
                        name="next_of_kin"
                        placeholder="Enter name of next of kin"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Next of Kin Phone Number"
                        name="next_of_kin_phone"
                        placeholder="Enter phone number of next of kin"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Next of Kin Email"
                        name="next_of_kin_email"
                        placeholder="Enter email of next of kin"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Next of Kin Address"
                        name="next_of_kin_address"
                        placeholder="Enter home address of next of kin"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Referee Name"
                        name="referee_name"
                        placeholder="Enter referee name"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Referee Phone Number"
                        name="referee_phone"
                        placeholder="Enter referee name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Emergency Contact Name"
                        name="emergency_contact_name"
                        placeholder="Enter name of emergency contact"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Emergency Contact Phone"
                        name="emergency_contact_phone"
                        placeholder="Enter phone number of emergency contact"
                      />
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

export default Refrence;
