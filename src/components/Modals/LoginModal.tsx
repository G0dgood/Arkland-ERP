import { useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup'
import { Button } from '@material-ui/core';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';




const LoginModal = ({ showModal, setShowModal }: any) => {

	const [passwordShown, setPasswordShown] = useState(true);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};


	const onSubmitFormlogin = (values: any) => {
		const value = { ...values };
		// @ts-ignore
		dispatch(login(value))
	}


	const loginValidationSchema = yup.object().shape({
		email: yup
			.string()
			.email("Please enter valid email")
			.required('Email Address is Required'),
		password: yup.string().min(6, ({ min }) => `Password must be at least ${min} characters`)
			.required('Password is required'),
	})


	return (
		<>
			{showModal && (
				<div className="pop_box">
					<div className="modal_container">
						<div className="modal_header">
							<h2>Account Login </h2>
							<div className="close_button">
								<MdClear onClick={() => { setShowModal(!showModal) }} size={30} />
							</div>
						</div>
						<Formik
							validationSchema={loginValidationSchema}
							initialValues={{
								email: '',
								password: ''
							}}
							onSubmit={onSubmitFormlogin} >
							{({ handleChange, handleSubmit, errors, values,
							}) => (
								<form className="login100-form validate-form flex-sb flex-w">
									<div className="modalbody">
										<div className='form-container'>
											<div>
												<span className="txt1 p-b-11">
													Username
												</span>
												<div className="wrap-input100 validate-input m-b-36" data-validate="Username is required">
													<input
														className="input100"
														type="text"
														name="username"
														value={values.email}
														onChange={handleChange('email')} />
													<span id="focus-input100"></span>
												</div>
												{errors.email && <p className="formik-errors">{errors.email}</p>}

												<div className='modal-container-sup'>
													<span className="txt1 p-b-11">
														Password
													</span>
													<div className="wrap-input100 validate-input m-b-12" data-validate="Password is required">
														<span className="btn-show-pass">
															<i className="fa fa-eye"></i>
														</span>
														<input
															className="input100"
															type={passwordShown ? "text" : "password"}
															name="pass"
															value={values.password}
															onChange={handleChange('password')}
														/>
														{passwordShown ?
															<BsEye
																size={20}
																onClick={togglePasswordVisiblity}
																className={'eyeOutline'}
																color={"#BEC3D5"}
															/> :
															<BsEyeSlash
																size={20}
																onClick={togglePasswordVisiblity}
																className={'eyeOutline'}
																color={"#BEC3D5"}
															/>}

														<span id="focus-input100"></span>
													</div>
													{errors.password && <p className="formik-errors">{errors.password}</p>}
												</div>
											</div>
										</div>
									</div>
									<div className="modal_footer">
										<div className="modal_footer-align">
											{/* @ts-ignore */}
											<Button id={errors.password ? "login-button-btn" : "login-button-btn1"} onClick={handleSubmit} disabled={isLoading}>
												Sign In
											</Button>
										</div>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			)}
		</>
	)
}

export default LoginModal


