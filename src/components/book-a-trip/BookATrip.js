import React, { useEffect, useState } from 'react'
import "./BookATrip.css"

//BookATrip components imported here
import Searchbar from "../header/Searchbar.js"
import TripCard from "./book-a-trip-components/TripCard.js"
import Loader from "../support-components/Loader"

import { useDispatch, useSelector } from 'react-redux'
import { listTrips } from '../../actions/tripActions'
import Meta from '../support-components/Meta'
import { toast } from 'react-toastify'


const BookATrip = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const dispatch = useDispatch()

    // bringing state pieces into compinents(alternate method of mapStateToProps)
    const tripList = useSelector(state => state.tripList)
    const { loading, trips, error } = tripList

    useEffect(() => {
        dispatch(listTrips())
        // toast.success("This page is under development. We aren't taking any bookings right now. Stay in touch", {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: 10000,
        //     pauseOnHover: true
        // })
    }, [dispatch])

    // console.log(trips);

    return (
        <div className="container BookATrip-wrap mb-2">
            <Searchbar history={history} />

            <div className="row d-flex justify-content-center">
                <h2 className="mb-4">Trips & Tours</h2>
            </div>
            {loading ? (
                <div className='pt-2 pb-2 bg-white rounded'>
                    <Loader />
                </div>
            ) : error ? (
                <div className="alert alert-danger alert-dismissible fade show">
                    <strong>Error!</strong> {error}
                    {/* <button type="button" className="close" data-dismiss="alert">&times;</button> */}
                </div>
            ) : (
                <div className="container pb-4 trip-cards-display-container bg-white ">
                    <Meta title="Trips & Tours" keywords="trips, tours, bookings, Pakistan, travel, journey, northern Pakistan, 5 day trip, 3 day trips, hotels, transport, destinations" />
                    <div className="row">
                        {
                            trips.filter(trip => trip.title.toLowerCase().includes(keyword.toLowerCase()))
                                .map(trip => (
                                    <div className="col-md-4 trip-card-div" key={trip._id}>
                                        <TripCard trip={trip} />
                                    </div>
                                ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookATrip;
