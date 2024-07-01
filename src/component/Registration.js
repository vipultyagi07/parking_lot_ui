import React, { useState } from "react";
import SuccessTemplate from "../templates/SuccessTemplate";
import RegistrationFormTemplate from "../templates/RegistrationFormTemplate";

function Registration() {
  const [name, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registerSuccessFully, setRegisterSuccessFully] = useState(false);

  const handleNameChange = (event) => setUsername(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleMobileNoChange = (event) => setMobileNo(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      name,
      address,
      mobileNo,
      email,
      gender,
      password,
    };

    try {
      const response = await fetch("http://localhost:8081/api/users/sign/up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errorCode === "USER_IS_ALREADY_PRESENT") {
          setError(errorData.errorMessage);
        } else {
          setError("An unknown error occurred.");
        }
      } else {
        const data = await response.json();
        console.log(data);
        setRegisterSuccessFully(true);
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again later.");
      console.error("Registration error:", error);
    }
  };

  const redirectToLogin = () => {
    window.location.href = "/";
  };

  return (
    <div>
      {registerSuccessFully ? (
        <SuccessTemplate name={name} redirectToLogin={redirectToLogin} />
      ) : (
        <RegistrationFormTemplate
          name={name}
          address={address}
          mobileNo={mobileNo}
          email={email}
          gender={gender}
          password={password}
          error={error}
          handleNameChange={handleNameChange}
          handleAddressChange={handleAddressChange}
          handleMobileNoChange={handleMobileNoChange}
          handleEmailChange={handleEmailChange}
          handleGenderChange={handleGenderChange}
          handlePasswordChange={handlePasswordChange}
          handleRegisterSubmit={handleRegisterSubmit}
        />
      )}
    </div>
  );
}

export default Registration;
