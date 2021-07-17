import React from 'react';
import { useSelector } from 'react-redux';
import "./BookingDetailsBox.css"

const BookingDetailsBox = () => {
    const bookingInfo = useSelector(state => state.bookingInfo)
    const { name, price, title, email, phoneNo, address, seats, total_price, city} = bookingInfo

    return (
        <div className="booking-details-box-wrap ml-3 mr-3">
            <div className="row ">
                <table className="booking-details-table">
                    <tr id="booking-detail-table-header">
                        <th colSpan='2'>Booking Details</th>                       
                    </tr>
                    <tr className="trip-detail-row">
                        <th>Trip Title:</th>
                        <td>{title}</td>                        
                    </tr>
                    <tr className="trip-detail-row">
                        <th>Trip Price:</th>
                        <td>{price}/seat</td>                        
                    </tr>
                    <tr className="trip-detail-row">
                        <th>Name:</th>
                        <td>{name}</td>                        
                    </tr>
                    <tr className="trip-detail-row">
                        <th>Email:</th>
                        <td>{email}</td>                        
                    </tr>
                    <tr className="trip-detail-row">
                        <th>Phone:</th>
                        <td>{phoneNo}</td>                        
                    </tr>
                    <tr className="trip-detail-row">
                        <th>Address:</th>
                        <td>{address}</td>                        
                    </tr>
                    <tr className="trip-detail-row">
                        <th>City:</th>
                        <td>{city}</td>                        
                    </tr>
                    <tr className="trip-detail-row">
                        <th>Seats:</th>
                        <td>{seats}</td>                        
                    </tr>
                    <tr id="booking-detail-table-footer">
                        <th>TOTAL</th>
                        <td><b>{total_price} PKR</b></td>                        
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default BookingDetailsBox;
