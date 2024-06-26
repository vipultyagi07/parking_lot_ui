import React from 'react'
import './Footer.css'

function Header() {
  return (
    <div>
      <header>
        <div className="logo">ParkingLotName</div>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#login" class="cta">Login</a></li>
            </ul>
        </nav>
    </header>
    </div>
  )
}

export default Header
