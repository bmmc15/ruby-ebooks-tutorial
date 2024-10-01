import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Users from "../components/Users";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Navbar from "../components/Navbar/Navbar"
import LandingPage from "../components/LandingPage/LandingPage"

export default (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </Router>
);
