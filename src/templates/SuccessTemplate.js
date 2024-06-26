import React from 'react';
// import "../css/Custom.css"; // Adjust the path as necessary


const SuccessTemplate = ({ name, redirectToLogin }) => (
  <div className="main">
    <h1>Registration Successful</h1>
    <p>
      Thank you for registering, <span id="username">{name}</span>!
    </p>
    <p>You have successfully created your account.</p>
    <div className="wrap">
      <button onClick={redirectToLogin}>Go to Login</button>
    </div>
  </div>
);

export default SuccessTemplate;
