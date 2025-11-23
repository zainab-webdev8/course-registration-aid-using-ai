import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HODLogin() {
  const navigate = useNavigate();
  const [hodId, setHodId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (hodId === "hod" && password === "1234") {
      navigate("/hod-dashboard"); // ✅ redirect to HOD Dashboard
    } else {
      alert("Invalid HOD credentials!");
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Side Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#0c1135] items-center justify-center">
        <img
          src="/hod-illustration.png"
          alt="HOD Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#d2d4d4]">
        <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-[#1E2A78] text-center mb-8">
            HOD Login
          </h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="HOD ID"
              value={hodId}
              onChange={(e) => setHodId(e.target.value)}
              className="w-full bg-[#F0F7FF] border rounded-md p-2 text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F0F7FF] border rounded-md p-2 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-[#114936] hover:bg-[#239f72] text-white p-3 rounded-md text-base transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
