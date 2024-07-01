import React from "react";
import { ReactComponent as FacebookIcon } from "./facebook.svg";
import { ReactComponent as TwitterIcon } from "./twitter.svg";
import { ReactComponent as InstagramIcon } from "./instagram.svg";
import "./Footer.css"; // Import your CSS file for footer styling

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/">Login</a>
            </li>
          </ul>
        </div>
        <div className="social-media">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="/">
                <FacebookIcon className="social-icon" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="/">
                <TwitterIcon className="social-icon" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a href="/">
                <InstagramIcon className="social-icon" />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="legal">
          <p>© 2024 ParkingLotName. All Rights Reserved.</p>
          <ul>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
