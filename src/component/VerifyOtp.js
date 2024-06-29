import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loginSuccessFull, setLoginSuccessFull] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email from query parameter
  const email = new URLSearchParams(location.search).get("email") || "";

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8081/api/users/verify-otp`,
        {
          email: email,
          otp: otp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setLoginSuccessFull(true); // Or handle success state appropriately
        // navigate("/verify-otp"); // Redirect to /verify-otp on success
      } else {
        setError("An unknown error occurred.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(
          error.response.data.errorMessage || "Invalid OTP. Please try again."
        );
      } else {
        console.error(
          "There has been a problem with your axios operation:",
          error
        );
        setError("An error occurred during the axios operation.");
      }
    }
  };

  return (
    <div className="main">
      <div className="otp-container">
        <h1>Parking Lot</h1>
        {error && <div className="error-message">{error}</div>}
        <h3>Enter OTP</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="otp">
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter your 4-digit OTP"
              value={otp}
              onChange={handleOtpChange}
              maxLength="4"
              required
            />
          </label>
          <div className="wrap">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
