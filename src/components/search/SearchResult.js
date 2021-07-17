import React, { useState, useEffect } from 'react'
import axios, { imagePath } from '../support-components/axios';
import { Link } from 'react-router-dom';
import Loader from "../support-components/Loader"

import './SearchResult.css'
import Searchbar from '../header/Searchbar';
import DestinationRating from '../destinations/DestinationRating';
import TripCard from '../book-a-trip/book-a-trip-components/TripCard';
import SearchQuestionCard from '../forum/SearchQuestionCard'

function SearchResult(props) {

  const [loader, setLoader] = useState(false)
  const [questions, setQuestions] = useState([])
  const [trips, setTrips] = useState([])
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    setLoader(true)
    setQuestions([])
    setTrips([])
    setDestinations([])
    axios.get(`/search/${props.match.params.query}`)
      .then(res => {
        
        console.log(res.data)
        console.log(props.match.params.query)
        if (res.data.questions.length > 0) {
          setQuestions(res.data.questions)
        }
        if (res.data.destinations.length > 0) {
          setDestinations(res.data.destinations)
        }
        if (res.data.trips.length > 0) {
          setTrips(res.data.trips)
        }
        setLoader(false)

      })
      .catch(err => {
        console.log(err)
        setLoader(false)

      })
  }, [props.match.params.query])

  return (
    <div className='container'>
      <Searchbar history={props.history} />
      {
        loader ?
          <div style={{"marginBottom":"150px"}} className="pt-3 pb-5 ">
            <Loader />
          </div>
          :
          questions.length === 0 && trips.length === 0 && destinations.length === 0 ?
            <div style={{"marginBottom":"220px"}} className='pt-3 pb-3 text-center rounded bg-white'>
              <h5>Sorry! We couldn't find any matching results for: "{props.match.params.query}"</h5>
            </div>
            :
            <div>
              <div className="row d-flex justify-content-center">
                <h3 className="mt-3">Search results for: "{props.match.params.query}"</h3>
              </div>
              {destinations.length > 0 ?
                <div className="row destinations-wrap-div d-flex justify-content-center">
                  {/* <h5>Destinations</h5> */}
                  {
                    destinations.map(destination => {
                      return (
                        (
                          <div className="row single-destination-wrap" key={destination._id}>
                            <div className="col-md-4 d-flex justify-content-center destination-display-img-div">
                              <Link to={"/destinationsdetails/" + destination._id}>
                                <img alt={destination.title} className=" w-100 destination-display-img mb-2" src={`${imagePath}/images/${destination.title_image}`}></img>
                              </Link>
                            </div>
                            <div className="col-md-8 pl-5 mt-2 destination-short-intro-div">
                              <div className="row d-flex justify-content-start    ">
                                <div className="col-10 d-flex pl-0">
                                  <h4 className="destination-title">{destination.title}</h4>
                                  <div className="ml-2 mt-1">
                                    <DestinationRating value={destination.rating} />
                                  </div>
                                </div>
                                <div className="col-2">
                                  <p className="mt-1" style={{ fontWeight: 'bold', fontSize: '18px' }}>{destination.rating.toFixed(2)}</p>
                                </div>
                              </div>
                              <div className="row d-flex justify-content-start pr-5 " id="destination-intro">
                                <p>
                                  {destination.introduction.substring(0, 620)}...[click below to read more]
                                </p>
                                <Link to={"/destinationsdetails/" + destination._id}><button className="btn" id="destination-details-btn">Read More</button></Link>
                              </div>
                            </div>
                          </div>
                        ))
                    })}
                </div>
                :
                (
                  <></>
                )
              }
              {trips.length > 0 ?
                <div className="row destinations-wrap-div d-flex justify-content-center">
                  {/* <h5>Trips</h5> */}
                  <div className="container pb-4 trip-cards-display-container bg-white ">
                    <div className="row">
                      {
                        trips.map(trip => (
                          <div className="col-md-4 trip-card-div" key={trip._id}>
                            <TripCard trip={trip} />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                :
                (
                  <></>
                )
              }

              {questions.length > 0 ?
                <div className="row destinations-wrap-div d-flex justify-content-center">
                  {/* <h5>Questions</h5> */}
                  <div className="container pb-4 trip-cards-display-container bg-white ">
                    <div className="row">
                      {
                        questions.map(question => (
                          <div className="col-md-4 trip-card-div" key={question._id}>
                            <SearchQuestionCard data={question} />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                :
                (
                  <></>
                )
              }

            </div>
      }
    </div>
  )
}

export default SearchResult

