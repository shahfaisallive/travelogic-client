import React from 'react'
import "./About.css";
import { Link } from 'react-router-dom';


//About components imported here
import Searchbar from "../header/Searchbar.js"
import OurTeam from "./OurTeam.js"
import Meta from '../support-components/Meta';

function About({ history }) {
    return (
        <div className="container ">
            <Meta title="About us" />
            <Searchbar history={history} />
            <div className="container about-us-wrap bg-white">
                <div className="row  pt-2 ">
                    <div className="col-lg-5 about-us-description">
                        <div className="container" id="about-travelogic-div ">
                            <h2 className="text-center mt-5">About Travelogic</h2>
                            <p className="text-center">Travelogic is one of the leading travelguide system and tour operating company in Pakistan. We aim to provide best guidance for travel enthusiastics across Pakistan.</p>
                            <hr />
                            <h5 className="text-center">Join us here</h5>
                            <div className="row d-flex justify-content-center ">
                                <a className="about-social-icons" target='_blank' href="https://www.facebook.com/shahfaisallive"><i className="social-icon-footer fab fa-facebook"></i></a>
                                <a className="about-social-icons" target='_blank' href="https://twitter.com/shahfaisallive"><i className="social-icon-footer fab fa-twitter-square"></i></a>
                                <a className="about-social-icons" target='_blank' href="https://instagram.com/travelogicpk"><i className="social-icon-footer fab fa-instagram"></i></a>
                            </div>

                            <hr />
                            <div className="msg-btn-div">
                                <Link to="/feedback"><button className="btn" id="send-message-btn">Send us a Message</button></Link>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2">{/*EMPTY DIV*/}</div>

                    <div className="col-lg-5  about-us-main-png d-flex justify-content-center">
                        <img className="d-block w-100 " src={"images/logo.png"} style={{ width: 250 }} alt="about travelogic"></img>
                    </div>
                    <hr style={{ width: "90%", marginTop: "40px" }} />
                </div>
                <OurTeam />
            </div>
        </div>
    );
}

export default About;


