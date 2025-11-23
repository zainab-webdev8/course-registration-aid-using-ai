import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const pending = JSON.parse(localStorage.getItem("pendingRequests")) || [];
    pending.push({ email, password, status: "Pending" });
    localStorage.setItem("pendingRequests", JSON.stringify(pending));

    alert("Registration submitted! You will be notified within 24 hours.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#d2d4d4]">
      <div className="w-1/2">
        <img
          src="/login-illustration.png"
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 bg-[#F5F7FA] flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-[#1E2A78]">
            Student Registration
          </h2>

          <input
            type="email"
            placeholder="University Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 ring-[#1E2A78]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 ring-[#1E2A78]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#28B485] text-white p-2 rounded hover:bg-[#23976F] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
