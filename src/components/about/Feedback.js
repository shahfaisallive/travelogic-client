import React from 'react'
import Meta from '../support-components/Meta';
import "./Feedback.css";

function Feedback() {
    return (
        <div className="container contact-form bg-white">
            <Meta title="Feedback" />
            <div className="contact-image">
                <img alt="TBD" src={"images/logo.png"} />
            </div>
            <form method="post">
                <h3>Drop Us a Message</h3>
               <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" name="txtName" className="form-control" placeholder="Your Name *"  />
                        </div>
                        <div className="form-group">
                            <input type="text" name="txtEmail" className="form-control" placeholder="Your Email *"  />
                        </div>
                        <div className="form-group">
                            <input type="text" name="txtPhone" className="form-control" placeholder="Your Phone Number *" />
                        </div>
                        
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <textarea name="txtMsg" className="form-control" placeholder="Your Message *" style={{width: "100%", height: 150}}></textarea>
                        </div>
                        <div className="form-group pb-4 ">
                            <input type="submit" name="btnSubmit" className="btnContact" value="Send Message" />
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
    );
}

export default Feedback;
