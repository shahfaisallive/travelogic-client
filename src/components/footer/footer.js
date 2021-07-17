import React from 'react'
import { Link } from 'react-router-dom';
import "./Footer.css";

function Footer(){
    return (
        <div className="footer-wrap border border-primary">
            <div className="row container-fluid">
                <div className="col-md-4 " id="footer-intro">
                    <p className="footer-intro-text">Travelogic is one of the leading travelguide system and tour operating company in Pakistan. We aim to provide best guidance for travel enthusiastics across Pakistan.</p>
                    <span><i className="fas fa-map-marker-alt"></i>  Lahore, Pakistan</span>
                </div>
                <div className="col-md-4 border-left border-right" id="footer-shortcuts-links">
                    <div className="row d-flex justify-content-center">
                        <h6 style={{ fontWeight: "bold" }}>Quick Links</h6>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <ul style={{ listStyle: "none" }}>
                                <li>
                                    <Link className="Nav-link" to="/destinations">Destinations</Link>
                                </li>
                                <li>
                                    <Link className="Nav-link" to="/planatrip">Plan a trip</Link>
                                </li>
                                <li>
                                    <Link className="Nav-link" to="/bookatrip">Book a trip</Link>
                                </li>
                                <li>
                                    <Link className="Nav-link" to="/forum">Forum</Link>
                                </li>
                                <li>
                                    <Link className="Nav-link" to="/about">About</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <ul style={{ listStyle: "none" }}>
                                <li>
                                    <Link className="Nav-link" to="/feedback">Contact</Link>
                                </li>
                                <li>
                                    <Link className="Nav-link" to="/profile">Profile Settings</Link>
                                </li>
                                <li>
                                    <Link className="Nav-link" to="/privacy">Privacy</Link>
                                </li>
                                <li>
                                    <Link className="Nav-link" to="/newsletter">Newsletter</Link>
                                </li>
                                <li>
                                    <Link className="Nav-link" to="/profile">Account Info</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" id="footer-social-div">
                    <div className="row d-flex justify-content-center">
                        <h6 style={{ fontWeight: "bold" }}>Follow us</h6>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <a className="social-icons" rel="noreferrer" target='_blank' href="https://www.facebook.com/shahfaisallive"><i className="social-icon-footer fab fa-facebook"></i></a>
                        <a className="social-icons" rel="noreferrer" target='_blank' href="https://twitter.com/shahfaisallive"><i className="social-icon-footer fab fa-twitter-square"></i></a>
                        <a className="social-icons" rel="noreferrer" target='_blank' href="https://instagram.com/travelogicpk"><i className="social-icon-footer fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Footer;

