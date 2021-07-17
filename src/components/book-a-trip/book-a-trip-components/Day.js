import React from 'react'
import ReactHtmlParser from "react-html-parser";


const Day = ({ itineraryDay }) => {
  return (
    <div>
      <h6>Day {itineraryDay.day}:</h6>
      <p>
        {ReactHtmlParser(itineraryDay.description)}
      </p>
    </div>
  )
}

export default Day
