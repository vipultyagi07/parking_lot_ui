import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

      const response = await fetch("http://localhost:8081/api/users/sign/in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      setLoading(false); // Stop loading indicator

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.errorCode === "INCORRECT_PASSWORD") {
          setError(errorData.errorMessage);
        } else if (errorData.errorCode === "USER_IS_NOT_PRESENT") {
          setError(errorData.errorMessage);
        } else {
          setError("An unknown error occurred.");
        }
      } else {
        const data = await response.json();
        console.log(data);
        setSuccess(true);
        navigate("/Home");
      }
    } catch (error) {
      setLoading(false); // Stop loading indicator on error

      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      setError("An error occurred during the fetch operation.");
    }
  };

  return (
    <div>
      {success ? (
        ""
      ) : (
        <div className="main">
          <h1>Parking Lot</h1>
          {error && (
            <div style={{ color: "red", margin: "10px" }}> {error} </div>
          )}
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
