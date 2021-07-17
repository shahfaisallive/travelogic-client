import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./TripBookingPage.css"

//TripBookingPage components imported here
import Searchbar from "../header/Searchbar.js"
import BookingDetailsBox from "./book-a-trip-components/BookingDetailsBox"
import DetailedItinerary from "./book-a-trip-components/DetailedItinerary"
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom';
import { cancelTripForBooking, createBooking } from '../../actions/bookingActions';
import Meta from '../support-components/Meta';

const TripBookingPage = ({ match, history }) => {
    const tripId = match.params.id
    const dispatch = useDispatch()

    const tripDetails = useSelector(state => state.tripDetails)
    const { trip } = tripDetails

    const bookingInfo = useSelector(state => state.bookingInfo)
    const { name, title, email, address, phoneNo, seats, total_price, city } = bookingInfo

    const bookingDetails = useSelector(state => state.bookingDetails)
    const { loading, booking, success } = bookingDetails

    useEffect(() => {
        window.scrollTo(0, 0)
        if (success) {
            history.push(`/bookingstatus/${booking._id}`)
        }
    }, [history, success, booking])

    const cancelTripBooking = () => {
        dispatch(cancelTripForBooking())
    }

    const confirmBookingHandler = () => {
        dispatch(createBooking({
            title: title,
            name: name,
            email: email,
            city: city,
            address: address,
            phoneNo: phoneNo,
            seats: seats,
            totalPrice: total_price,
            startDate: trip.start_date,
            endDate: trip.end_date
        }))
    }

    return (
        <div className="container">
            <Meta title='Confirm Booking' />
            <Searchbar history={history} />
            <div className="row d-flex justify-content-center">
                <h3 className="mb-3">Booking Details</h3>
            </div>
            <div className="container booking-details-wrap mb-4 bg-white">
                <div className="row">
                    <div className="col-md-6 booking-details-div pt-4 pl-4 ">
                        <BookingDetailsBox />
                        <div className="row mt-4">
                            {!loading ? <button className="btn confirm-booking-btn ml-3 mb-5" onClick={confirmBookingHandler}>
                                Confirm Booking
                            </button> : (
                                <button className="btn confirm-booking-btn pl-5 pr-5 ml-3 mb-5">
                                    <Spinner animation="grow" variant='success' role="status" size='sm' className='ml-2 mr-2' />
                                </button>
                            )}

                            <Link className="btn btn-danger ml-2 mb-5" onClick={cancelTripBooking} to={`/tripdetails/${tripId}`}>Cancel</Link>
                        </div>

                    </div>

                    <div className="col-md-6 booking-details-div pt-2 pr-4 pb-5">
                        <div className="detailed-itinerery-box">
                            <DetailedItinerary trip={trip} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripBookingPage;
