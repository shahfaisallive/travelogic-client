import React from 'react';
import ReactHtmlParser from "react-html-parser";

const DestinationHistory = (props) => {
    const destination = props.destination;
    return (
        <div className="container destination-history-wrap">
            <h5>History</h5>
            <p className="destination-history-text">
                {ReactHtmlParser(destination.history)}
            </p>
        </div>
    );
}

export default DestinationHistory;

