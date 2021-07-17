import React, { useEffect } from 'react'
import "./homepage.css"
import { Link } from 'react-router-dom';


//Homepage components imported here
import Slider from "./Slider.js"
import Searchbar from "../header/Searchbar.js"
import DestinationSlider from "./DestinationSlider"
import ImageGallery from "./ImageGallery"
import Meta from "../support-components/Meta"

const Homepage = ({ history }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const getStartedHandler = () => {
        window.scrollTo(0, 1000)
    }

    return (
        <>
            <Meta />
            <Slider className="mt-5" />
            <Searchbar history={history} />


            <div className="homepage-wrap">

                {/*Intro Section */}
                <section className="page-section-intro mb-4" id="introSection" >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="text-white mt-0">We've got what you need!</h2>
                                <hr className="divider light my-4" />
                                <p className="text-light mb-4">You are at the right place to find the solutions to all of your travel problems. Stay with us. We'll make your journey's better</p>
                                <button className="btn" onClick={getStartedHandler} id="get-started">Get Started!</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Destinations Section */}
                <section>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 order-lg-2">
                                <DestinationSlider />
                            </div>
                            <div className="col-lg-6 order-lg-1">
                                <div className="p-5">
                                    <h2 className="display-4">Find Your Destinations!</h2>
                                    <p>Find out which destinations are trending at top this season. You can have all the necessary information about ultimate destinations in Pakistan.</p>
                                    <Link to="/destinations"><button className="btn mt-2 homeShortcutBtn">View more Destinations</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Planner Section */}

                <section>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="p-5"><img className="img-fluid rounded" src={"images/plannerimage.jpg"} alt="..." /></div>
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <h2 className="display-4">Plan Your Journeys!</h2>
                                    <p>Plan and calculate your journeys with us. Just give us your destination and we will generate and automated secure plan for you. </p>
                                    <Link to="/planatrip"><button className="btn mt-2 homeShortcutBtn" >Plan here</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Book trip Section */}

                <section>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 order-lg-2">
                                <div className="p-5"><img className="img-fluid rounded" src={"images/booktripimage.jpg"} alt="..." /></div>
                            </div>
                            <div className="col-lg-6 order-lg-1">
                                <div className="p-5">
                                    <h2 className="display-4">Travel With Us!</h2>
                                    <p>Don't wanna go out yourself? Wanna skip all the hurdles, this is the right place for you. You can book any of our pre-prganzied tour with us to the ultimate beautiful destinations of Pakistan.</p>
                                    <Link to="/bookatrip"><button className="btn mt-2 homeShortcutBtn" >Book here</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Photo Gallery */}
                <ImageGallery />


                {/*Contact Section*/}
                <section className="page-section-contact" id="contact">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="display-4 mt-0">Let's Get In Touch!</h2>
                                <hr className="divider my-4" />
                                <p className="text-muted mb-5">If you have any queries or want to discuss your plans with us just give us a call or send an email. We'll get in touch with you.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                                <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
                                <div>+92 312-4224469</div>
                            </div>
                            <div className="col-lg-4 mr-auto text-center">
                                <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
                                <a className="d-block" href="mailto:contact@yourwebsite.com">info@travelogic.pk</a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}

export default Homepage;
