
import React, { useState, useEffect } from 'react'
import axios, { imagePath } from "../support-components/axios";
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from "../../actions/userActions"
import "./profile.css"

//Profile components imported here
import Searchbar from "../header/Searchbar.js"
import ProfileQuestionCard from '../forum/ProfleQuestionCard'
import Meta from '../support-components/Meta';

function Profile({ history }) {

	const dispatch = useDispatch()
	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const [file, setFile] = useState('default.jpg')
	const [name, setName] = useState(" ")
	const [email, setEmail] = useState(" ")
	const [mobile_num, setNumber] = useState(" ")
	const [gender, setGender] = useState(" ")
	const [questions, setQuestions] = useState([])
	const [imageName, setImageName] = useState('default.jpg')

	const [currentPassword, setCurrentPassword] = useState()
	const [newPassword, setNewPassword] = useState()
	const [newPasswordConfirm, setNewPasswordConfirm] = useState()

	const [bookings, setBookings] = useState([])

    useEffect(() => {
		window.scrollTo(0, 0)
		axios.get(`/users/${userInfo._id}`)
			.then((res) => {
				setName(res.data.name)
				setEmail(res.data.email)
				setNumber(res.data.mobile_num)
				if (res.data.gender) {
					setGender(res.data.gender)
				}
				setImageName(res.data.display_image_name)

				//setImagePath(res.data.display_image_path)
			}).catch((err) => {
				console.log(err)
			});

		axios.get(`/questions/user/${userInfo._id}`)
			.then((res) => {
				setQuestions(res.data)
			}).catch((err) => {
				console.log(err)
			});

		axios.get(`/bookings/user/${userInfo._id}`)
			.then((res) => {
				setBookings(res.data)
			}).catch((err) => {
				setBookings([])
			})
	}, [userInfo._id])

	console.log(bookings)

	const getQuestions = () => {
		axios.get(`/questions/user/${userInfo._id}`)
			.then((res) => {
				setQuestions(res.data)
			}).catch((err) => {
				setQuestions([])
			});
	}

	const uploadImage = (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('id', userInfo._id)
		formData.append('photo', file)
		console.log('formData' + formData.get('id'))

		axios.put('/users/upload', formData)
			.then(res => {
				toast.success('Profile Picture Updated', {
					position: toast.POSITION.TOP_LEFT,
					hideProgressBar: true
				});
				window.location.reload()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const updateProfile = (e) => {
		e.preventDefault()
		axios.put(`/users/${userInfo._id}`, { name, gender, email, mobile_num })
			.then(res => {
				toast.success('Profile Updated', {
					position: toast.POSITION.TOP_LEFT,
					hideProgressBar: true
				});
				window.location.reload()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const deleteProfile = (e) => {
		e.preventDefault()
		axios.delete(`/users/${userInfo._id}`)
			.then(res => {
				dispatch(logout())
				window.location.reload()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const updatePassword = (e) => {
		e.preventDefault()
		axios.put(`/users/password/${userInfo._id}`, { currentPassword, newPassword, newPasswordConfirm })
			.then(res => {
				toast.success('Password Updated', {
					position: toast.POSITION.TOP_LEFT,
					hideProgressBar: true
				});
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<div className="container">
			<Meta title="Profile" />
			<Searchbar history={history} />

			<div className="container mb-4">
				<div className="row ">
					<div className="col ml-1">
						<h3>{name}</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3">
						<div className="text-center">
							<img src={`${imagePath}/users/${imageName}`} className="avatar img-circle img-thumbnail" alt="avatar" />
							<input id="file-input" type="file" className="mt-2 text-center center-block" onChange={e => {
								setFile(e.target.files[0])
							}} />

						</div>
						<p>{file.name}</p>
						<button type="button" className="btn btn-success mt-2" onClick={uploadImage}>Save</button>
					</div>
					{/* nav tab starts here */}
					<div className="col-sm-9 ">
						{/* nav tab list starts */}
						<ul className="nav nav-tabs justify-content-start mt-2" id="myTab" role="tablist">
							<li className="nav-item" role="presentation">
								<a className="nav-link tab-link active" id="changepass-tab" data-toggle="tab" href="#profile" role="tab" aria-selected="false">Profile</a>
							</li>
							<li className="nav-item" role="presentation">
								<a className="nav-link tab-link" id="update-profile-tab" data-toggle="tab" href="#updateprofile" role="tab" aria-selected="false">Update Profile</a>
							</li>
							<li className="nav-item" role="presentation">
								<a className="nav-link tab-link" id="changepass-tab" data-toggle="tab" href="#security" role="tab" aria-selected="false">Security</a>
							</li>
							<li className="nav-item" role="presentation">
								<a className="nav-link tab-link" id="bookings-tab" data-toggle="tab" href="#mybookings" role="tab" aria-selected="false">My Questions</a>
							</li>
							<li className="nav-item" role="presentation">
								<a className="nav-link tab-link" id="trips-tab" data-toggle="tab" href="#mytrips" role="tab" aria-selected="false">My Trips</a>
							</li>
						</ul>
						{/* nav tab list ends */}

						{/* tab content starts */}
						<div className="tab-content">
							{/* profile tab content starts */}
							<div className="tab-pane active" id="profile" role="tabpanel" >
								{/* <h1>Welcome</h1> */}
								<p><b>Name:</b> {name}</p>
								<p><b>Email:</b> {email}</p>
								<p><b>Mobile:</b> {mobile_num}</p>
							</div>
							{/* profile tab content ends */}
							{/* Update Profile tab content  */}
							<div className="tab-pane " id="updateprofile" role="tabpanel" >
								<div className="tab-content">
									<div className="tab-pane active" >
										<form className="form mt-3" action="#" method="post" >
											<div className="form-group">
												<div className="col-xs-6">
													<label ><span className="input-title">Name</span></label>
													<input required onChange={e => { setName(e.target.value) }} value={name} type="text" className="form-control" id="last_name" placeholder="Full Name" />
												</div>
											</div>
											<div className="form-group">
												<div className="col-xs-6">
													<label ><span className="input-title">Number</span></label>
													<input required onChange={e => { setNumber(e.target.value) }} value={mobile_num} type="text" className="form-control" id="phone" placeholder="Enter Your Contact Number" />
												</div>
											</div>
											<div className="form-group">
												<div className="col-xs-6">
													<label ><span className="input-title">Gender</span></label>
													<select id="to" className="form-control" onChange={e => setGender(e.target.value)} >
														<option>Male</option>
														<option>Female</option>
													</select>
												</div>
											</div>
											<div className="form-group">
												<div className="col-xs-12">
													<br />
													<button className="btn update-btn" type="submit" onClick={updateProfile} >Update</button>
													<button className="btn float-right reset-btn" type="reset"> Reset</button>
												</div>
											</div>
										</form>
										<hr />
									</div>
								</div>
							</div>
							{/* update profile tab content ends */}

							{/* change password tab content starts */}
							<div className="tab-pane" id="security" role="tabpanel" >
								<div className="tab-content">
									<div className="tab-pane active" id="changepass">
										<form className="form mt-3 mb-4" action="#" method="post" >
											<div className="form-group">
												<div className="col-xs-6">
													<label ><span className="input-title">Current Password</span></label>
													<input required autoComplete="off" type="password" className="form-control" onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter Current Password" />
												</div>
											</div>
											<div className="form-group">
												<div className="col-xs-6">
													<label ><span className="input-title">New Password</span></label>
													<input required autoComplete="off" type="password" className="form-control" id="new-password" onChange={e => setNewPassword(e.target.value)} placeholder="Enter New Password" />
												</div>
											</div>
											<div className="form-group">
												<div className="col-xs-6">
													<label><span className="input-title">New Password Confirm</span></label>
													<input required autoComplete="off" type="password" className="form-control" id="new-password-confirm" onChange={e => setNewPasswordConfirm(e.target.value)} placeholder="Again Enter New Password" />
												</div>
											</div>
											<div className="form-group">
												<div className="col-xs-12">
													<br />
													<button onClick={updatePassword} className="btn update-btn" type="submit">Change Password</button>
													<button className="btn float-right reset-btn" type="reset">Reset</button>
												</div>
											</div>
										</form>
										<hr />
										<button onClick={deleteProfile} type="button" className="btn btn-danger">Delete Profile</button>
									</div>
								</div>
							</div>
							{/* change password tab content ends */}

							{/* My Questions tab content starts */}
							<div className="tab-pane" id="mybookings" role="tabpanel" >
								{
									questions && questions.length > 0 ? (
										questions.map(question => {
											return (
												<ProfileQuestionCard onDelete={getQuestions} data={question} key={question._id} />
											)
										})
									) :
										(
											<h3>You haven't asked any questions yet</h3>
										)

								}
							</div>
							{/* Booking tab content  */}
							<div className="tab-pane" id="mytrips" role="tabpanel" >
								{bookings.length !== 0 ? (
									<table class="table">
										<thead>
											<tr>
												<th scope="col">Trip Title</th>
												<th scope="col">Price</th>
												<th scope="col">Status</th>
												<th scope="col">Action</th>
											</tr>
										</thead>
										<tbody>
											{bookings.map(booking => (
												<tr key={booking._d}>
													<td>{booking.title}</td>
													<td>{booking.totalPrice}</td>
													<td>{booking.booking_status}</td>
													<Link to={`/bookingstatus/${booking._id}`}>
														<td style={{ color: 'green' }}>View</td>
													</Link>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<p>You haven't booked any trip yet</p>
								)}
							</div>
						</div>
					</div>
					{/* nav tab ends here */}
				</div>
			</div>
		</div>

	);
}

export default Profile;
