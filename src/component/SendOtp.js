import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SendOtp() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loginSuccessFull, setLoginSuccessFull] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toEmail = username;

    try {
      setLoading(true); // Start loading indicator

      const response = await axios.post(
        `http://localhost:8081/api/users/forgot-password`,
        null,
        {
          params: { toEmail: toEmail },
          headers: { "Content-Type": "application/json" },
        }
      );

      setLoading(false); // Stop loading indicator

      if (response.status === 200) {
        setLoginSuccessFull(true);
        navigate(`/verifyOtp?email=${encodeURIComponent(toEmail)}`); // Pass email as query parameter
      } else {
        setError("An unknown error occurred.");
      }
    } catch (error) {
      setLoading(false); // Stop loading indicator on error

      if (error.response && error.response.status === 404) {
        setError(
          error.response.data.errorMessage || "An unknown error occurred."
        );
      } else {
        console.error("Error during axios operation:", error);
        setError("An error occurred during the axios operation.");
      }
    }
  };

  return (
    <div>
      {loginSuccessFull ? (
        ""
      ) : (
        <div className="main">
          <h1>Dynamic Vehicle Destination</h1>
          {error && <div style={{ color: "red", margin: "10px" }}>{error}</div>}
          <h3>Enter your registered email</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
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
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
          <Link
            to="/registration"
            style={{ textDecoration: "none", marginRight: "10px" }}
          >
            Not registered?
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default SendOtp;
