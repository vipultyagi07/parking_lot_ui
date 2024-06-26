import React from 'react'
import './Footer.css'
import { ReactComponent as Motorcycle } from './twowheeler.svg';
import { ReactComponent as Fourwheeler } from './fourwheeler.svg';
import { ReactComponent as Ticket } from './ticket.svg';

function Content() {
    return (
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
        </div>
    )
}

export default Content;
