import React, { useState, useEffect } from 'react'
import "./DestinationDetails.css";
import axios from '../../support-components/axios';

//Destinations components imported here
import Searchbar from "../../header/Searchbar.js"

//Importing  Destination details components
import DestinationDetailsIntro from "./DestinationDetailsIntro.js";
import DestinationAttractions from "./DestinationAttractions.js";
import DestinationPhotos from "./DestinationPhotos.js";
import DestinationHistory from "./DestinationHistory.js";
import DestinationGuidelines from "./DestinationGuidelines.js";
import Loader from "../../support-components/Loader"
import Meta from '../../support-components/Meta';


const DestinationDetails = (props) => {

    const id = props.match.params.id;

    const [destination, setDestination] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get('/destinations/' + id)
            .then(res => {
                setDestination(res.data);
                // console.log(destination)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id])

    return (
        <div className="container ">
            <Searchbar history={props.history} />
            {!destination ? (
                <Loader />
            ) : (
                <div className="container destination-details-wrap pt-4 pl-3 pr-3 pb-3">
                    <>
                        <Meta title={`Destinations | ${destination.title}`} />
                        <DestinationDetailsIntro destination={destination} />

                        {/*Destination details toggle menu bar*/}
                        <div className="container">
                            <div className="row" >
                                <div className="col-md-12 " id="destination-details-menu">
                                    <nav>
                                        <div className=" nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a className=" nav-item nav-link active" id="destination-attractions" data-toggle="tab" href="#attractions" role="tab" aria-controls="attractions" aria-selected="true">ATTRACTIONS</a>
                                            <a className="nav-item nav-link" id="destination-photos" data-toggle="tab" href="#photos" role="tab" aria-controls="photos" aria-selected="false">PHOTOS</a>
                                            <a className="nav-item nav-link" id="destination-guidelines" data-toggle="tab" href="#guidelines" role="tab" aria-controls="guidelines" aria-selected="false">GUIDELINES</a>
                                            <a className="nav-item nav-link" id="destination-history" data-toggle="tab" href="#history" role="tab" aria-controls="history" aria-selected="false">HISTORY</a>
                                        </div>
                                    </nav>
                                    <div className="tab-content py-3 px-3 px-sm-0 mt-2" id="nav-tabContent">
                                        <div className="tab-pane fade show active " id="attractions" role="tabpanel" aria-labelledby="destination-attractions">
                                            <DestinationAttractions destination={destination} />
                                        </div>
                                        <div className="tab-pane fade" id="photos" role="tabpanel" aria-labelledby="destination-photos">
                                            <DestinationPhotos destination={destination} />
                                        </div>
                                        <div className="tab-pane fade" id="guidelines" role="tabpanel" aria-labelledby="destination-guidelines">
                                            <DestinationGuidelines destination={destination} />
                                        </div>
                                        <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="destination-history">
                                            <DestinationHistory destination={destination} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*END HERE*/}
                    </>
                </div >
            )}

        </div >
    );
}


export default DestinationDetails;

