import React, { useEffect, useState } from 'react';
import "./RatingModal.css"
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { rateDestination } from '../../actions/destinationActions';
import { RATE_DESTINATION_RESET } from '../../constants/destinationConstants';

import Message from "../support-components/Message"
import { Link } from 'react-router-dom';

const RatingModal = ({ destId, data }) => {
    const [rating, setRating] = useState(0)

    const dispatch = useDispatch()

    const destinationRating = useSelector(state => state.rateDestination)
    const { error, loading, success } = destinationRating

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (success) {
            alert(`You rated ${data.title} successfully`)
            setRating(0)
            dispatch({ type: RATE_DESTINATION_RESET })
            window.location.reload();
        }

    }, [dispatch, success])

    const submitRating = (e) => {
        e.preventDefault()
        dispatch(rateDestination(destId, { rating }))
    }


    return (
        <div className="rating-destination-modal modal-content">
            <div className="modal-header">
                <h4 className="modal-title">How much do you rate {data.title}</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            {userInfo ? (
                <>
                    <div className="modal-body d-flex justify-content-center">
                        <ReactStars
                            count={5}
                            onChange={setRating}
                            size={56}
                            isHalf={true}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div className="modal-footar mt-4">
                        <button type="submit" className="btn submit-rating-btn float-right mr-3 mb-2" onClick={submitRating} data-dismiss="modal">
                            Submit
                        </button>
                    </div>
                </>
            ) : (
                <div className="ml-4 mr-4">
                    <Message>Please <Link to='/login'>Sign in</Link> rate this destination</Message>
                </div>
            )}

        </div>
    )
}

export default RatingModal;
