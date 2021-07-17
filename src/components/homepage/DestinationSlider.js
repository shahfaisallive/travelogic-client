import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "./DestinationSlider.css"


const DestinationSlider = () => {
    const slideImages = [
        "images/destination.jpg",
        "images/place11.jpg",
        "images/place9.jpg"
    ];

    return (
        <div className="slide-container rounded">
            <Slide>
                <div className="each-slide rounded">
                    <div className="image-div" style={{'backgroundImage': `url(${slideImages[0]})`, backgroundSize: '100%' }}>
                        {/* <span>First Destination</span> */}
                    </div>
                </div>
                <div className="each-slide rounded">
                    <div className="image-div" style={{ 'backgroundImage': `url(${slideImages[1]})`, backgroundSize: '100%'}}>
                        {/* <span>Second Destination</span> */}
                    </div>
                </div>
                <div className="each-slide rounded">
                    <div className="image-div" style={{ 'backgroundImage': `url(${slideImages[2]})`, backgroundSize: '100%'}}>
                        {/* <span>Third Destination</span> */}
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default DestinationSlider
