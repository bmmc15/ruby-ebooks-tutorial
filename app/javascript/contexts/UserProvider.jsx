import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setAvatarUrl(payload.avatar_url); // `avatar_url` from token
    }
  }, []);

  return (
    <UserContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </UserContext.Provider>
  );
};
