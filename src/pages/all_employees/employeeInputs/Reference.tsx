import { Form, Formik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import InputField from "../../../components/Inputs/InputField";
import { EmployeeFormProps } from "../../../interfaces/employee";

const Reference = ({
  active,
  employee,
  setEmployee,
  setActive,
  bindSubmitForm,
}: EmployeeFormProps) => {
  const handleSubmit = (values?: any) => {
    // console.log("Values", values);
    setEmployee({ ...employee, ...values });
    setActive(4);
  };
  const validate = Yup.object().shape({
    next_of_kin: Yup.string().required("Next of kin is required"),
    next_of_kin_phone: Yup.string(),
  });
  return (
    <div className={active === 3 ? "EssentialsContainer" : "d-none"}>
      <Formik
        initialValues={{
          next_of_kin: "",
          next_of_kin_phone: "",
          next_of_kin_email: "",
          next_of_kin_address: "",
          referee_name: "",
          referee_phone: "",
          emergency_contact_name: "",
          emergency_contact_phone: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        {({ setFieldValue, submitForm }) => {
          if (active === 3) {
            bindSubmitForm(submitForm);
          }
          return (
            <Form>
              <div className="testbox pb-5">
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
                        <PhoneInput
                          value=""
                          inputProps={{
                            name: "next_of_kin_phone",
                            required: true,
                          }}
                          inputStyle={{
                            background: "4f269f",
                            height: "40px",
                            width: "100%",
                            maxWidth: "31.25rem",
                          }}
                          specialLabel="Next of Kin Phone Number"
                          inputClass="w-100"
                          containerClass="mb-3 agent-project__owner"
                          onChange={(telephone) =>
                            setFieldValue(
                              "next_of_kin_phone",
                              `${"+" + telephone}`
                            )
                          }
                          country={"ng"}
                          placeholder="Enter Next of Kin Phone Number"
                          defaultErrorMessage="required"
                          enableSearch={true}
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
                        <PhoneInput
                          value=""
                          inputProps={{
                            name: "referee_phone",
                            required: true,
                          }}
                          inputStyle={{
                            background: "4f269f",
                            height: "40px",
                            width: "100%",
                            maxWidth: "31.25rem",
                          }}
                          specialLabel="Referee Phone Number"
                          inputClass="w-100"
                          containerClass="mb-3 agent-project__owner"
                          onChange={(telephone) =>
                            setFieldValue("referee_phone", `${"+" + telephone}`)
                          }
                          country={"ng"}
                          placeholder="Enter Referee Phone Number"
                          defaultErrorMessage="required"
                          enableSearch={true}
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
                        <PhoneInput
                          value=""
                          inputProps={{
                            name: "emergency_contact_phone",
                            required: true,
                          }}
                          inputStyle={{
                            background: "4f269f",
                            height: "40px",
                            width: "100%",
                            maxWidth: "31.25rem",
                          }}
                          specialLabel="Emergency Contact Phone"
                          inputClass="w-100"
                          containerClass="mb-3 agent-project__owner"
                          onChange={(telephone) =>
                            setFieldValue(
                              "emergency_contact_phone",
                              `${"+" + telephone}`
                            )
                          }
                          country={"ng"}
                          placeholder="Enter phone number of emergency contact"
                          defaultErrorMessage="required"
                          enableSearch={true}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Reference;
