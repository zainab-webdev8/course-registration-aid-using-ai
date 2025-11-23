import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaLightbulb,
  FaBookOpen,
  FaFileAlt,
} from "react-icons/fa";

const recommendations = [
  {
    title: "Machine Learning",
    code: "CS410",
    reason: "Based on your interest in Data Science and past grades.",
  },
  {
    title: "Advanced Web Development",
    code: "CS305",
    reason: "You scored well in Front-End Development.",
  },
  {
    title: "Database Systems II",
    code: "CS340",
    reason: "Fulfills core requirement and aligns with your track.",
  },
  {
    title: "Computer Architecture",
    code: "CS220",
    reason: "You showed strong understanding in lower-level systems.",
  },
];

const AIRecommendations = () => {
  const navigate = useNavigate();

  const handleAddToWishlist = (course) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyExists = storedWishlist.find(
      (item) => item.code === course.code
    );

    if (alreadyExists) {
      alert("⚠️ This course is already in your wishlist.");
    } else {
      const updated = [...storedWishlist, course];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      alert("✅ Course added to wishlist!");
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c1135] text-white p-6">
        <h2 className="text-xl font-semibold mb-6">Smart Advisor</h2>
        <nav className="space-y-4 text-sm">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-white/90 hover:text-white"
          >
            <FaTachometerAlt className="text-lg" />
            Dashboard
          </Link>

          <Link
            to="/recommendations"
            className="flex items-center gap-2 bg-white text-black rounded px-2 py-1"
          >
            <FaLightbulb className="text-lg" />
            AI Recommendations
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-2 bg-white text-black rounded px-2 py-1"
          >
            <FaBookOpen className="text-lg" />
            My Courses
          </Link>

          <Link
            to="/registration"
            className="flex items-center gap-2 bg-white text-black rounded px-2 py-1"
          >
            <FaFileAlt className="text-lg" />
            Registration Request
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#d2d4d4] p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0c1135]">Smart Advisor</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm px-4 py-2 rounded bg-[#0c1135] hover:bg-[#1c1f45] text-white"
          >
            Logout
          </button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-[#0c1135]">
                {rec.title}
              </h2>
              <p className="text-sm text-[#333333] mb-1">{rec.code}</p>
              <p className="text-xs bg-[#E6F0FF] text-[#0c1135] px-3 py-1 rounded inline-block mb-3">
                <strong>Why Recommended?</strong> {rec.reason}
              </p>
              <button
                onClick={() => handleAddToWishlist(rec)}
                className="bg-[#114936] hover:bg-[#249d74] text-white px-4 py-2 text-sm rounded"
              >
                ★ Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AIRecommendations;
