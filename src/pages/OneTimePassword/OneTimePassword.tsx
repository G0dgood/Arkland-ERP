import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DataService from '../../utils/dataService';
import createHttpService from '../../components/HttpService';
import { Spinner, Toast } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { BsExclamationLg } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';


const dataService = new DataService()


const OneTimePassword = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	const token = dataService.getToken()
	const [showToast, setShowToast] = useState(false);

	const [isLoading, setLoading] = useState<any>(false);
	const [error, setError] = useState<any>(false);
	const [message, setMessage] = useState<any>("");
	const [input, setInput] = useState<any>({
		otp: "",
		user_id: ""
	})

	const [inputs, setInputs] = useState(['', '', '', '', '', '']);
	const submitBtnRef = useRef(null);

	const handleInput = (index: number, value: string) => {
		const newInputs = [...inputs];
		newInputs[index] = value;
		setInputs(newInputs);

		if (value && index < inputs.length - 1) {
			const nextInput = document.getElementsByName(`n${index + 2}`)[0];
			nextInput.focus();
		} else if (!value && index > 0) {
			const prevInput = document.getElementsByName(`n${index}`)[0];
			prevInput.focus();
		} else if (!value && index === 0) {
			const firstInput = document.getElementsByName('n1')[0];
			firstInput.focus();
		} else if (value && index === inputs.length - 1) {
			// @ts-ignore
			submitBtnRef.current.focus();
		}
	};

	const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && inputs[index] === '' && index > 0) {
			e.preventDefault();
			const prevInput = document.getElementsByName(`n${index}`)[0];
			prevInput.focus();
		}
	};

	const handlePaste = (e: { preventDefault: () => void; clipboardData: { getData: (arg0: string) => any; }; }) => {
		e.preventDefault();
		const data = e.clipboardData.getData('text');
		const newInputs = data
			.slice(0, inputs.length)
			.split('')
			.map((char: any) => char || '');
		setInputs(newInputs);
	};

	// const handleSubmit = (e: { preventDefault: () => void; }) => {
	// 	e.preventDefault();
	// 	console.log('Form submitted with inputs:', inputs);
	// };


	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				otp: inputs.join(""),
				user_id: id,
			});
		});
	}, [id, inputs, setInput]);



	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const HttpService = createHttpService();
		setLoading(true);
		try {
			const response: any = await HttpService.post("auth/login/otp", input)
			const token = response.data.token
			HttpService.setToken(token); // Set the token in HttpService
			dataService.setToken(token)
			console.log('response.data', response)
			const { department, role, employee, privileges, notifications } = response.data
			const userInfo = { department, role, employee, privileges, notifications }
			dataService.setData(`${process.env.REACT_APP_ERP_USER_INFO}`, userInfo)
			setLoading(false);
			// navigate("/onetimepassword");
			window.location.replace("/");
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
		<div className='main-otp-container'>
			<div className="blur-container">
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
				<form name="verify" onSubmit={handleSubmit}>
					<div className="inputs">
						{inputs.map((value, index) => (
							<input
								key={index}
								type="text"
								name={`n${index + 1}`}
								maxLength={1}
								value={value}
								onChange={(e) => handleInput(index, e.target.value)}
								onKeyDown={(e) => handleBackspace(e, index)}
								onPaste={handlePaste}
							/>
						))}
					</div>
					{/* @ts-ignore */}
					<input type="submit" value={isLoading ? ("Please wait...") : "Verify"} ref={submitBtnRef} />
					{/* <Button type="submit" className='inputs-otp'>
						{isLoading ? (<Spinner animation="border" size='sm' />) : "Verify"}
					</Button> */}

				</form>

			</div>
		</div>
	)
}

export default OneTimePassword