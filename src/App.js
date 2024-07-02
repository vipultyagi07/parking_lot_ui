import React from "react";
import Registration from "./component/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookTicket from "./component/BookTicket";
import Home from "./component/Home";

import Login from "./component/Login";
import SendOtp from "./component/SendOtp";
import VerifyOtp from "./component/VerifyOtp";
import SetNewPassword from "./component/SetNewPassword";
import LiveTicket from "./component/LiveTicket";
import ItemDetail from "./component/ItemDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LiveTicket/>}/> */}
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/BookTicket" element={<BookTicket />} />
        <Route path="/products/:id" element={<ItemDetail />} />
        <Route path="/sendOtp" element={<SendOtp />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/setNewPassword" element={<SetNewPassword />} />
        <Route path="/LiveTicket" element={<LiveTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
