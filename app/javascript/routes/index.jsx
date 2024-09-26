import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Users from "../components/Users";
import Signup from "../components/Signup";
import Login from "../components/Login";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </Router>
);
