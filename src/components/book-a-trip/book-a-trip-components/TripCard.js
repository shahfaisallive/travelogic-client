import React, { useState } from 'react';
//import { Images } from 'react-bootstrap-icons';
import "./TripCard.css"
import { Link } from 'react-router-dom'
import TripRating from './TripRating'
import { imagePath } from '../../support-components/axios';


const TripCard = ({ trip }) => {
    const [startDay, setStartDay] = useState(trip.start_date.substring(8, 10))
    const [endDay, setEndDay] = useState(trip.end_date.substring(8, 10))
    const [startMonth, setStartMonth] = useState(trip.start_date.substring(5, 7))
    const [endMonth, setEndMonth] = useState(trip.end_date.substring(5, 7))

    let s_month
    let e_month

    switch (startMonth) {
        case '01':
            s_month = 'Jan'
            break;
        case '02':
            s_month = 'Feb'
            break;
        case '03':
            s_month = 'Mar'
            break;
        case '04':
            s_month = 'Apr'
            break;
        case '05':
            s_month = 'May'
            break;
        case '06':
            s_month = 'Jun'
            break;
        case '07':
            s_month = 'Jul'
            break;
        case '08':
            s_month = 'Aug'
            break;
        case '09':
            s_month = 'Sep'
            break;
        case '10':
            s_month = 'Oct'
            break;
        case '11':
            s_month = 'Nov'
            break;
        case '12':
            s_month = 'Dec'
            break;
        default: s_month = 'NaN'
            break;
    }

    switch (endMonth) {
        case '01':
            e_month = 'Jan'
            break;
        case '02':
            e_month = 'Feb'
            break;
        case '03':
            e_month = 'Mar'
            break;
        case '04':
            e_month = 'Apr'
            break;
        case '05':
            e_month = 'May'
            break;
        case '06':
            e_month = 'Jun'
            break;
        case '07':
            e_month = 'Jul'
            break;
        case '08':
            e_month = 'Aug'
            break;
        case '09':
            e_month = 'Sep'
            break;
        case '10':
            e_month = 'Oct'
            break;
        case '11':
            e_month = 'Nov'
            break;
        case '12':
            e_month = 'Dec'
            break;
        default: e_month = 'NaN'
            break;
    }


    return (
        <div className="trip-card mb-2">
            <div className="card d-flex justify-content-center">
                <div className="card-body">
                    <Link to={`/tripdetails/${trip._id}`}>
                        <div className="card-img-actions d-flex" style={{ height: '250px' }}>
                            <img src={`${imagePath}/trips/${trip.display_image}`} className="card-img trip-image img-fluid" alt="load" />
                        </div>
                    </Link>
                </div>
                <div className="card-body bg-light text-center" style={{ borderRadius: '7px' }}>
                    <div className="mb-2 mt-2">
                        <h5 className="font-weight-semibold mb-3"> <Link to={`/tripdetails/${trip._id}`} className="trip-title  mb-2" data-abc="true">{trip.title}</Link> </h5>
                    </div>
                    <h4 className="mb-1 font-weight-semibold text-danger trip-price">Rs {trip.price}</h4>
                    <div>
                        <TripRating value={trip.rating} />
                    </div>
                    <div className="text-muted mb-3">
                        {trip.numReviews} Reviews
                    </div>
                    <div>
                        <h6 style={{ color: 'teal' }}>
                            {`${startDay} ${s_month} - ${endDay} ${e_month}`}
                        </h6>
                    </div>
                    <Link to={`/tripdetails/${trip._id}`} className="btn bg-cart booktrip-btn d-flex w-100 justify-content-center">
                        <i className="fa fa-cart-plus mr-2 mt-1"></i>
                        BOOK NOW
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TripCard;
