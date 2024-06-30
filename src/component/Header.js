import React from 'react'
import './Footer.css'
import { Link, useNavigate } from "react-router-dom";


function Header() {
  return (
    <div>
      <header>
        <div className="logo">ParkingLotName</div>
        <nav>
            <ul>
                <li><Link to="/Home">Home</Link></li>
                <li><a href="#how-it-works">How it work!</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><Link to="/" class="cta">Logout</Link></li>
            </ul>
        </nav>
    </header>
    </div>
  )
}

export default Header
