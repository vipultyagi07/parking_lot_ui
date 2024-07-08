import React from "react";
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/");
  };

  // Fetch username from localStorage
  const username = localStorage.getItem("userName");

  return (
    <div>
      <header>
        <div className="logo">Dynamic Vehicle Destination</div>
        <nav>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <a href="#how-it-works">How it works</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            {username ? <li>Welcome, {username}!</li> : null}
            <li>
              <button className="cta" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
