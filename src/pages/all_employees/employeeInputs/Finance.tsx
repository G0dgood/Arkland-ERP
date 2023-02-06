import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/Inputs/InputField";
import { EmployeeFormProps } from "../../../interfaces/employee";
import CustomInputField from "../../../components/Inputs/CustomInputField";

const Finance = ({
  active,
  employee,
  setEmployee,
  setActive,
  bindSubmitForm,
}: EmployeeFormProps) => {
  const validate = Yup.object().shape({
    bank_name: Yup.string().required("Bank name is required"),
    bank_account_number: Yup.string().required(
      "Bank account number is required"
    ),
    basic_salary: Yup.string().required("Basic salary is required"),
  });
  const handleSubmit = (values?: any) => {
    console.log("Values", values);
    setEmployee({ ...employee, ...values });
    setActive(3);
  };
  return (
    <div className={active === 2 ? "EssentialsContainer" : "d-none"}>
      <Formik
        initialValues={{
          bank_name: "",
          bank_account_number: "",
          bank_account_name: "",
          basic_salary: "",
          meal_allowance: "",
          utility_allowance: "",
          medical_allowance: "",
          housing_allowance: "",
          transportation_allowance: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        {({ values, handleChange, setFieldValue, submitForm }) => {
          if (active === 2) {
            bindSubmitForm(submitForm);
          }

          return (
            <Form>
              <div className="testbox">
                <form>
                  <div className="imput-space" />
                  <div className="row-item">
                    <div className="col">
                      <div className="form-group">
                        <InputField
                          label="Bank Name"
                          name="bank_name"
                          placeholder="Enter bank name"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <CustomInputField
                          type="number"
                          maxLength={10}
                          label="Bank Account Number"
                          name="bank_account_number"
                          placeholder="Enter bank account number"
                          onChange={(event: any) => {
                            setFieldValue(
                              "bank_account_number",
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
                        <InputField
                          label="Bank Account Name"
                          name="bank_account_name"
                          placeholder="Enter bank account name"
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <CustomInputField
                          type="number"
                          label="Basic Salary"
                          name="basic_salary"
                          placeholder="Enter basic salary"
                          onChange={(event: any) => {
                            setFieldValue("basic_salary", event?.target.value);
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
                          label="Meal Allowance"
                          name="meal_allowance"
                          placeholder="Enter meal allowance"
                          onChange={(event: any) => {
                            setFieldValue(
                              "meal_allowance",
                              event?.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <CustomInputField
                          type="number"
                          label="Utility Allowance"
                          name="utility_allowance"
                          placeholder="Enter utility allowance"
                          onChange={(event: any) => {
                            setFieldValue(
                              "utility_allowance",
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
                          label="Medical Allowance"
                          name="medical_allowance"
                          placeholder="Enter medical allowance"
                          onChange={(event: any) => {
                            setFieldValue(
                              "medical_allowance",
                              event?.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="imput-space" />
                    <div className="col">
                      <div className="form-group">
                        <CustomInputField
                          type="number"
                          label="Housing Allowance"
                          name="housing_allowance"
                          placeholder="Enter housing allowance"
                          onChange={(event: any) => {
                            setFieldValue(
                              "housing_allowance",
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
                          style={{
                            width: "50%",
                          }}
                          label="Transportation Allowance"
                          name="transportation_allowance"
                          placeholder="Enter transportation allowance"
                          onChange={(event: any) => {
                            setFieldValue(
                              "transportation_allowance",
                              event?.target.value
                            );
                          }}
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

export default Finance;
