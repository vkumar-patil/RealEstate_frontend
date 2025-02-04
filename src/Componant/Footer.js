import React from "react";
import "./Footer.css"; // Create a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="row">
            <div className="newsletter col-md-4">
              <h3>Newsletter Signup</h3>
            </div>
            <div className="newsletter col-md-8">
              <input type="email" placeholder="Enter your email" />
            </div>
          </div>
        </div>
        <div className="footer-main">
          <div className="footer-logo">
            <div className="logo">
              {" "}
              <span>Logo</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <ul>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
              </ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© Lorem Ipsum - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
