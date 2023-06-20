import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { BsExclamationLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

import first from "../../../assets/images/Bijou.jpg";
import second from "../../../assets/images/1.png";
import third from "../../../assets/images/1.jpg";
import fourth from "../../../assets/images/A&A.jpg";
import fifth from "../../../assets/images/PHOENIX.jpg";
import logo from "../../../assets/images/ASLLOGO.svg";
import InputField from "../../../components/Inputs/InputField";
import { fireAlert } from "../../../utils/Alert";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { reset, updatePassword } from "../../../features/User/userSlice";


const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { updateisLoading, updateisSuccess } = useAppSelector((state: any) => state.userinfo)


  useEffect(() => {
    if (updateisSuccess) {
      fireAlert("Successful", "Password update successful", "success");

      setTimeout(() => {
        navigate("/");
      }, 5000);

      dispatch(reset());
    }
  }, [updateisSuccess, dispatch, navigate])

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const inputs = { ...values };
    // @ts-ignore
    dispatch(updatePassword(inputs));
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
                        {updateisLoading ? "Please wait..." : "Update Password"}
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
