import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Spinner, Toast } from "react-bootstrap";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { BsExclamationLg } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import { FaTimes } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import axios, { AxiosResponse } from "axios";
import first from "../../assets/images/Bijou.jpg";
import second from "../../assets/images/1.jpeg";
import third from "../../assets/images/1.jpg";
import fourth from "../../assets/images/A&A.jpg";
import fifth from "../../assets/images/PHOENIX.jpg";
import logo from "../../assets/images/ASLLOGO.svg";
import { useAppDispatch } from "../../hooks/useDispatch";
import InputField from "../../components/Inputs/InputField";
// import { TextField } from "@material-ui/core";
// import swal from 'sweetalert';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = React.useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [error, setError] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const validate = Yup.object().shape({
    email: Yup.string().email().required("Email Address is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values: any, { resetForm }: any) => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    // axios
    //   .post(`${process.env.REACT_APP_API}/auth/login`, values)
    //   .then((res: AxiosResponse) => {
    //     setLoading(false);
    //     resetForm(values);
    //     axios.defaults.headers.common["authorization"];
    //   });
  };

  console.log("error", error);

  useEffect(() => {
    if (inputs) {
      localStorage.setItem("user", JSON.stringify(inputs));
    }
  }, [inputs]);

  // console.log('username', inputs.username)

  const handleOnChange = (input: string, value: any) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    if (inputs.username === "admin" || inputs.username === "staff") {
      localStorage.setItem("name", JSON.stringify(inputs.username));
      navigate("/home");
    } else {
      setError(true);
      setMessage("password is not correct!");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 5000);
    }
  };

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
                {/* <p>Sign in</p> */}
                <img src={logo} className="logo-image" alt="ASL Logo" />
                <Formik
                  initialValues={{
                    username: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validate}
                >
                  {(formik) => (
                    <Form>
                      <form>
                        <div className="form-ctrl" style={{ marginBottom: 30 }}>
                          {/* <input
                            type="text"
                            className="form-ctrl-login"
                            placeholder="Username or Email Address"
                            value={inputs.username}
                            onChange={(e) =>
                              handleOnChange("username", e.target.value)
                            }
                          /> */}
                          <InputField
                            label="Email address"
                            name="email"
                            className="register-form-width"
                          />
                        </div>
                        <div className="form-ctrl">
                          {/* <input
                            type="password"
                            className="form-ctrl-login"
                            placeholder="Password"
                          /> */}
                          <InputField
                            placeholder="Enter password"
                            label="Password"
                            name="password"
                            password
                            className="register-form-width"
                          />
                        </div>
                        <div className="Forgot-password">
                          {/* <input type={"checkbox"} className="Forgot-here-input" /> */}
                          <span>
                            {" "}
                            <Checkbox {...label} />
                            Remember me
                          </span>
                          <div>
                            Forgot password?
                            <span className="Forgot-click-here">
                              {" "}
                              Click Here
                            </span>
                          </div>
                        </div>

                        <Button type="submit" onClick={handleClick}>
                          LOGIN
                        </Button>
                      </form>
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
