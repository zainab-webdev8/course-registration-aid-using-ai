import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [batch, setBatch] = useState("");
  const [program, setProgram] = useState("");
  const [regId, setRegId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    alert("Login successful! (Temporary, backend auth pending)");
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* ✅ Left Side with Centered & Slightly Zoomed-Out Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#0C1135]">
        <img
          src="/left-illustration.png"
          alt="Left illustration"
          className="w-3/4"
        />
      </div>

      {/* Right Side with Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#d2d4d4]">
        <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-[#1E2A78] text-center mb-8">
            Student Login
          </h1>

          {/* Inline row: Batch, Program, Reg ID */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Batch */}
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="bg-[#F0F7FF] border rounded-md p-2 text-sm"
            >
              <option value="">Batch</option>
              {["FA22", "SP23", "FA23", "SP24", "FA24", "FA25", "SP25"].map(
                (b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                )
              )}
            </select>

            {/* Program */}
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="bg-[#F0F7FF] border rounded-md p-2 text-sm"
            >
              <option value="">Program</option>
              {["BCS", "BAI"].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Reg ID */}
            <input
              type="number"
              placeholder="Reg ID"
              value={regId}
              onChange={(e) => setRegId(e.target.value)}
              min="1"
              max="65"
              className="bg-[#F0F7FF] border rounded-md p-2 text-sm"
            />
          </div>

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 bg-[#F0F7FF] border rounded-md p-2 text-sm"
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#114936] hover:bg-[#239f72] text-white p-3 rounded-md text-base transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
