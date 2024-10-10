import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const AvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");
  const payload = JSON.parse(atob(token.split(".")[1]));

  const avatarUrl = payload.avatar_url;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {token ? (
        <ClickAwayListener onClickAway={toggleDropdown}>
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img
                src={
                  avatarUrl ??
                  "https://placehold.co/50x50/efefef/4f46e5?text=Invalid+Image&font=roboto"
                }
                alt="User Avatar"
                className="rounded-full w-10 h-10 border border-gray-300 shadow-sm hover:shadow-md transition"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("/previous-orders")}
                  >
                    Previous Orders
                  </li>
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("/edit-profile")}
                  >
                    Edit Profile
                  </li>
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("/logout")}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ClickAwayListener>
      ) : (
        <button className="loginBtn" onClick={() => console.log("ddd")}>
          Login
        </button>
      )}
    </>
  );
};

export default AvatarDropdown;
