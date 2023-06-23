import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import SelectField from "../../../components/Inputs/SelectField";
import InputField from "../../../components/Inputs/InputField";
import { EmployeeFormProps } from "../../../interfaces/employee";
import CustomInputField from "../../../components/Inputs/CustomInputField";
import ReactSelectField from "../../../components/Inputs/ReactSelectField";
import {
  categoryOptions,
  typeOfEmploymentOptions,
  workLocationOptions,
} from "../../../functions/helpers";

const Employment = ({
  active,
  employee,
  setEmployee,
  setActive,
  bindSubmitForm,
  options,
  roleOptions,
}: EmployeeFormProps) => {
  const validate = Yup.object().shape({});

  const formatDate = (date: Date) => {
    const show = moment(date).format();
    return show;
  };
  const formatWorkLocations = (value?: any) => {
    if (value === "Yes") {
      return true;
    } else if (value === "No") {
      return false;
    }
  };
  const handleSubmit = (values?: any) => {
    // console.log("Values", values);
    setEmployee({ ...employee, ...values });
    setActive(5);
  };
  return (
    <div className={active === 4 ? "EssentialsContainer" : "d-none"}>
      <Formik
        initialValues={{
          department: "",
          role: "",
          category: "",
          has_work_location_objection: "",
          employment_date: "",
          employment_duration: "",
          employment_type: "",
          employee_id: "",
          tally_number: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        {({ values, submitForm, setFieldValue }) => {
          if (active === 4) {
            bindSubmitForm(submitForm);
          }
          return (
            <Form id="my-form">
              <div className="testbox pb-5">
                <form>
                  <div className="imput-space" />
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <ReactSelectField
                          options={options}
                          label="Department"
                          name="department"
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("department", event?.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <ReactSelectField
                          label="Role"
                          name="role"
                          options={roleOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("role", event?.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <SelectField
                          label="Staff category"
                          name="category"
                          options={categoryOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue("category", event?.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <SelectField
                          label="Work Location Objection"
                          name="has_work_location_objection"
                          options={workLocationOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue(
                              "has_work_location_objection",
                              formatWorkLocations(event?.target.value)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <CustomInputField
                          style={{
                            lineHeight: 1,
                          }}
                          type="date"
                          label="Employment Date"
                          name="employment_date"
                          onChange={(event: any) => {
                            setFieldValue(
                              "employment_date",
                              formatDate(event?.target.value)
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <SelectField
                          label="Employment Type"
                          name="employment_type"
                          options={typeOfEmploymentOptions}
                          className="form-group__gender"
                          onChange={(event: any) => {
                            setFieldValue(
                              "employment_type",
                              event?.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <CustomInputField
                          type="number"
                          label="Employment Duration (Months)"
                          name="employment_duration"
                          placeholder="Enter duration of employment"
                          onChange={(event: any) => {
                            setFieldValue(
                              "employment_duration",
                              event?.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Employment ID"
                          name="employee_id"
                          placeholder="Enter employment ID"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="row-item"
                    style={{
                      width: "52%",
                    }}
                  >
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Tally Number"
                          name="tally_number"
                          placeholder="Enter tally number"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
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

export default Employment;
