import React from 'react';

// import Login from "./component/Footer";
import Registration from "./component/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/Home'
import Login from './component/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
