import React from 'react'
import { Spinner } from 'react-bootstrap';
import { imagePath } from '../../support-components/axios';

// importing components
import DestinationRating from '../DestinationRating';
import RatingModal from "../RatingModal";

const DestinationDetailsIntro = (props) => {
    const destination = props.destination;

    return (
        <div className="container destination-intro-wrap pb-5" >
            <div className="row ">
                <div className="col d-flex justify-content-start">
                    <h3 className="destination-title">{destination.title}</h3>
                    {destination.rating ? <span className="ml-3 mt-2">{destination.rating.toFixed(2)}</span> : null}
                    <div className="ml-1 mt-2">
                        <DestinationRating value={destination.rating} />
                    </div>
                </div>
                <button className="btn rate-destination-btn mr-2" data-toggle="modal" data-target="#rateDestination">Rate here</button>

                {/* RATING DESTINATION MODAL */}
                <div className="modal fade" id="rateDestination" role="dialog">
                    <div className="modal-dialog">
                        <RatingModal destId={destination._id} data={destination} />
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                {!destination.title_image ? (
                    <div className="col-md-5 d-flex justify-content-center">
                        <Spinner className="spinner text-success mt-5" animation="border" role="status" />
                    </div>
                ) : (
                    <div className="col-md-5">
                        <img alt={destination.title} className=" w-100 destination-display-img" src={`${imagePath}/images/${destination.title_image}`}></img>
                    </div>
                )}

                <div className="col-md-7 pl-5 mt-2 destination-intro-div">
                    <div className="row">
                        <h4 className="destination-introduction">Introduction</h4>
                    </div>
                    <div className="row d-flex justify-content-start pr-5 destination-intro">
                        <p>
                            {destination.introduction}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DestinationDetailsIntro;
