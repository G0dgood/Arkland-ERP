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
import second from "../../../assets/images/1.png";
import third from "../../../assets/images/1.jpg";
import fourth from "../../../assets/images/A&A.jpg";
import fifth from "../../../assets/images/PHOENIX.jpg";
import logo from "../../../assets/images/ASLLOGO.svg";
import InputField from "../../../components/Inputs/InputField";

const ForgotPassword = () => {
  const [isLoading, setLoading] = React.useState(false);

  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const validate = Yup.object().shape({
    email: Yup.string().email().required("Email Address is Required"),
  });

  const handleSubmit = (values: any, { resetForm }: any) => {
    delete axios.defaults.headers.common["authorization"];
    setLoading(true);
    axios
      .patch(`${process.env.REACT_APP_API}/auth/password`, values)
      .then((res: AxiosResponse) => {
        setLoading(false);
        resetForm(values);
        if (res.data.success === true) {
          setSuccess(true);
          setMessage("Check your email for your new password");
          setTimeout(() => {
            window.location.replace("/");
          }, 5000);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMessage(err.response?.data?.message);
        setTimeout(() => {
          setError(false);
          setMessage("");
        }, 5000);
      });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Arkland ERP</title>
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
                    email: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validate}
                >
                  {(formik) => (
                    <Form>
                      <div className="form-ctrl">
                        <InputField
                          label="Email address"
                          name="email"
                          className="register-form-width"
                        />
                      </div>
                      <div className="Forgot-password">
                        <div>
                          Login?{" "}
                          <a href="/" className="forgot-click-here">
                            Click Here
                          </a>
                        </div>
                      </div>
                      <Button type="submit" className="forgot-password-button">
                        {isLoading ? "Please wait..." : "Forgot Password"}
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

export default ForgotPassword;
