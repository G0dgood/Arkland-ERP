import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import InputField from "../../../components/Inputs/InputField";

const Finance = () => {
  const handleSubmit = (values: any) => {};
  const validate = Yup.object().shape({
    bank_name: Yup.string().required("Bank name is required"),
    bank_account_number: Yup.string().required(
      "Bank account number is required"
    ),
    basic_salary: Yup.string().required("Basic salary is required"),
  });
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
                      <InputField
                        label="Bank Account Number"
                        name="bank_account_number"
                        placeholder="Enter bank account number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Basic Salary"
                        name="basic_salary"
                        placeholder="Enter basic salary"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Meal Allowance"
                        name="meal_allowance"
                        placeholder="Enter meal allowance"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Utility Allowance"
                        name="utility_allowance"
                        placeholder="Enter utility allowance"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Medical Allowance"
                        name="medical_allowance"
                        placeholder="Enter medical allowance"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-item">
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Housing Allowance"
                        name="housing_allowance"
                        placeholder="Enter housing allowance"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="Transportation Allowance"
                        name="transportation_allowance"
                        placeholder="Enter transportation allowance"
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

export default Finance;
