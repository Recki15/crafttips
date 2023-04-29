import React, { useState } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import LoggedInNavbar from '../Components/LoggedInNavbar';
import LandingNavbar from '../Components/LandingNavbar';
import { useEffect } from 'react'

const Mailto = ({ email, subject, body, children }) => {
  return (
    <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
  );
};

export const ContactUs = () => {

  const [name, setName] = useState('');

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
    } catch (error) {
      if (error.response) {
      }
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  const navbarDecider = () => {
    if (name.length > 0) {
      return <LoggedInNavbar />
    } else {
      return <LandingNavbar />
    }
  }


  return (
    <div className='content'>
      {navbarDecider()}
      <div className="col-md-auto col-lg-auto" style={{ marginRight: "15%", marginLeft: "15%", marginTop: "5%" }}>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section" style={{ color: '#EEE' }}>Contact us</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="wrapper">
                  <div className="row no-gutters">
                    <div className="col-md-6 d-flex align-items-stretch">
                      <div className="contact-wrap w-100 p-md-5 p-4 py-5">
                        <h3 className="mb-4" style={{ color: '#EEE' }}>Write to us</h3>
                        <h6 className='mb-4' style={{ color: '#EEE' }}>
                          <ul>
                            <li>Write your message here, click 'Send message' and it will open your default mail app for you. </li>
                            <li>If you leave anything blank you will need to fill out that part in your mail app.</li>
                            <li>If you don't have a mail app, copy our email and write one manually from your phone/browser.</li>
                          </ul>
                          </h6>
                        <form method="POST" id="contactForm" name="contactForm" className="contactForm">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required minLength={4} />
                              </div>
                              <br />
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <textarea name="message" className="form-control" id="message" cols="30" rows="6" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required minLength={10}></textarea>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <Mailto email="crafttips@crafttips.com" subject={`${subject}`} body={`${message}`}>
                                  <h5 className='mb-4' style={{ color: '#EEE', border:'1px solid black', textAlign:'center', marginTop:'5px', paddingTop:'4px', backgroundColor:'#393E46', minHeight:'30px',borderRadius:'60px' }}>
                                    Send message
                                  </h5>
                                </Mailto>
                                <div className="submitting"></div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch">
                      <div className="info-wrap w-100 p-md-5 p-4 py-5 img">
                        <h3 style={{color:'#EEE'}}>Contact information</h3>
                        <p className="mb-4">We're open for any suggestion or just to have a chat</p>
                        <div className="dbox w-100 d-flex align-items-start">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-map-marker"></span>
                          </div>
                          <div className="text pl-3">
                            <p><span>Address:</span> 4400, Nyíregyháza, Imagine street 6</p>
                          </div>
                        </div>
                        <div className="dbox w-100 d-flex align-items-center">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-phone"></span>
                          </div>
                          <div className="text pl-3">
                            <p><span>Phone:</span> +36 12 345 6789</p>
                          </div>
                        </div>
                        <div className="dbox w-100 d-flex align-items-center">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-paper-plane"></span>
                          </div>
                          <div className="text pl-3">
                            <p><span>Email:</span> crafttips@crafttips.com</p>
                          </div>
                        </div>
                        <div className="dbox w-100 d-flex align-items-center">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-globe"></span>
                          </div>
                          <div className="text pl-3">
                            <p><span>Website</span> crafttips.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
