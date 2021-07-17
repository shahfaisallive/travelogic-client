import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from "../support-components/axios"

//SignUp components imported here
import { Link, useHistory } from 'react-router-dom'
import "./SignUp.css";
import Meta from '../support-components/Meta';
import Spinner from 'react-bootstrap/Spinner'


function SignUp() {

	let history = useHistory()
	const [name, setName] = useState()
	const [password, setPassword] = useState()
	const [confirmPassword, setConfirmPassword] = useState()
	const [email, setEmail] = useState()
	const [mobile_num, setMobileNum] = useState()
	const [signUpLoader, setSignUpLoader] = useState(false)

	const register = (e) => {
		e.preventDefault()
		setSignUpLoader(true)
		if (confirmPassword === password) {
			axios.post('/users/', { name, password, email, mobile_num })
				.then(res => {
					toast.success("An Email Has Been Sent To Your Email Account for Verification", {
						position: toast.POSITION.TOP_LEFT
					});
					setSignUpLoader(false)
					// console.log(res.data)
					history.push('/login')
				})
				.catch(err => {
					console.log(err)
					setSignUpLoader(false)
					toast.error(err.response.data.message, {
						position: toast.POSITION.TOP_LEFT
					});
				})
		}
		else {
			toast.error("Passwords Do Not Match", {
				position: toast.POSITION.TOP_LEFT
			});
		}
	}
	return (
		<div className="container ">
			<Meta title="Create new Account" />
			<div className="container mb-3 sign-up-container">
				{/* travelholic intro div starts here */}
				<div className="float-left mb-4" >
					<div className="p-4 mt-5" id="sign-up-intro">
						<div className="d-flex justify-content-center mt-2">
							<img id="logo" src={"/images/logo-png.png"} alt="" className="img-fluid"></img>
						</div>
						<p style={{ color: 'white', marginTop: "20px" }}>Travelogic is one of the leading travel guide systems and tours operating companies in Pakistan. We aim to provide the best guidance for travel enthusiasts across Pakistan.</p>
						<br />
						<div className="d-flex justify-content-center mt-5 mb-1 pt-3" id="sign-in-btn-div">
							<Link to="/login" className="text-primary ml-2"><button className="btn sign-in-btn">Already Registered? Sign in</button></Link>
						</div>
					</div>
				</div>
				{/* travelholic intro ends here */}

				{/* create account form starts here */}
				<div className="col-md-7 col-lg-6 ml-auto">
					<h3 className="mb-3">Create an Account</h3>
					<form action="#">
						<div className="row">
							{/* first name */}
							<div className="input-group col-lg-12 mb-4">
								<div className="input-group-prepend">
									<span className="input-group-text bg-white px-4 border-md">
										<i className="fa fa-user text-muted"></i>
									</span>
								</div>
								<input required id="firstName" type="text" name="firstname" placeholder="Name" className="form-control bg-white border-left-0 border-md" onChange={e => { setName(e.target.value) }} />
							</div>

							{/* email */}
							<div className="input-group col-lg-12 mb-4">
								<div className="input-group-prepend">
									<span className="input-group-text bg-white px-4 border-md">
										<i className="fa fa-envelope text-muted"></i>
									</span>
								</div>
								<input pattern='(\w+?@\w+?\x2E.+)' required id="email" type="email" name="email" placeholder="Email Address" className="form-control bg-white border-left-0 border-md" onChange={e => { setEmail(e.target.value) }} />
							</div>
							{/* phone number */}
							<div className="input-group col-lg-12 mb-4">
								<div className="input-group-prepend">
									<span className="input-group-text bg-white px-4 ">
										<i className="fa fa-phone-square text-muted"></i>
									</span>
								</div>
								<input pattern='^92\d{10}$' required id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" className="form-control border-left-0 bg-white  pl-3" onChange={e => { setMobileNum(e.target.value) }} />
							</div>
							{/* password */}
							<div className="input-group col-lg-12 mb-2">
								<div className="input-group-prepend">
									<span className="input-group-text bg-white px-4 border-md">
										<i className="fa fa-lock text-muted"></i>
									</span>
								</div>
								<input pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' required id="password" type="password" name="password" placeholder="Password" className="border-left-0 form-control bg-white  border-md" autoComplete="off" onChange={e => { setPassword(e.target.value) }} />
								<small className="form-text text-muted">
									your password must have at least 8 characters, 1 upper case, 1 digit and 1 special character.
                </small>
							</div>
							{/* confirm password */}
							<div className="input-group col-lg-12 mb-4">
								<div className="input-group-prepend">
									<span className="input-group-text bg-white px-4 border-md">
										<i className="fa fa-lock text-muted"></i>
									</span>
								</div>
								<input pattern = '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' required  id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" className="form-control bg-white border-left-0 border-md" autoComplete="off" onChange={e=>{setConfirmPassword(e.target.value)}} />
								<small id="emailHelp" className="form-text text-muted">your password must have at least 8 characters, 1 upper case, 1 digit and 1 special character. </small>
							</div>

							{/*Terms and Agreement checkbox */}
							{/* <div className="input-group mb-4 ml-3">
								<div>
									<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" required/>
									<label className="ml-2" htmlFor="vehicle1"> I agree with the terms and conditions</label><br></br>
								</div>
							</div> */}


							{/* create account button */}
							<div className="form-group row justify-content-center col-lg-12 mx-auto mb-0">
								{
									signUpLoader ? 
									<Spinner className="" animation="border" role="status">
										<span className="sr-only">Loading...</span>
									</Spinner>
									:
									<button onClick={register} style={{ backgroundColor: "#114b5f" }} className="btn text-white  btn-block py-2">
									Create Your Account
									</button> 
								
								}
							</div>
						</div>
					</form>
				</div>
				{/* create account form ends here */}
			</div>
		</div>
	);
}


export default SignUp;
