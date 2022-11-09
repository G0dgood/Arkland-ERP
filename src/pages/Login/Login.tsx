


import { Carousel, } from "react-bootstrap";
import first from "../../assets/images/Bijou.jpg";
import second from "../../assets/images/1.jpeg";
import third from "../../assets/images/1.jpg";
import fourth from "../../assets/images/A&A.jpg";
import fifth from "../../assets/images/PHOENIX.jpg";
import logo from "../../assets/images/ASLLOGO.svg";
import { useNavigate } from "react-router-dom";
// import { TextField } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';


const Login = () => {
	const navigate = useNavigate();
	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



	const handleClick = () => {
		navigate("/home");
	}



	return (
		<div id="login-wrapper">
			<Carousel fade>
				<Carousel.Item interval={50000}>
					<img className="d-block w-100" src={first} alt="First" />
				</Carousel.Item>
				<Carousel.Item interval={50000}>
					<img className="d-block w-100" src={second} alt="Second" />
				</Carousel.Item>
				<Carousel.Item interval={50000}>
					<img className="d-block w-100" src={fourth} alt="Third" />
				</Carousel.Item>
				<Carousel.Item interval={50000}>
					<img className="d-block w-100" src={third} alt="Fourth" />
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src={fifth} alt="Fifth" />
				</Carousel.Item>
			</Carousel>

			<div className="login-container">
				<div className="login-content-layout">


					<div className="login-content-grid">
						<div className="login-form-container">
							{/* <p>Sign in</p> */}
							<img src={logo} className="logo-image" alt="ASL Logo" />
							<form  >
								<div className="form-ctrl" style={{ marginBottom: 30 }}>
									<input type="text" className="form-ctrl-login" placeholder="Username or Email Address" />
								</div>
								<div className="form-ctrl">
									<input type="password" className="form-ctrl-login" placeholder="Password" />
								</div>
								<div className="Forgot-password">
									{/* <input type={"checkbox"} className="Forgot-here-input" /> */}
									<span> <Checkbox {...label} />Remember me</span>
									<div>Forgot password?<span className="Forgot-click-here"> Click Here</span></div>
								</div>

								<button
									type="submit" onClick={handleClick}>
									LOGIN
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
