import React from "react";

// import Login from "./component/Footer";
import Registration from "./component/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import SendOtp from "./component/SendOtp";
import VerifyOtp from "./component/VerifyOtp";
import SetNewPassword from "./component/SetNewPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login/>}/> */}
        <Route path="/" element={<Login />} />
        <Route path="/sendOtp" element={<SendOtp />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/setNewPassword" element={<SetNewPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
