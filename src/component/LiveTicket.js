import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Css/Custom.css"; // Assuming your CSS is in this file
import Header from './Header';
import Footer from './Footer';

const LiveTicket = () => {
  const [parkingDetails, setParkingDetails] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('https://api.example.com/parking-details')
      .then(response => {
        setParkingDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
    <Header/>
    <div id='live-main'>
      <h2 id='live-main1'>Parking Details</h2>
      <div className="table-container">
        <table className="parking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {parkingDetails.map((detail) => (
              <tr key={detail.id}>
                <td>{detail.id}</td>
                <td>{detail.name}</td>
                <td>{detail.mobileNumber}</td>
                <td>{detail.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LiveTicket;
