import React from "react";
import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import InputField from "../../../components/Inputs/InputField";
import SelectField from "../../../components/Inputs/SelectField";
import CountrySelectField from "../../../components/Inputs/CountrySelectField";

const Address = ({ setActive }: any) => {
  const handleSubmit = (values: any) => {};
  const validate = Yup.object().shape({});
  const martialStatusOptions = [
    "Select marital status",
    "Married",
    "Single",
    "Divroced",
  ];

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
                        label="Address"
                        name="address"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                  <div className="imput-space" />
                  <div className="col">
                    <div className="form-group">
                      <InputField
                        label="City"
                        name="city"
                        placeholder="Enter city"
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
                        placeholder="Enter zip code"
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
                      <InputField
                        label="NIN"
                        name="nin"
                        placeholder="Enter National Identity Number"
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
                          formik.setFieldValue("country", { value }.value.label)
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
                      />
                    </div>
                  </div>
                </div>
                <div id="Essential-btn">
                  <Button
                    variant="outlined"
                    className={"Add-btn-edit"}
                    onClick={() => setActive(6)}
                  >
                    View Details
                  </Button>
                </div>
              </form>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Address;
