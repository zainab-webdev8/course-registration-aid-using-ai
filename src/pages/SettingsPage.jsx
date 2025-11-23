import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaLightbulb,
  FaBookOpen,
  FaFileAlt,
  FaComments,
  FaCog,
} from "react-icons/fa";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activePage] = useState("settings");

  const [student] = useState({
    name: "Student Name",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [resetEmail, setResetEmail] = useState("");

  const handlePasswordChange = () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("⚠️ Please fill all fields.");
      return;
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      alert("❌ New password cannot be the same as current password.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("❌ New password and confirm password do not match.");
      return;
    }
    alert("✅ Password updated successfully.");
  };

  const handleResetStudentPassword = () => {
    if (!resetEmail.includes("@")) {
      alert("⚠️ Please enter a valid student email.");
      return;
    }
    alert(`📧 Reset password link sent to ${resetEmail}`);
    setResetEmail("");
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c1135] text-white p-6 space-y-6">
        <h1 className="text-xl font-bold mb-6 text-center">
          Course Registration Aid Using AI
        </h1>
        <div className="text-sm mb-4 text-center">{student.name}</div>
        <nav className="space-y-2 text-sm">
          <SidebarButton
            icon={<FaTachometerAlt />}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <SidebarButton
            icon={<FaCalendarAlt />}
            label="My Timetable"
            onClick={() => navigate("/dashboard")}
          />
          <SidebarButton
            icon={<FaMapMarkedAlt />}
            label="Roadmap"
            onClick={() => navigate("/roadmap")}
          />
          <SidebarButton
            icon={<FaLightbulb />}
            label="AI Recommendations"
            onClick={() => navigate("/recommendations")}
          />
          <SidebarButton
            icon={<FaBookOpen />}
            label="My Courses"
            onClick={() => navigate("/wishlist")}
          />
          <SidebarButton
            icon={<FaFileAlt />}
            label="Registration Request"
            onClick={() => navigate("/registration")}
          />
          <SidebarButton
            icon={<FaComments />}
            label="Feedback"
            onClick={() => navigate("/feedback")}
          />
          <SidebarButton
            icon={<FaCog />}
            label="Settings"
            active={activePage === "settings"}
            onClick={() => navigate("/settings")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#d2d4d4] p-10 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#1E2A78] mb-6">
          Settings & Profile Management
        </h2>

        {/* Change Password Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Change Your Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            className="w-full border p-2 rounded mb-3"
          />
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 rounded bg-[#114936] hover:bg-[#239f72] text-white"
          >
            Update Password
          </button>
        </div>

        {/* Reset Student Password Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Reset Student Password</h3>
          <input
            type="email"
            placeholder="Enter Student Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />
          <button
            onClick={handleResetStudentPassword}
            className="px-4 py-2 rounded bg-[#0c1135] text-white"
          >
            Send Reset Link
          </button>
        </div>
      </main>
    </div>
  );
}

// Sidebar Button Component (same as in StudentDashboard)
function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-4 py-2 rounded font-semibold transition ${
        active
          ? "bg-white text-[#0c1135] border-l-4 border-green-500"
          : "hover:bg-gray-700/30"
      }`}
    >
      {icon && <span className="text-lg">{icon}</span>} <span>{label}</span>
    </button>
  );
}
