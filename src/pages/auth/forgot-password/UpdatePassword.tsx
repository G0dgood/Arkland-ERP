import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { BsExclamationLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import axios, { AxiosResponse } from "axios";
import first from "../../../assets/images/Bijou.jpg";
import second from "../../../assets/images/1.jpeg";
import third from "../../../assets/images/1.jpg";
import fourth from "../../../assets/images/A&A.jpg";
import fifth from "../../../assets/images/PHOENIX.jpg";
import logo from "../../../assets/images/ASLLOGO.svg";
import InputField from "../../../components/Inputs/InputField";
import Cookies from "js-cookie";
import { fireAlert } from "../../../utils/Alert";

const token = Cookies.get("token");

const UpdatePassword = () => {
  const [isLoading, setLoading] = React.useState(false);

  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (values: any, { resetForm }: any) => {
    setLoading(true);
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify({ ...values }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/me/password`, requestOptions)
      .then(async (response) => {
        // @ts-ignore
        setLoading(false);
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        resetForm(values);
        // set token in axios header
        axios.defaults.headers.common["authorization"] = data?.data.token;
        // set token in cookie
        Cookies.set("token", data.data.token);
        const title = "Password update successful";
        const html = `Password updated`;
        const icon = "success";
        fireAlert(title, html, icon);
        // navigate("/home");
        window.location.replace("/home");
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setMessage(error);
        const html = error || "Something went wrong!";
        const icon = "error";
        const title = "Password update failed";
        fireAlert(title, html, icon);
        setTimeout(() => {
          setError(false);
          setMessage("");
        }, 5000);
      });
  };

  return (
    <>
      <Helmet>
        <title>Update Password | Arkland ERP</title>
      </Helmet>
      <div id="login-wrapper">
        <Carousel fade>
          <Carousel.Item interval={8000}>
            <img className="d-block w-100" src={first} alt="First" />
          </Carousel.Item>
          <Carousel.Item interval={8000}>
            <img className="d-block w-100" src={second} alt="Second" />
          </Carousel.Item>
          <Carousel.Item interval={8000}>
            <img className="d-block w-100" src={fourth} alt="Third" />
          </Carousel.Item>
          <Carousel.Item interval={8000}>
            <img className="d-block w-100" src={third} alt="Fourth" />
          </Carousel.Item>
          <Carousel.Item interval={8000}>
            <img className="d-block w-100" src={fifth} alt="Fifth" />
          </Carousel.Item>
        </Carousel>

        <div className="login-container success-toast">
          {error && (
            <Toast
              onClose={() => setShowToast(false)}
              show={true}
              delay={4000}
              autohide
            >
              <Toast.Body>
                <span>
                  <BsExclamationLg />
                </span>
                <p>{message}</p>
                <span onClick={() => setShowToast(false)}>
                  <FaTimes />
                </span>
              </Toast.Body>
            </Toast>
          )}
          {success && (
            <Toast
              onClose={() => setShowToast(false)}
              show={true}
              delay={4000}
              autohide
              bg="success"
            >
              <Toast.Body>
                <span>
                  <BsExclamationLg />
                </span>
                <p>{message}</p>
                <span onClick={() => setShowToast(false)}>
                  <FaTimes />
                </span>
              </Toast.Body>
            </Toast>
          )}
          <div className="login-content-layout">
            <div className="login-content-grid">
              <div className="login-form-container">
                <img src={logo} className="logo-image" alt="ASL Logo" />
                <Formik
                  initialValues={{
                    password: "",
                    new_password: "",
                    confirm_password: "",
                  }}
                  onSubmit={handleSubmit}
                >
                  {(formik) => (
                    <Form>
                      <div className="form-ctrl">
                        <InputField
                          placeholder="Enter password"
                          label="Password"
                          name="password"
                          password
                          className="register-form-width"
                        />
                      </div>
                      <div className="form-ctrl">
                        <InputField
                          placeholder="Enter new password"
                          label="New password"
                          name="new_password"
                          password
                          className="register-form-width"
                        />
                      </div>
                      <div className="form-ctrl">
                        <InputField
                          placeholder="Enter confirm password"
                          label="Confirm new password"
                          name="confirm_password"
                          password
                          className="register-form-width"
                        />
                      </div>

                      <Button type="submit" className="forgot-password-button">
                        {isLoading ? "Please wait..." : "Update Password"}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
