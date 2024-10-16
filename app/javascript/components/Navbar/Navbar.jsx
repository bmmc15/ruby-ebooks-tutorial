import React, { useEffect, useState } from "react";
import { useGetNavigate } from "../../hooks/useGetNavigate";
import AvatarDropdown from "./AvatarDropdown";

const Navbar = () => {
  const { navigateTo } = useGetNavigate();
  const isLoggedIn = !!localStorage.getItem("jwt");

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-6">
        <button
          onClick={navigateTo("/")}
          className="text-xl font-bold text-indigo-500"
        >
          ebooks.buy
        </button>
        <nav className="space-x-6">
          <button
            onClick={navigateTo("/ebooks")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Ebooks
          </button>
          <button
            onClick={navigateTo("/order-summary")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Order Summary
          </button>
          <button
            onClick={navigateTo("/")}
            className="text-gray-700 hover:text-indigo-600"
          >
            About
          </button>
        </nav>
        <div className="space-x-4">
          {isLoggedIn ? (
            <AvatarDropdown />
          ) : (
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              onClick={navigateTo("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
