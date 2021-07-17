import React, { useEffect } from 'react'

//Newsletter components imported here
import Searchbar from "../header/Searchbar.js"

function Newsletter() {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <div className="container newsletter-wrap">
            <Searchbar />
            <div className=" bg-white d-flex justify-content-center rounded mb-4" style={{padding: 60}}>
                <h4>Sorry! There is currently no newsletter available. We'll notify you when published. Stay with us!</h4>
            </div>
        </div>
    );
}

export default Newsletter;