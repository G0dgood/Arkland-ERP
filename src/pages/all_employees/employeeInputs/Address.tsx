import React from "react";
import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import InputField from "../../../components/Inputs/InputField";
import SelectField from "../../../components/Inputs/SelectField";
import CountrySelectField from "../../../components/Inputs/CountrySelectField";
import { EmployeeFormProps } from "../../../interfaces/employee";
import CustomInputField from "../../../components/Inputs/CustomInputField";

const Address = ({
  active,
  employee,
  setEmployee,
  setActive,
  bindSubmitForm,
}: EmployeeFormProps) => {
  const handleSubmit = (values?: any) => {
    console.log("Values", values);
    setEmployee({ ...employee, ...values });
    setActive(6);
  };
  const validate = Yup.object().shape({});
  const martialStatusOptions = [
    "Select marital status",
    "Married",
    "Single",
    "Divroced",
  ];

  return (
    <div className={active === 5 ? "EssentialsContainer" : "d-none"}>
      <Formik
        initialValues={{
          address: "",
          city: "",
          zip_code: "",
          state_of_origin: "",
          country: "",
          nin: "",
          marital_status: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        {({ values, submitForm, setFieldValue }) => {
          if (active === 5) {
            bindSubmitForm(submitForm);
          }

          return (
            <Form id="my-form">
              <div className="testbox">
                <form>
                  <div className="imput-space" />
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Employee Address"
                          name="address"
                          placeholder="Enter employee's address"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="City"
                          name="city"
                          placeholder="Enter employee's city"
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Zip Code"
                          name="zip_code"
                          placeholder="Enter employee's zip code"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="State of Origin"
                          name="state_of_origin"
                          placeholder="Enter state of origin"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <CustomInputField
                          type="number"
                          label="NIN"
                          name="nin"
                          placeholder="Enter National Identity Number"
                          onChange={(event: any) => {
                            setFieldValue("nin", event?.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <CountrySelectField
                          className="agent-project__owner"
                          label="Country"
                          name="country"
                          placeholder="Select country"
                          onChange={(value: any) =>
                            setFieldValue("country", { value }.value.label)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <SelectField
                          label="Marital Status"
                          name="marital_status"
                          options={martialStatusOptions}
                          className="form-group__status"
                          onChange={(value: any) =>
                            setFieldValue(
                              "marital_status",
                              { value }.value.label
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div id="Essential-btn">
                    <Button
                      variant="outlined"
                      className={"Add-btn-edit"}
                      onClick={() => handleSubmit(values)}
                    >
                      View Details
                    </Button>
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

export default Address;
