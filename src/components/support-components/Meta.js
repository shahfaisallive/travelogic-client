import React from 'react'
import { Helmet } from "react-helmet"

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Travelogic | Plan your journeys",
    description: "The ultimate travel guide in Pakistan. Plan your trips to your favourite destinations with us",
    keywords: "travelogic, travel, Pakistan, journey, destinations, trips, trip planner, book trip, travel guide, guide, top destinations"
}

export default Meta
