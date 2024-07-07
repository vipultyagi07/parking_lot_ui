import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios"; // Adjust the path as necessary
import "../Css/Custom.css"; // Adjust the path as necessary

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      email: username,
      password: password,
    };

    try {
      setLoading(true); // Start loading indicator

      const response = await axios.post("/api/users/sign/in", requestData);

      setLoading(false); // Stop loading indicator

      // Handle successful login
      console.log(response.data);
      setSuccess(true);
      localStorage.setItem("token", response.data.jwtToken);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.userName);
      navigate("/Home");
    } catch (error) {
      setLoading(false); // Stop loading indicator on error

      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          setError("Incorrect username or password.");
        } else if (error.response.status === 404) {
          setError("User not found. Please register.");
        } else {
          setError("An unknown error occurred.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
        setError("Error setting up the request.");
      }
    }
  };

  return (
    <div>
      {success ? (
        ""
      ) : (
        <div className="main">
          <h1>Dynamic Vehicle Destination</h1>
          {error && <div style={{ color: "red", margin: "10px" }}>{error}</div>}
          <h3>Enter your login credentials</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </label>

            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={handlePasswordChange}
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
            <Link to="/sendOtp" style={{ textDecoration: "none" }}>
              Forgot Password
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
