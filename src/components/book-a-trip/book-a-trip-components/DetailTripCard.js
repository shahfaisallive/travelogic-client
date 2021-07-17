import React, { useState } from 'react'
import { imagePath } from '../../support-components/axios';
import "./DetailTripCard.css";

import TripRating from './TripRating';

const DetailTripCard = ({ trip }) => {
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
    <div>
      <div className="row mb-2 outer-div">
        <div className="card mx-4 mt-3 rounded card-border" >
          <div className="row no-gutters">
            <div id="img-div" className="col-md-3" >
              <img src={`${imagePath}/trips/${trip.display_image}`} className="card-img" alt="TBD"></img>
            </div>
            <div className="col mr-1" >
              <div className="card-body">
                <div className="row ml-3 " >
                  <div className="">
                    <span id="name">{trip.title}</span>
                    <div className="">
                      <div >
                        <div className="float-left mr-1">
                          <TripRating value={trip.rating} />
                        </div>
                        <span>({trip.numReviews})</span>
                      </div>
                    </div>
                    <p className="trip-description card-text mt-1">
                      {trip.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-2 mt-2 row">
            <h6 style={{ color: 'teal' }}>
              Date: {`${startDay} ${s_month} - ${endDay} ${e_month}`}
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailTripCard
