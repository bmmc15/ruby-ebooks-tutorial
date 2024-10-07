import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Users from "../components/Users";
import Signup from "../components/Signup";
import Login from "../components/Login";
import LandingPage from "../components/LandingPage/LandingPage";
import ItemList from "../components/Items/ItemList";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("jwt");

  console.log("Acessing a restricted area, token:", token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/ebooks" element={<ItemList />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
