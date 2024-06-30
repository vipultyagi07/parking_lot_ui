import React from 'react';
import "../Css/Custom.css"; // Adjust the path as necessary

const RegistrationForm = ({
  name,
  address,
  mobileNo,
  email,
  gender,
  password,
  error,
  handleNameChange,
  handleAddressChange,
  handleMobileNoChange,
  handleEmailChange,
  handleGenderChange,
  handlePasswordChange,
  handleRegisterSubmit,
}) => (
  <div className="main1">
    <h1>Parking Lot Registration</h1>
    {error && <div style={{color:'red', margin: '10px'}}> {error} </div>}
    <h3>Enter your registration details</h3>
    <form onSubmit={handleRegisterSubmit}>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>

      <label htmlFor="address">
        Address:
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter your Address"
          value={address}
          onChange={handleAddressChange}
          required
        />
      </label>

      <label htmlFor="mobileNo">
        Mobile Number:
        <input
          type="text"
          id="mobileNo"
          name="mobileNo"
          placeholder="Enter your Mobile Number"
          value={mobileNo}
          onChange={handleMobileNoChange}
          required
        />
      </label>

      <label htmlFor="email">
        Email:
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>

      <label htmlFor="gender">
        Gender:
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={handleGenderChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
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
        <button type="submit">Register</button>
      </div>
    </form>
    <p>
      <a href="/" style={{ textDecoration: "none" }}>
        Login
      </a>
    </p>
  </div>
);

export default RegistrationForm;
