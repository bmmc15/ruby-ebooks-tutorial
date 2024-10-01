import React, { useState } from "react";
import { useGetNavigate } from "../../hooks/useGetNavigate";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { navigateTo } = useGetNavigate();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-6">
        <button
          onClick={navigateTo("/")}
          className="text-xl font-bold text-lime-500"
        >
          ebooks.buy
        </button>
        <nav className="space-x-6">
          <button
            onClick={navigateTo("/")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Ebooks
          </button>
          <button
            onClick={navigateTo("/")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Sellers
          </button>
          <button
            onClick={navigateTo("/")}
            className="text-gray-700 hover:text-indigo-600"
          >
            About
          </button>
        </nav>
        <div className="space-x-4">
          <button
            onClick={navigateTo("/")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Login
          </button>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            onClick={handleOpen}
          >
            Settings
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
