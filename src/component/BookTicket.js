import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import { ReactComponent as Motorcycle } from "./twowheeler.svg";
import { ReactComponent as Fourwheeler } from "./fourwheeler.svg";
import { ReactComponent as Ticket } from "./ticket.svg";
import { Modal, Button, Spinner } from "react-bootstrap"; // Import Spinner for loading indicator
import { Link, useNavigate } from "react-router-dom";

function BookTicket() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
  }, [navigate]);

  const [twoWheelerData, setTwoWheelerData] = useState({
    totalSpot: 0,
    freeSpot: 0,
  });
  const [fourWheelerData, setFourWheelerData] = useState({
    totalSpot: 0,
    freeSpot: 0,
  });
  const [error, setError] = useState("");
  const [ticketDetails, setTicketDetails] = useState(null); // State to hold ticket details for modal display
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const vehicleNumber = event.target.elements["vehicle-number"].value;
    const vehicleType = event.target.elements["vehicle-type"].value;

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:8081/api/entrance/generate/ticket",
        {
          vehicleNo: vehicleNumber,
          vehicleType: vehicleType.toUpperCase(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Set Authorization header with token
          },
        }
      );

      console.log("Ticket generated:", response.data);
      setTicketDetails(response.data); // Set ticket details to state
      setShowModal(true); // Show the modal
      setIsLoading(false); // Stop loading on success
      // You can handle the response here (e.g., show a success message)
    } catch (error) {
      if (error.response.data.errorCode === "PARKING_NOT_AVAILABLE") {
        setError(error.response.data.errorMessage);
      }
      if (error.response.data === 404) {
        setError(error.response.data.errorMessage);
      }
      if (error.response.data.errorCode === "VEHICLE_ALREADY_PARKED") {
        setError(error.response.data.errorMessage);
      }
      console.error("Error generating ticket:", error);
      setIsLoading(false); // Stop loading on error
      // Handle error (e.g., show an error message)
    }
  };

  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    const fetchTwoWheelerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/parking-spot/free/spot/TWO_WHEELER",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set Authorization header with token
            },
          }
        );
        setTwoWheelerData(response.data);
      } catch (error) {
        console.error("Error fetching two wheeler data:", error);
      }
    };

    const fetchFourWheelerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/parking-spot/free/spot/FOUR_WHEELER",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set Authorization header with token
            },
          }
        );
        setFourWheelerData(response.data);
      } catch (error) {
        console.error("Error fetching four wheeler data:", error);
      }
    };

    fetchTwoWheelerData();
    fetchFourWheelerData();
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Header />
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
                <p>Total Spots: {twoWheelerData.totalSpot}</p>
                <p>Free Spots: {twoWheelerData.freeSpot}</p>
                <p>
                  Filled Spots:{" "}
                  {twoWheelerData.totalSpot - twoWheelerData.freeSpot}
                </p>
              </div>

              <div className="card large-card">
                <a href="/">
                  <Ticket className="social-icon" />
                </a>
                <h3>Generate Ticket</h3>
                {error && (
                  <div style={{ color: "red", margin: "10px" }}> {error} </div>
                )}
                <form id="ticket-form" onSubmit={handleSubmit}>
                  <label htmlFor="vehicle-type">Vehicle Type:</label>
                  <select id="vehicle-type" name="vehicle-type">
                    <option value="TWO_WHEELER">2 Wheeler</option>
                    <option value="FOUR_WHEELER">4 Wheeler</option>
                  </select>
                  <label htmlFor="vehicle-number">Vehicle Number:</label>
                  <input
                    type="text"
                    id="vehicle-number"
                    name="vehicle-number"
                    required
                  />
                  <button type="submit" className="cta" disabled={isLoading}>
                    {isLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        style={{ marginRight: "5px" }}
                      />
                    ) : (
                      "Proceed"
                    )}
                  </button>
                </form>
              </div>

              <div className="pricing-card">
                <a href="/">
                  <Fourwheeler className="social-icon" />
                </a>
                <h3>4 Wheeler</h3>
                <p>Total Spots: {fourWheelerData.totalSpot}</p>
                <p>Free Spots: {fourWheelerData.freeSpot}</p>
                <p>
                  Filled Spots:{" "}
                  {fourWheelerData.totalSpot - fourWheelerData.freeSpot}
                </p>
              </div>
            </div>
          </section>
          <section id="ticket-info">
            <h2>Ticket Information</h2>
            <div className="ticket-info-container">
              <div className="card">
                <br />
                <h3>Total Tickets</h3>
                <br />
                <br />
                <button
                  className="cta"
                  onClick={() => navigate("/ticket-info")}
                >
                  View
                </button>{" "}
              </div>
              <div className="card">
                <br />
                <h3>Vehicles Detail</h3>
                <br />
                <br />
                <button
                  className="cta"
                  onClick={() => navigate("/vehicle-info")}
                >
                  View
                </button>{" "}
              </div>
              {/* <div className="card">
                <h3>Total Generated Tickets</h3>
                <p>Total Tickets: 100</p>
                <button className="cta">View</button>
              </div> */}
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

      {/* Modal for displaying ticket details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ticket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ticketDetails && (
            <div>
              <p>Ticket ID: {ticketDetails.parkingTicketId}</p>
              <p>Vehicle Number: {ticketDetails.vehicleNumber}</p>
              <p>
                Entry Time: {new Date(ticketDetails.entryTime).toLocaleString()}
              </p>
              <p>Parking Space ID: {ticketDetails.parkingSpaceId}</p>
              <p>Vehicle Type: {ticketDetails.vehicleType}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{
              backgroundColor: "coral",
              color: "white",
              border: "none",
            }}
            onClick={() => window.print()}
          >
            Print
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}

export default BookTicket;
