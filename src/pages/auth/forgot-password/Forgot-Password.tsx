import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Helmet } from "react-helmet-async";
import first from "../../../assets/images/Bijou.jpg";
import second from "../../../assets/images/1.png";
import third from "../../../assets/images/1.jpg";
import fourth from "../../../assets/images/A&A.jpg";
import fifth from "../../../assets/images/PHOENIX.jpg";
import logo from "../../../assets/images/ASLLOGO.svg";
import InputField from "../../../components/Inputs/InputField";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { forgetPassword, reset } from "../../../features/User/userSlice";
import { fireAlert } from "../../../utils/Alert";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { forgetisLoading, forgetisSuccess } = useAppSelector((state: any) => state.userinfo)


  const validate = Yup.object().shape({
    email: Yup.string().email().required("Email Address is Required"),
  });

  useEffect(() => {
    if (forgetisSuccess) {
      fireAlert("Successful", "Check your email for your new password", "success");

      setTimeout(() => {
        window.location.replace("/");
      }, 5000);

      dispatch(reset());
    }
  }, [forgetisSuccess, dispatch, navigate])


  const handleSubmit = async (values: any, { resetForm }: any) => {
    const inputs = { ...values };
    // @ts-ignore
    dispatch(forgetPassword(inputs));
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
                        {forgetisLoading ? "Please wait..." : "Forgot Password"}
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
