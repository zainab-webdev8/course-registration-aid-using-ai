import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SemesterCourses from "./SemesterCourses"; 
import RoadmapPage from "./RoadmapPage";
import { FaTachometerAlt, FaCalendarAlt, FaMapMarkedAlt, FaLightbulb, FaBookOpen, FaFileAlt, FaComments, FaCog } from "react-icons/fa";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  const [student] = useState({
    name: "Student Name",
    cgpa: 3.2,
    registeredCourses: 4,
    degree: "CS",
    semester: 2
  });

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c1135] text-white p-6 space-y-6">
        <h1 className="text-xl font-bold mb-6 text-center">Course Registration Aid Using AI</h1>
        <div className="text-sm mb-4 text-center">{student.name}</div>
        <nav className="space-y-2 text-sm">
          <SidebarButton icon={<FaTachometerAlt />} label="Dashboard" active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")} />
          <SidebarButton icon={<FaCalendarAlt />} label="My Timetable" active={activePage === "timetable"} onClick={() => setActivePage("timetable")} />
          <SidebarButton icon={<FaMapMarkedAlt />} label="Roadmap" active={activePage === "roadmap"} onClick={() => setActivePage("roadmap")} />
          <SidebarButton icon={<FaLightbulb />} label="AI Recommendations" onClick={() => navigate("/recommendations")} />
          <SidebarButton icon={<FaBookOpen />} label="My Courses" onClick={() => navigate("/wishlist")} />
          <SidebarButton icon={<FaFileAlt />} label="Registration Request" onClick={() => navigate("/registration")} />
          <SidebarButton icon={<FaComments />} label="Feedback" onClick={() => navigate("/feedback")} />
          <SidebarButton icon={<FaCog />} label="Settings" onClick={() => navigate("/settings")} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#d2d4d4] p-10 overflow-y-auto">
        {/* Dashboard Page */}
        {activePage === "dashboard" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-[#0c1135]">Welcome, {student.name} 👋</h2>
              <button onClick={() => navigate("/")} className="text-sm px-4 py-2 rounded bg-[#0c1135] hover:bg-[#1c1f45] text-white">Logout</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card title="CGPA" value={student.cgpa} />
              <Card title="Registered Courses" value={student.registeredCourses} />
              <Card title="AI Recommendation" value="Status" />
            </div>

            <h3 className="text-md font-semibold text-[#0c1135] mb-4">Recent Notifications</h3>
            <div className="space-y-3 mb-6">
              <Notification text="📝 New assignment added for Course A" time="2 hours ago" />
              <Notification text="✅ Your registration request has been approved" time="Yesterday" />
              <Notification text="🎉 Welcome! Your account has been created" time="2 days ago" />
            </div>

            <div className="mt-6 mb-8">
              <button onClick={() => navigate("/recommendations")} className="bg-[#114936] hover:bg-[#249d74] text-white px-6 py-2 rounded transition">Get Recommendations</button>
            </div>
          </>
        )}

        {/* Timetable Page */}
        {activePage === "timetable" && (
          <SemesterCourses degree={student.degree} semester={student.semester} mode="student" />
        )}

        {/* Roadmap Page */}
        {activePage === "roadmap" && (
          <RoadmapPage degree={student.degree} semester={student.semester} />
        )}
      </main>
    </div>
  );
}

// Sidebar Button Component
function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-4 py-2 rounded font-semibold transition ${
        active ? "bg-white text-[#0c1135] border-l-4 border-green-500" : "hover:bg-gray-700/30"
      }`}
    >
      {icon && <span className="text-lg">{icon}</span>} <span>{label}</span>
    </button>
  );
}

// Card Component
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition flex flex-col items-center justify-center">
      <div className="text-sm text-[#0c1135]">{title}</div>
      <div className="text-2xl font-bold text-[#0c1135]">{value}</div>
    </div>
  );
}

// Notification Component
function Notification({ text, time }) {
  return (
    <div className="bg-white p-3 rounded shadow-sm text-sm text-[#0c1135] flex justify-between">
      <span>{text}</span>
      <span className="text-xs">{time}</span>
    </div>
  );
}
