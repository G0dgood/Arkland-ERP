import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import InputField from "../../../components/Inputs/InputField";
import { Spinner } from "react-bootstrap";
import { fireAlert } from "../../../utils/Alert";
import Cookies from "js-cookie";
const token = Cookies.get("token");

const ResetPassword = (email: any) => {
  const [isLoading, setLoading] = React.useState(false);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);

    const createValues = { ...values, ...email };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/auth/password`,
        {
          method: "PATCH",
          body: JSON.stringify(createValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const title = "Password updated successfully";
        const html = `Password updated`;
        const icon = "success";
        fireAlert(title, html, icon);
        resetForm(values);
        setLoading(false);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Password update failed";
      fireAlert(title, html, icon);
    }
  };

  return (
    <div className="form-cont">
      <Formik
        initialValues={{
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <form>
              <div className="form-grp">
                <InputField
                  placeholder="Enter password"
                  label="Password"
                  name="password"
                  password
                  className="register-form-width"
                />
              </div>
            </form>
            <div className="form_btn">
              <Button
                variant="outlined"
                type="submit"
                className={"Add-btn-edit"}
              >
                {isLoading ? <Spinner animation="border" /> : "Update Password"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
