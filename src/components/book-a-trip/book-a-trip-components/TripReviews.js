import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import ReactStars from "react-rating-stars-component";
import './TripReviews.css'
import TripRating from "./TripRating"
import Message from "../../support-components/Message"

import { createTripReview } from '../../../actions/tripActions';
import { TRIP_CREATE_REVIEW_RESET } from "../../../constants/tripConstants"


const TripReviews = ({ tripId, trip }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const tripCreateReview = useSelector(state => state.tripCreateReview)
  const { error, success } = tripCreateReview

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (success) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: TRIP_CREATE_REVIEW_RESET })
      window.location.reload();
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createTripReview(tripId, { rating, comment }))
  }

  return (
    <div className="reviews-wrap-div container pb-4">
      <h5>Reviews</h5>
      <hr />

      {/* REVIEW DISPLAY SECTION */}

      <div className="review-list-div">
        {trip.reviews.length === 0 && <Message>No Reviews</Message>}

        {trip.reviews.map(review => (
          <div className="container single-review-div mb-2" key={review._id}>
            <div className="row d-flex justify-content-start">
              <p className="reviewer-name mr-2">{review.name}</p>
              <TripRating value={review.rating} />
            </div>
            <div className="row comment-view-div">
              <p>{review.comment}</p>
            </div>
            <div className="row time-tag d-flex justify-content-end text-muted">
              <i>Time Posted: {review.createdAt.substring(0, 10)}</i>
            </div>
          </div>
        ))}

      </div>
      <hr />


      {/* WRITE A REVIEW SECTION */}

      <div className="row write-review-div">
        <div className="d-flex justify-content-start col-12">
          <b>Write a review for this trip:</b>
        </div>
        {error && <Message variant='danger'>{error}</Message>}
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="form-group ml-3">
              <label for="comment" className="mt-2">Comment</label>
              <textarea type="textarea" className="form-control mb-2" onChange={(e) => setComment(e.target.value)}
                value={comment} rows="3" id="comment" placeholder="Your comment" />

              {/* <label htmlFor="rating" id='ratinglabel'>Rating</label> */}
              <ReactStars
                count={5}
                onChange={setRating}
                size={48}
                isHalf={true}
                activeColor="#ffd700"
              />
            </div>
            <button type="submit" className="submit-review-btn btn btn-success ml-3 pt-1 pb-1 pl-2 pr-2">Submit</button>

          </form>
        ) : <div className="ml-3 mt-2">
          <Message>Please <Link to='/login'>Sign in</Link> to write a review about this trip </Message>

        </div>
        }

      </div>

    </div>
  )
}

export default TripReviews
