import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


// import Login from "./component/Footer";
import Registration from "./component/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookTicket from "./component/BookTicket";
import Home from "./component/Home";

import Login from "./component/Login";
import SendOtp from "./component/SendOtp";
import VerifyOtp from "./component/VerifyOtp";
import SetNewPassword from "./component/SetNewPassword";
import TicketInfo from "./component/TicketInfo";
import VehicleInfo from "./component/VehicleInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login/>}/> */}
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/BookTicket" element={<BookTicket />} />
        <Route path="/sendOtp" element={<SendOtp />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/registration" element={<Registration />} /> 
        <Route path="/ticket-info" element={<TicketInfo />} />
        <Route path="/vehicle-info" element={<VehicleInfo />} />  
        <Route path="/setNewPassword" element={<SetNewPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
