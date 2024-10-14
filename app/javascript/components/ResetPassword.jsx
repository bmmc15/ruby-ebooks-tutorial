import React, { useState } from "react";
import { useMutation } from "react-query";
import { ApiClient } from "../services";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: resetPassword, isLoading } = useMutation(
    ApiClient.resetPassword,
    {
      onSuccess: (data) => {
        localStorage.setItem("jwt", data.token);
        navigate("/");
      },
      onError: (error) => {
        console.error("Reset Password failed:", error);
        alert(`Error: ${error.message}`);
      },
    }
  );

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const token = localStorage.getItem("jwt");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    await resetPassword({
      user_id: userId,
      new_password: confirmPassword,
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg relative mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Reset Password
      </h2>

      <form onSubmit={handlePasswordReset} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-3 mt-6 rounded-lg
            shadow-lg hover:from-blue-500 hover:to-blue-300 hover:scale-105 transition-transform 
            transform disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Reset Password"}
        </button>
      </form>

      {isLoading && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full animate-pulse"
            style={{ width: "75%" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
