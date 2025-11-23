import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaLightbulb,
  FaBookOpen,
} from "react-icons/fa";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (code) => {
    const updated = wishlist.filter((item) => item.code !== code);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c1135] text-white p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Smart Advisor</h2>
        <nav className="space-y-2 text-sm">
          <SidebarButton
            icon={<FaTachometerAlt />}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <SidebarButton
            icon={<FaLightbulb />}
            label="AI Recommendations"
            onClick={() => navigate("/recommendations")}
          />
          <SidebarButton
            icon={<FaBookOpen />}
            label="Wishlist"
            active={true}
            onClick={() => navigate("/wishlist")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#d2d4d4] p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0c1135]">My Wishlist</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm px-4 py-2 rounded bg-[#0c1135] hover:bg-[#1c1f45] text-white"
          >
            Logout
          </button>
        </div>

        {wishlist.length === 0 ? (
          <p className="text-[#333] text-sm">
            You haven't added any courses to your wishlist.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((course, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-[#0c1135]">
                  {course.title}
                </h2>
                <p className="text-sm text-[#333]">{course.code}</p>
                <p className="text-xs text-[#0c1135] mt-2 bg-[#E6F0FF] rounded px-2 py-1 inline-block">
                  {course.reason}
                </p>
                <button
                  onClick={() => handleRemove(course.code)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Sidebar Button Component (same style as StudentDashboard)
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
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export default Wishlist;
