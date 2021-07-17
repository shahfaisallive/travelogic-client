import React from 'react'
import "./OurTeam.css";
//import { Link } from 'react-router-dom';

function OurTeam() {
    return (
        <div className="container about-our-team-wrap mt-2 ">
            <div className="row d-flex justify-content-center">
                <h2 className="display-4 our-team-title">Meet our team</h2>
            </div>
            <div className="container bootdey">
                <div className="row">
                    <div className="col-md-4 mt-4 pt-2">
                        <div className="team text-center rounded p-3 py-4">
                            <img src={"images/team-asad.jpg"} className="img-fluid avatar avatar-medium shadow rounded-pill" alt="" />
                            <div className="content mt-3">
                                <h4 className="title mb-0">Asad Gohar</h4>
                                <small className="text-muted">Founder</small>
                                <ul className="list-unstyled mt-3 social-icon social mb-0">
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-facebook" title="Facebook"></i></a></li>
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-instagram" title="Instagram"></i></a></li>
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-twitter-square" title="Twitter"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mt-4 pt-2">
                        <div className="team text-center rounded p-3 py-4">
                            <img src={"images/team-faisal.jpeg"} className="img-fluid avatar avatar-medium shadow rounded-pill" alt="" />
                            <div className="content mt-3">
                                <h4 className="title mb-0">Shah Faisal</h4>
                                <small className="text-muted">Founder</small>
                                <ul className="list-unstyled mt-3 social-icon social mb-0">
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-facebook" title="Facebook"></i></a></li>
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-instagram" title="Instagram"></i></a></li>
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-twitter-square" title="Twitter"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mt-4 pt-2">
                        <div className="team text-center rounded p-3 py-4">
                            <img src={"images/team-safa.jpg"} className="img-fluid avatar avatar-medium shadow rounded-pill" alt="" />
                            <div className="content mt-3">
                                <h4 className="title mb-0">Safa Naeem</h4>
                                <small className="text-muted">Founder</small>
                                <ul className="list-unstyled mt-3 social-icon social mb-0">
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-facebook" title="Facebook"></i></a></li>
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-instagram" title="Instagram"></i></a></li>
                                    <li className="list-inline-item"><a  href="x" className="rounded"><i className="fab fa-twitter-square" title="Twitter"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default OurTeam;
