import React from 'react'
import "./DetailedItinerary.css";

import Day from "./Day";

const DetailedItinerary = ({ trip }) => {
  const itineraryArray = trip.itinerary

  let itineraryRender
  if (itineraryArray) {
    itineraryRender = itineraryArray.map(itn => {
      return (
        <div key={itn._id}>
          <Day itineraryDay={itn} />
        </div>
      )
    })
  }

  return (
    <div id="detail-div" className="m-3 pt-3 pb-1 pl-1 row" >
      <div className='col-md-12'>
        <h5 className="mb-3">Detailed Itinerary</h5>
        {itineraryRender}
      </div>
    </div>
  )
}

export default DetailedItinerary
