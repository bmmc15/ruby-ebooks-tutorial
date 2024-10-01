import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "../components/Users";
import Signup from "../components/Signup";
import Login from "../components/Login";
import LandingPage from "../components/LandingPage/LandingPage";
import Item from "../components/Items/Item";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Item />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
