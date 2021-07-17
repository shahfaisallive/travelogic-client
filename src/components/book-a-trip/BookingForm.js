import React, { useEffect, useState } from 'react'
import "./BookingForm.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Searchbar from '../header/Searchbar'
import DetailedItinerary from './book-a-trip-components/DetailedItinerary'
import { cancelTripForBooking, saveBookingInfo, selectTripForBooking } from '../../actions/bookingActions'
import { listTripDetails } from '../../actions/tripActions'
import Meta from '../support-components/Meta'
import { toast } from 'react-toastify'




const BookingForm = ({ match, history }) => {
	const tripId = match.params.id

	const dispatch = useDispatch()

	const tripDetails = useSelector(state => state.tripDetails)
	const { trip } = tripDetails

	const tripSelected = useSelector(state => state.tripSelected)
	const { selectedTrip } = tripSelected

	const bookingInfo = useSelector(state => state.bookingInfo)

	// declaring states for form
	const [name, setName] = useState(bookingInfo.name)
	const [email, setEmail] = useState(bookingInfo.email)
	const [seats, setSeats] = useState(bookingInfo.seats)
	const [phoneNo, setPhoneNo] = useState(bookingInfo.phoneNo)
	const [address, setAddress] = useState(bookingInfo.address)
	const [city, setCity] = useState(bookingInfo.city)


	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(selectTripForBooking(tripId))
		dispatch(listTripDetails(match.params.id))
	}, [dispatch])


	const price = trip.price
	const title = trip.title
	const total_price = trip.price * seats


	const submitHandler = (e) => {
		e.preventDefault()
		console.log('name',name)
		if ((name=== undefined) || (email ===  undefined)|| (phoneNo === undefined)|| (address ===  undefined) || (city ===  undefined) ) {
			toast.warn('Please complete the form to continue', {
				position: toast.POSITION.TOP_LEFT
			});
		}
		else {
			dispatch(saveBookingInfo({ name, email, seats, phoneNo, address, city, price, total_price, title }))
			history.push(`/tripbooking/${tripId}`)
		}
		// e.preventDefault()
		// dispatch(saveBookingInfo({ name, email, seats, phoneNo, address, city, price, total_price, title }))
		// history.push(`/tripbooking/${tripId}`)
	}


	const cancelTripBooking = () => {
		dispatch(cancelTripForBooking())
	}


	return (
		<div className="container" >
		<Meta title='Booking Form' /> 			
			<Searchbar history={history} />
			<h3>Booking Form</h3>
			<div id="outer-div" className="bg-white mb-3 p-3">
				<div id="form-div" className="container float-left">
					<div className="row">
						<div className=" ">
							<h6 >Fill out the form to book the tour</h6>
							<form className="mt-3" action="">
								<div className="row">
									<div className="input-group col-lg-12 mb-4">
										<div className="input-group-prepend">
											<span className="input-group-text bg-white px-4 border-md">
												<i className="fa fa-user text-muted"></i>
											</span>
										</div>

										<input id="firstname" type="text" name="name" placeholder="Name"
											value={name} onChange={(e) => setName(e.target.value)} required
											className="form-control bg-white border-left-0 border-md" />

									</div>

									<div className="input-group col-lg-12 mb-4">
										<div className="input-group-prepend">
											<span className="input-group-text bg-white px-4 border-md">
												<i className="fa fa-envelope text-muted"></i>
											</span>
										</div>

										<input id="email" type="email" name="email" placeholder="Email Address"
											value={email} onChange={(e) => setEmail(e.target.value)} required
											className="form-control bg-white border-left-0 border-md" />

									</div>

									<div className="input-group col-lg-12 mb-4">
										<div className="input-group-prepend">
											<span className="input-group-text bg-white px-4 border-md border-right-0">
												<i className="fa fa-users text-muted"></i>
											</span>
										</div>

										<select id="numSeats" name="numSeats"
											value={seats} onChange={(e) => setSeats(e.target.value)} required
											className="custom-select form-control bg-white border-left-0 border-md h-100 font-weight-bold text-muted">
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>

									</div>
									<div className="input-group col-lg-12 mb-4">
										<div className="input-group-prepend">
											<span className="input-group-text bg-white px-4 ">
												<i className="fa fa-phone-square text-muted"></i>
											</span>
										</div>

										<input id="phoneNumber" type="text" name="phone" placeholder="Phone Number"
											value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required
											className="form-control border-left-0 bg-white  pl-3" />

									</div>
									<div className="input-group col-lg-12 mb-4">
										<div className="input-group-prepend">
											<span className="input-group-text bg-white px-4 border-md">
												<i className="fa fa-address-book text-muted"></i>
											</span>
										</div>

										<input id="address" type="text" name="address" placeholder="Address"
											value={address} onChange={(e) => setAddress(e.target.value)} required
											className="border-left-0 form-control bg-white  border-md" />

									</div>
									<div className="input-group col-lg-12 mb-4">
										<div className="input-group-prepend">
											<span className="input-group-text bg-white px-4 border-md">
												<i className="fa fa-address-book text-muted"></i>
											</span>
										</div>

										<input id="city" type="text" placeholder="City"
											value={city} onChange={(e) => setCity(e.target.value)} required
											className="form-control bg-white border-left-0 border-md" />

									</div>
									<div id="booking-btn-div" className="ml-3 w-100">
										<div className="float-left">
											<button id="next-btn" className="btn" onClick={submitHandler}>Next</button>
											<Link id="cancel-btn" className="btn ml-2" onClick={cancelTripBooking} to={`/tripdetails/${tripId}`}>Cancel</Link>
										</div>
										<div>
											{/* <span className="float-right mt-3 mr-4 font-weight-bold total-font" >Total <span className="price">
											{selectedTrip.price * seats}
											</span></span> */}
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div id="itinerary-div" className="float-right">
					<DetailedItinerary trip={trip} />
				</div>
			</div>
		</div>
	)
}

export default BookingForm
