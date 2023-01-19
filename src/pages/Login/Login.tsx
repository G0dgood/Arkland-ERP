import { Carousel } from "react-bootstrap";
import first from "../../assets/images/Bijou.jpg";
import second from "../../assets/images/1.jpeg";
import third from "../../assets/images/1.jpg";
import fourth from "../../assets/images/A&A.jpg";
import fifth from "../../assets/images/PHOENIX.jpg";
import logo from "../../assets/images/ASLLOGO.svg";
import { useNavigate } from "react-router-dom";
// import { TextField } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
// import swal from 'sweetalert';
import { Spinner, Toast } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { BsExclamationLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [error, setError] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const [inputs, setInputs] = useState({
    username: "",
    password: "",

  });

  console.log('error', error)


  useEffect(() => {
    if (inputs) {
      localStorage.setItem('user', JSON.stringify(inputs));
    }
  }, [inputs])


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
      localStorage.setItem('name', JSON.stringify(inputs.username));
      navigate("/home");
    } else {
      setError(true)
      setMessage("password is not correct!")
      setTimeout(() => {
        setError(false)
        setMessage("")
      }, 5000);
    }
  };




  return (
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
        </Carousel.Item >
      </Carousel>

      <div className="login-container">
        {error && (
          <Toast
            onClose={() => setShowToast(false)}
            show={true}
            delay={4000}
            autohide>
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
              <form>
                <div className="form-ctrl" style={{ marginBottom: 30 }}>
                  <input
                    type="text"
                    className="form-ctrl-login"
                    placeholder="Username or Email Address"
                    value={inputs.username}
                    onChange={(e) => handleOnChange("username", e.target.value)}
                  />
                </div>
                <div className="form-ctrl">
                  <input
                    type="password"
                    className="form-ctrl-login"
                    placeholder="Password"
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
                    <span className="Forgot-click-here"> Click Here</span>
                  </div>
                </div>

                <Button type="submit" onClick={handleClick}>
                  LOGIN
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
