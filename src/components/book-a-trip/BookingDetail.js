import React, { useEffect } from 'react'
import './BookingDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactHtmlParser from "react-html-parser";


//BookingDetail's component impoted here
import Searchbar from "../header/Searchbar";
import Loader from "../support-components/Loader"
import DetailTripCard from "./book-a-trip-components/DetailTripCard";
import DetailedItinerary from "./book-a-trip-components/DetailedItinerary";
import TripReviews from './book-a-trip-components/TripReviews'
import { listTripDetails } from '../../actions/tripActions';
import Meta from '../support-components/Meta';


const BookingDetail = ({ match, history }) => {
  const dispatch = useDispatch()

  const tripDetails = useSelector(state => state.tripDetails)
  const { loading, trip } = tripDetails

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(listTripDetails(match.params.id))
  }, [dispatch])

  const proceedToBookingHandler = () => {
    history.push(`/bookingform/${match.params.id}`)
  }


  return (
    <div className="container ">
      <Searchbar />
      {loading ? (
        <div className='pt-1 pb-1 mb-2 bg-white rounded'>
          <Loader />
        </div>
      ) : (
        <div id="outer-div" className="row bg-white mb-3">
          <Meta title={`Trip Details - ${trip.title}`} />
          <div className="p-3 col-md-9"  >
            <DetailTripCard trip={trip} />

            <div id="detail">
              <DetailedItinerary trip={trip} />

              <div className="ml-3">
                <h6>Attractions</h6>
                <p>{ReactHtmlParser(trip.attractions)}</p>

                <h6>Service Provided</h6>
                <p>{ReactHtmlParser(trip.service_provided)}</p>

                <h6>Excludes</h6>
                <p>{ReactHtmlParser(trip.excludes)}</p>

                <div className='price-tag'><span><b>Price: </b>Rs {trip.price}/person</span></div>

                <button id="book-btn" type='button' onClick={proceedToBookingHandler} className="btn w-25 mt-4">Proceed to Booking</button>

                <Link className="back-to-trips-btn btn mt-4 ml-3" to="/bookatrip">Back</Link>

              </div>
            </div>
          </div>

          <div id="side-comp" className="col-md-3 bg-light">
            {/*Empty Side Column */}
          </div>
        </div>

      )}

      {loading ? null : (
        <div className="review-section row mb-3 pt-3 rounded">
          <TripReviews tripId={match.params.id} trip={trip} />
        </div>
      )}

    </div>
  )
}

export default BookingDetail
