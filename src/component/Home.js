import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <Header />

      <div>
        <section id="hero">
          <div className="hero-content">
            <h1>Welcome to ParkingLotName</h1>
            <p>Secure & Convenient Parking Solutions</p>
            <p>
              Easily manage and book parking spots for 2-wheelers and
              4-wheelers.
            </p>
            <Link to="/BookTicket" className="cta">
              Find a Spot Now
            </Link>
          </div>
        </section>

        <section id="features">
          <h2>Features</h2>
          <div className="features-container">
            <div className="feature">
              <img src="/assets/easy.jpg" alt="Easy Booking" />
              <h3>Easy Booking</h3>
              <p>Book your parking spot in just a few clicks.</p>
            </div>
            <div className="feature">
              <img src="/assets/realtime.jpg" alt="Real-time Availability" />
              <h3>Real-time Availability</h3>
              <p>View real-time availability of parking spots.</p>
            </div>
            <div className="feature">
              <img src="/assets/securepayment.jpg" alt="Secure Payments" />
              <h3>Secure Payments</h3>
              <p>Secure and hassle-free payment options.</p>
            </div>
            <div className="feature">
              <img src="/assets/support.jpg" alt="Customer Support" />
              <h3>Customer Support</h3>
              <p>24/7 customer support to assist you.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <img src="/assets/login.jpg" alt="Sign Up" />
              <h3>Sign Up</h3>
              <p>Create your account in seconds.</p>
            </div>
            <div className="step">
              <img src="/assets/book.jpg" alt="Book a Spot" />
              <h3>Find a Spot</h3>
              <p>Choose your spot from available options.</p>
            </div>
            <div className="step">
              <img src="/assets/parking.jpg" alt="Park Easily" />
              <h3>Park Easily</h3>
              <p>Park your vehicle and enjoy a worry-free experience.</p>
            </div>
            <div className="step">
              <img src="/assets/payment.jpg" alt="Make Payment" />
              <h3>Make Payment</h3>
              <p>Securely pay for your spot online.</p>
            </div>
          </div>
        </section>

        <section id="pricing">
          <h2>Pricing</h2>
          <div className="pricing-container">
            <div className="pricing-card">
              <img src="/assets/motorcycle.jpg" alt="Motorcycle" />
              <h3>2-Wheelers</h3>
              <ul>
                <li>Daily: $10</li>
                <li>Weekly: $50</li>
                <li>Monthly: $150</li>
              </ul>
            </div>
            <div className="pricing-card">
              <img src="/assets/car.jpg" alt="Car" />
              <h3>4-Wheelers</h3>
              <ul>
                <li>Daily: $20</li>
                <li>Weekly: $100</li>
                <li>Monthly: $300</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
