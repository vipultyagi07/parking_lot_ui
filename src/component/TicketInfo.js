import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import { ReactComponent as Motorcycle } from "./twowheeler.svg";
import { ReactComponent as Fourwheeler } from "./fourwheeler.svg";
import { Link, useNavigate } from "react-router-dom";

function TicketInfo() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingTickets, setLoadingTickets] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedTicketDetails, setSelectedTicketDetails] = useState(null);
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
      if (!token) {
        alert("Unauthorized");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8081/api/parking-tickets/all/info?page=${currentPage}&size=${pageSize}&sort=entryTime,${sortOrder}&vehicleNumber=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { content, totalPages } = response.data;
        setTickets(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, sortOrder, searchTerm]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  // handle checkout api
  const handleCheckout = async (event, vehicleNumber) => {
    event.preventDefault(); // Prevent the default button action

    const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
    if (!token) {
      alert("Unauthorized");
      return;
    }

    setLoadingTickets((prev) => ({ ...prev, [vehicleNumber]: true })); // Start loading indicator for the respective ticket

    try {
      const response = await axios.post(
        `http://localhost:8081/api/exit/payment?vehicleNumber=${vehicleNumber}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Checkout successful");
        // Refresh the tickets
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8081/api/parking-tickets/all/info?page=${currentPage}&size=${pageSize}&sort=entryTime,${sortOrder}&vehicleNumber=${searchTerm}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const { content, totalPages } = response.data;
            setTickets(content);
            setTotalPages(totalPages);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      } else {
        alert("Checkout failed");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed");
    } finally {
      setLoadingTickets((prev) => ({ ...prev, [vehicleNumber]: false })); // Stop loading indicator for the respective ticket
    }
  };

  // handle view details api
  const handleViewDetails = async (ticketId) => {
    const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8081/api/parking-tickets/view-details/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSelectedTicketDetails(response.data);
        setShowModal(true);
      } else {
        alert("Failed to fetch ticket details");
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      alert("Failed to fetch ticket details");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 mb-3 mb-lg-5">
            <div className="custom-card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0"></h5>
              </div>
              <div className="search-sort-bar">
                <input
                  type="text"
                  id="search-bar"
                  placeholder="Search by vehicle number"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div>
                <button
                  className="btn btn-light btn-sm me-2"
                  onClick={handleSortOrderChange}
                  style={{
                    backgroundColor: "coral",
                    color: "white",
                    border: "none",
                    width: "220px", // Example width
                    height: "auto", // Example height
                    padding: "5px 10px", // Example padding
                    borderRadius: "5px", // Example border radius
                    fontSize: "14px",
                    marginLeft: "10px" // Example font size
                  }}
                >
                  Sort by Entry Time:{" "}
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </button>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="small text-uppercase bg-body text-muted">
                    <tr>
                      <th>Ticket ID</th>
                      <th>Entry Time</th>
                      <th>Exit Time / Status</th>
                      <th>Vehicle Number</th>
                      <th>Vehicle Type</th>
                      <th>Parking Spot ID</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody id="ticket-list">
                    {tickets.map((ticket) => (
                      <tr className="align-middle" key={ticket.ticketId}>
                        <td>{ticket.ticketId}</td>
                        <td>{new Date(ticket.entryTime).toLocaleString()}</td>
                        <td>
                          {ticket.exitTime ? (
                            new Date(ticket.entryTime).toLocaleString()
                          ) : (
                            <span style={{ color: "green" }}>PARKED</span>
                          )}
                        </td>
                        <td>{ticket.vehicleNo}</td>
                        <td>{ticket.vehicleType}</td>
                        <td>{ticket.parkingSpotId}</td>
                        <td className="text-end">
                          {ticket.exitTime ? (
                            <button
                              className="btn btn-sm me-2"
                              style={{
                                backgroundColor: "teal",
                                color: "white",
                                border: "none",
                              }}
                              onClick={() => handleViewDetails(ticket.ticketId)}
                            >
                              View Details
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm me-2"
                              style={{
                                backgroundColor: "coral",
                                color: "white",
                                border: "none",
                              }}
                              onClick={(event) =>
                                handleCheckout(event, ticket.vehicleNo)
                              }
                              disabled={loadingTickets[ticket.vehicleNo]} // Disable the button when loading
                            >
                              {loadingTickets[ticket.vehicleNo] ? (
                                <span>Loading...</span>
                              ) : (
                                "Checkout"
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button
                  id="prev-page"
                  className="btn btn-light btn-sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  style={{
                    backgroundColor: "coral",
                    color: "white"
                  }}

                >
                  Previous
                </button>
                <span id="page-info">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  id="next-page"
                  className="btn btn-light btn-sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  style={{
                    backgroundColor: "coral",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ticket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTicketDetails && (
            <div>
              <p>Parking Ticket Id: {selectedTicketDetails.id}</p>
              <p>Vehicle Number: {selectedTicketDetails.vehicleNumber}</p>
              <p>Vehicle Type: {selectedTicketDetails.vehicletype}</p>
              <p>
                Entry Time:{" "}
                {new Date(selectedTicketDetails.entryTime).toLocaleString()}
              </p>
              <p>
                Exit Time:{" "}
                {new Date(selectedTicketDetails.exitTime).toLocaleString()}
              </p>
              <p>Duration: {selectedTicketDetails.duration} hours</p>
              <p>Rate: {selectedTicketDetails.rate}</p>
              <p>Amount To Be Paid: ${selectedTicketDetails.amountToBePaid}</p>
              <p>
                Payment Received:{" "}
                {selectedTicketDetails.paymentReceived ? "Yes" : "No"}
              </p>
              <p>
                Payment Received Date:{" "}
                {selectedTicketDetails.paymentReceivedDate
                  ? new Date(
                      selectedTicketDetails.paymentReceivedDate
                    ).toLocaleString()
                  : "N/A"}
              </p>
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
    </div>
  );
}

export default TicketInfo;
