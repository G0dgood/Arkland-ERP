import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { BsExclamationLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import first from "../../assets/images/Bijou.jpg";
import second from "../../assets/images/1.png";
import third from "../../assets/images/1.jpg";
import fourth from "../../assets/images/A&A.jpg";
import fifth from "../../assets/images/PHOENIX.jpg";
import logo from "../../assets/images/ASLLOGO.svg";
import InputField from "../../components/Inputs/InputField";
import { useNavigate } from "react-router-dom";
import DataService from "../../utils/dataService"; // Import your HttpService
import createHttpService from "../../components/HttpService";


const dataService = new DataService()


const Login = () => {
  const navigate = useNavigate();
  const user = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
  const token = dataService.getToken()



  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = useState<any>(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState<any>("");

  const validate = Yup.object().shape({
    email: Yup.string().email().required("Email Address is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });


  const handleSubmit = async (values: any, { resetForm }: any) => {
    const HttpService = createHttpService();
    setLoading(true);
    try {
      const response: any = await HttpService.post("auth/login", values)
      // const token = response.data.token
      // HttpService.setToken(token); // Set the token in HttpService
      // dataService.setToken(token) 
      const { department, role, employee, privileges, notifications, data: { user } } = response.data
      const userInfo = { department, role, employee, privileges, notifications }
      dataService.setData(`${process.env.REACT_APP_ERP_USER_INFO}`, userInfo)
      resetForm(values);
      setLoading(false);
      navigate(`/onetimepassword/${user}`);
      // window.location.replace("/");
    } catch (error) {
      setLoading(false);
      setError(true);
      // @ts-ignore
      setMessage(error.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 5000);

    }
  }


  useEffect(() => {
    if (token && user) {
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  return (
    <>
      <Helmet>
        <title>Login | Arkland ERP</title>
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

        <div className="login-container">
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
          <div className="login-content-layout">
            <div className="login-content-grid">
              <div className="login-form-container">
                <img src={logo} className="logo-image" alt="ASL Logo" />
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validate}
                >
                  {(formik) => (
                    <Form>
                      <div className="form-ctrl" style={{ marginBottom: 30 }}>
                        <InputField
                          placeholder="Enter password"
                          label="Email"
                          name="email"
                          className="register-form-width"
                        />
                      </div>
                      <div className="form-ctrl">
                        <InputField
                          placeholder="Enter Password"
                          label="Password"
                          name="password"
                          password
                          className="register-form-width"
                        />
                      </div>
                      <div className="Forgot-password p-3">
                        <span>

                        </span>
                        <div>
                          Forgot password?
                          <a
                            href="/forgot-password"
                            className="forgot-click-here"
                          >
                            {" "}
                            Click Here
                          </a>
                        </div>
                      </div>

                      <Button type="submit"  >
                        {isLoading ? <Spinner animation="border" /> : "Login"}
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

export default Login;
