import React, { useState } from "react";
import "../css/Custom.css"; // Adjust the path as necessary
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>ParkingLotName</h3>
                    <p>Providing the best parking solutions for you.</p>
                </div>
                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#login">Login</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h4>Contact Us</h4>
                    <p>Email: info@parkinglotname.com</p>
                    <p>Phone: +123-456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ParkingLotName. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
