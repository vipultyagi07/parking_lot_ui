import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";

function VehicleInfo() {
  const [vehicles, setVehicles] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
      if (!token) {
        alert("Unauthorized");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8081/api/vehicle/get/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setVehicles(response.data); // Assuming the API returns an array of vehicles
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, );



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
                    {vehicles
                      .filter((vehicle) =>
                        vehicle.vehicleNo
                          .toLowerCase()
                      )
                      .map((vehicle) => (
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
