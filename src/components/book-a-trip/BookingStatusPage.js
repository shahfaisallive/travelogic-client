import React, { useEffect } from 'react';
import "./BookingStatusPage.css"

//BookingStatusPage components imported here
import Searchbar from "../header/Searchbar.js"
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, getBookedTrip } from '../../actions/bookingActions';
import Loader from "../support-components/Loader"
import Message from "../support-components/Message"
import PaymentBox from "./book-a-trip-components/SelectPaymentBox"
import PageNotFound from "../support-components/PageNotFound"
import Meta from '../support-components/Meta';


const BookingStatusPage = ({ match, history }) => {
    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.userLogin.userInfo)

    const bookedTrip = useSelector(state => state.bookedTrip)
    const { loading, error, bookedTrip: booking } = bookedTrip

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getBookedTrip(match.params.id))
    }, [dispatch])

    const cancelBookingHandler = async () => {
        await dispatch(cancelBooking(match.params.id))
        window.location.reload();
    }

    return (
        <div className="container booking-status-wrap">
            <Meta title={`Booking Status - ${match.params.id}`} />
            <Searchbar history={history} />
            {!bookedTrip ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : userInfo._id !== booking.user ? (
                <PageNotFound />
            ) : (
                <>
                    {booking ? (
                        <div className="container booking-details-wrap mb-4 bg-white">
                            {booking.booking_status === 'cancelled' ? (
                                <div className="row d-flex justify-content-center pt-4 pl-2">
                                    <h4 style={{ color: 'red' }}>Your Booking is Cancelled</h4>
                                </div>
                            ) : booking.booking_status === 'pending' ? (
                                <>
                                    {!booking.isPaid ? (
                                        <>
                                            <div className="row d-flex justify-content-center pt-4 pl-2">
                                                <h4 style={{ color: 'green' }}>Thank you for booking your trip with us</h4>
                                            </div>
                                            <p className='text-center'>Please proceed with the payment to confirm your booking</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="row d-flex justify-content-center pt-4 pl-2">
                                                <h4 style={{ color: 'green' }}>Your payment is complete</h4>
                                            </div>
                                            {booking.booking_status === 'confirmed' ? (
                                                <p className='text-center'>Your booking has been confirmed</p>
                                            ) : (
                                                <p className='text-center'>Your booking will be confirmed shortly</p>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="row d-flex justify-content-center pt-4 pl-2">
                                        <h4 style={{ color: 'green' }}>Your booking has been confirmed</h4>
                                    </div>
                                </>
                            )}
                            <p className='text-center'><strong>Booking ID: </strong>{booking._id}</p>
                            <hr />

                            <div className="row">
                                <div className="col-md-7 booking-details-div pt-4 pl-4 mb-4 ">
                                    <h5>Booking details</h5>
                                    <table className="booking-details-table">
                                        <tbody className="trip-detail-row">
                                            <th>Title:</th>
                                            <td>{booking.title}</td>
                                        </tbody>
                                        <tbody className="trip-detail-row">
                                            <th>ID:</th>
                                            <td>{booking._id}</td>
                                        </tbody>
                                        <tbody className="trip-detail-row">
                                            <th>Name:</th>
                                            <td>{booking.name}</td>
                                        </tbody>
                                        <tbody className="trip-detail-row">
                                            <th>Address:</th>
                                            <td>{booking.address}</td>
                                        </tbody>
                                        <tbody className="trip-detail-row">
                                            <th>City:</th>
                                            <td>{booking.city}</td>
                                        </tbody>
                                        <tbody className="trip-detail-row">
                                            <th>Phone No:</th>
                                            <td>{booking.phoneNo}</td>
                                        </tbody>
                                        <tbody className="trip-detail-row">
                                            <th>Seats:</th>
                                            <td>{booking.seats}</td>
                                        </tbody>
                                        <tbody className="trip-detail-row">
                                            <th>Total Price:</th>
                                            <td>{booking.totalPrice}</td>
                                        </tbody>
                                    </table>
                                    <hr />

                                    <div className="row d-flex justify-content-start pt-1 pl-3">
                                        <h5>Payment</h5>
                                    </div>
                                    <div className="status-box">
                                        {booking.isPaid ? <strong style={{ color: 'green' }}>PAID</strong> : <strong style={{ color: 'red' }}>PENDING</strong>}
                                    </div>
                                    {booking.isPaid ? <p>Paid through {booking.paymentMethod}</p> : <p></p>}
                                    <hr />

                                    <div className="row d-flex justify-content-start pt-1 pl-3">
                                        <h5>Booking Status</h5>
                                    </div>
                                    <div className="status-box">
                                        {booking.booking_status === 'confirmed' ? <strong style={{ color: 'green' }}>CONFIRMED</strong> :
                                            booking.booking_status === 'pending' ? (
                                                <strong style={{ color: 'red' }}>PENDING</strong>) :
                                                booking.booking_status === 'cancelled' ? <strong style={{ color: 'red' }}>CANCELLED</strong> :
                                                    <strong>NULL</strong>}
                                    </div>

                                    {booking.booking_status === 'pending' || booking.booking_status === 'confirmed' ? (
                                        <div className="row d-flex justify-content-start pt-1 pl-3">
                                            <button className='btn mt-3 w-25' id='cancel-btn'
                                                data-toggle="modal" data-target="#confirmationModal">Cancel Booking</button>
                                        </div>
                                    ) : null}

                                </div>

                                {/* CONIFRMATION MODAL */}
                                <div className="modal fade" id="confirmationModal" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="confirmation-modal modal-content">
                                            <div className="modal-body d-flex justify-content-center">
                                                <h5 className="modal-title">Are you sure you want to cancel this trip booking?</h5>
                                            </div>
                                            <div className="modal-footar mt-4">
                                                <button type="submit" className="btn confirm-btn float-right mr-3 mb-2" onClick={cancelBookingHandler} data-dismiss="modal">
                                                    Yes, Cancel Booking
                                                </button>
                                                <button type="button" className="btn no-btn float-right mr-3 mb-2" data-dismiss="modal">No</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {booking.booking_status === 'cancelled' ? (
                                    <div className='col-md-5 booking-details-div pt-4 pr-4 pb-5'>
                                        <p className='text-center'><b>You have cancelled your booking</b></p>
                                        <hr />
                                    </div>
                                ) : booking.booking_status === 'pending' || booking.booking_status === 'confirmed' ? (
                                    <div className="col-md-5 booking-details-div pt-4 pr-4 pb-5">
                                        <PaymentBox bookingId={match.params.id} />
                                    </div>
                                ) : (
                                    <Loader />
                                )}
                            </div>
                        </div>
                    ) : loading ? (
                        <Loader />
                    ) : (
                        <Message variant='danger'>{error}</Message>
                    )}
                </>
            )
            }


        </div >
    )
}

export default BookingStatusPage;
