import React from 'react';
import ReactHtmlParser from "react-html-parser";


const DestinationHistory = (props) => {
    const destination = props.destination;
    return (
        <div className="container destination-guidelines-wrap">
            <h5>Guidelines</h5>
            <p className="destination-guidelines-text" >
                {ReactHtmlParser(destination.guidelines)}
            </p>
        </div>
    );
}

export default DestinationHistory;

