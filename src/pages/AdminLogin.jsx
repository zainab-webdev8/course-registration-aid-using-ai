import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy validation (replace with real backend check later)
    if (adminId === "admin" && password === "1234") {
      navigate("/admin-dashboard"); // ✅ updated route
    } else {
      alert("Invalid Admin credentials!");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Illustration */}
      <div className="hidden md:flex w-1/2 bg-[#0c1135] items-center justify-center">
        <img
          src="/admin-illustration.png"
          alt="Admin Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <h2 className="text-3xl font-bold text-[#0c1135] mb-6">
          Admin / Advisor Login
        </h2>
        <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full border p-3 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded"
          />
          <button
            type="submit" // ✅ changed type to submit
            className="w-full bg-[#114936] hover:bg-[#239f72] text-white p-3 rounded-md text-base transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
