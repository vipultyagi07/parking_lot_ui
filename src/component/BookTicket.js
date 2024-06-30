import React from 'react'
import Footer from './Footer'
import Content from './Content'
import Header from './Header'
import { ReactComponent as Motorcycle } from './twowheeler.svg';
import { ReactComponent as Fourwheeler } from './fourwheeler.svg';
import { ReactComponent as Ticket } from './ticket.svg';

function BookTicket() {
  return (
    <div>
      <Header/>
      <div>
      <div>
            <section id="booking">
                <h2>Booking</h2>
                <div className="booking-container">
                    <div className="pricing-card">
                        <a href="/">
                            <Motorcycle className="social-icon" />
                        </a>                
                        <h3>2 Wheeler</h3>
                        <p>Total Spots: 50</p>
                        <p>Free Spots: 20</p>
                        <p>Filled Spots: 30</p>
                    </div>

                    <div className="card large-card">
                        <a href="/">
                            <Ticket className="social-icon" />
                        </a>
                        <h3>Generate Ticket</h3>
                        <form id="ticket-form">
                            <label htmlFor="vehicle-type">Select Vehicle Type:</label>
                            <select id="vehicle-type" name="vehicle-type">
                                <option value="2wheeler">2 Wheeler</option>
                                <option value="4wheeler">4 Wheeler</option>
                            </select>
                            <button type="submit" className="cta">Proceed</button>
                        </form>
                    </div>
                    <div className="pricing-card">
                        <a href="/">
                            <Fourwheeler className="social-icon" />
                        </a>
                        <h3>4 Wheeler</h3>
                        <p>Total Spots: 30</p>
                        <p>Free Spots: 10</p>
                        <p>Filled Spots: 20</p>
                    </div>
                </div>
            </section>
            <section id="ticket-info">
                <h2>Ticket Information</h2>
                <div className="ticket-info-container">
                    <div className="card">
                        <h3>Live Ticket See</h3>
                        <p>Total Live Tickets: 100</p>
                        <br />
                        <button className="cta">View</button>
                    </div>
                    <div className="card">
                        <h3>Total Generated Tickets</h3>
                        <p>Total Tickets: 100</p>
                        <button className="cta">View</button>
                    </div>
                    <div className="card">
                        <h3>Payment Info</h3>
                        <p>Total Revenue: $5000</p>
                        <p>Last Payment: $50</p>
                        <button className="cta">View</button>
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
                <h3>Book a Spot</h3>
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
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default BookTicket
