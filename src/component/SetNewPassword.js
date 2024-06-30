import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function SetNewPassword() {
  // Step 1: Declare variables for sending data to the post API and also for displaying errors
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showBanner, setShowBanner] = useState(false);

  const navigate = useNavigate(); // For navigation between pages
  const location = useLocation(); // For getting location data

  // Step 2: Handle the input from the UI
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Step 2.1: Get the data from the previous page
  const email = new URLSearchParams(location.search).get("email") || "";

  // Step 3: Handle the submit button
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:8081/api/users/reset-password`,
        {
          email: email,
          newPassword: newPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 202) {
        setSuccess(true);
        setShowBanner(true);
        setTimeout(() => {
          setShowBanner(false);
          navigate("/");
        }, 2000); // Hide banner after 2 seconds and navigate to login page
      } else {
        setError("An unknown error occurred.");
      }
    } catch (error) {
      setError("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1>Parking Lot</h1>
      {error && <div style={{ color: "red", margin: "10px" }}> {error} </div>}
      {showBanner && (
        <div style={{ color: "green", margin: "10px" }}>
          Password is changed successfully. Redirecting you to the login page...
        </div>
      )}
      <h3>Enter new Password</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">
          New Password:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            type="text" // Changed to password type
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </label>

        <div className="wrap">
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      <p>
        <Link
          to="/registration"
          style={{ textDecoration: "none", marginRight: "10px" }}
        >
          Not registered?
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default SetNewPassword;
