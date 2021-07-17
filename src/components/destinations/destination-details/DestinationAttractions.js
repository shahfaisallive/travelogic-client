import React from 'react';
import { imagePath } from '../../support-components/axios';
import "./DestinationAttractions.css"
import Loader from "../../support-components/Loader"


const DestinationAttractions = (props) => {
    const destination = props.destination;

    const attractions = destination.attraction_photos;

    let attractionItem;
    if (attractions) {
        attractionItem = attractions.map(attraction => (
            <div className="col-md-4" key={attraction._id}>
                <div className="card attraction-image-card">
                    <a href={`${imagePath}/images/${attraction.path}`} target="_blank">
                        <img src={`${imagePath}/images/${attraction.path}`} className="card-img-top attraction-img" alt={attraction.title} />
                    </a>
                    <div className="card-body attraction-card-body">
                        <h5 className="card-title text-center">{attraction.title}</h5>
                    </div>
                </div>
            </div>
        ))
    } else {
        <Loader />
    }

    return (
        <div className="container destination-attractions-wrap">
            <div className="row d-flex attractions-cards-wrap">
                {attractionItem}
            </div>
        </div>
    );
}

export default DestinationAttractions;

