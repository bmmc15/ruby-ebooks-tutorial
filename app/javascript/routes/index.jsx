import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ItemList from "../components/Items/ItemList";
import LandingPage from "../components/LandingPage/LandingPage";
import Login from "../components/Login";
import OrdersSummary from "../components/Users/OrdersSummary";
import EditProfile from "../components/Users/EditProfile";
import Signup from "../components/Signup";
import Users from "../components/Users";
import ResetPassword from "../components/ResetPassword";

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
          <Route path="/order-summary" element={<OrdersSummary />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
