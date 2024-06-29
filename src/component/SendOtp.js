import React, { useState } from "react";
import "../Css/Custom.css"; // Adjust the path as necessary
import { Link } from "react-router-dom";
import axios from "axios";

function SendOtp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loginSuccessFull, setLoginSuccessFull] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const toEmail = username; // Assuming 'username' holds the email address
  
    try {
      const response = await fetch(`http://localhost:8081/api/users/forgot-password?toEmail=${encodeURIComponent(toEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "", // This matches the empty data body in your curl request
      });
  
      if (!response.ok) {
        const errorData = await response.json();
  
        if (errorData.errorCode === "USER_IS_NOT_PRESENT") {
          setError(errorData.errorMessage);
        } else {
          setError("An unknown error occurred.");
        }
      } else {
        const data = await response.text(); // The response is a plain text message
        console.log(data);
        setLoginSuccessFull(true); // Or handle success state appropriately
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      setError("An error occurred during the fetch operation.");
    }
  };
  

  return (
    <div>
      {loginSuccessFull ? (
        ""
      ) : (
        <div className="main">
          <h1>Parking Lot</h1>
          {error && (
            <div style={{ color: "red", margin: "10px" }}> {error} </div>
          )}
          <h3>Enter your registered email</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              {/* Username: */}
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your email"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </label>

            <div className="wrap">
              <button type="submit">Submit</button>
            </div>
          </form>
          <p>
            {" "}
            <Link to="/registration" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default SendOtp;
