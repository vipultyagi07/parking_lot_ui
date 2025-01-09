import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";

function VehicleInfo() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      return;
    }

    const socket = new WebSocket(`ws://localhost:8081/vehicle-updates?token=${token}`);

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setVehicles(data); // Replace the entire list of vehicles
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close(); // Clean up WebSocket connection on component unmount
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 mb-3 mb-lg-5">
            <div className="custom-card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Vehicle Information</h5>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="small text-uppercase bg-body text-muted">
                    <tr>
                      <th>Vehicle Id</th>
                      <th>Vehicle Number</th>
                      <th>Vehicle Type</th>
                    </tr>
                  </thead>
                  <tbody id="ticket-list">
                    {vehicles.map((vehicle) => (
                      <tr className="align-middle" key={vehicle.id}>
                        <td>{vehicle.id}</td>
                        <td>{vehicle.vehicleNo}</td>
                        <td>{vehicle.vehicleType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VehicleInfo;
