// src/pages/PICDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaBookOpen, FaUserTie, FaComments, FaChartPie, FaCog } from "react-icons/fa";

// Dummy data
const dummyStudents = [
  { id: "CS101", name: "John Doe", semester: 3, courses: ["CS201", "CS301"] },
  { id: "AI202", name: "Jane Smith", semester: 2, courses: ["AI201", "AI302"] },
];

const dummyAdvisors = [
  { id: "A001", name: "Dr. Alice", approvals: 15, rejections: 2 },
  { id: "A002", name: "Dr. Bob", approvals: 12, rejections: 3 },
];

const dummyFeedback = [
  { student: "John Doe", message: "Course scheduling is great!" },
  { student: "Jane Smith", message: "Need more electives in AI." },
];

const dummyAnnouncements = [
  "Semester registration opens on July 1.",
  "New AI elective course added for semester 4.",
];

export default function PICDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c1135] text-white p-6 space-y-6 h-screen sticky top-0">
        <h2 className="text-2xl font-bold mb-6 text-center">PIC Panel</h2>
        <nav className="space-y-2 text-sm">
          <SidebarButton
            icon={<FaChartPie />}
            label="Dashboard"
            active={activePage === "dashboard"}
            onClick={() => setActivePage("dashboard")}
          />
          <SidebarButton
            icon={<FaUserGraduate />}
            label="Student Program Management"
            active={activePage === "students"}
            onClick={() => setActivePage("students")}
          />
          <SidebarButton
            icon={<FaBookOpen />}
            label="Course & Semester Planning"
            active={activePage === "courses"}
            onClick={() => setActivePage("courses")}
          />
          <SidebarButton
            icon={<FaUserTie />}
            label="Advisor Oversight"
            active={activePage === "advisors"}
            onClick={() => setActivePage("advisors")}
          />
          <SidebarButton
            icon={<FaChartPie />}
            label="Program Analytics"
            active={activePage === "analytics"}
            onClick={() => setActivePage("analytics")}
          />
          <SidebarButton
            icon={<FaComments />}
            label="Communication & Announcements"
            active={activePage === "feedback"}
            onClick={() => setActivePage("feedback")}
          />
          <SidebarButton
            icon={<FaCog />}
            label="Settings"
            active={activePage === "settings"}
            onClick={() => setActivePage("settings")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#d2d4d4] overflow-y-auto">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0c1135]">
            {activePage === "dashboard"
              ? "Program In-Charge Dashboard"
              : activePage === "students"
              ? "Student Program Management"
              : activePage === "courses"
              ? "Course & Semester Planning"
              : activePage === "advisors"
              ? "Advisor Oversight"
              : activePage === "analytics"
              ? "Program Analytics"
              : activePage === "feedback"
              ? "Communication & Announcements"
              : "Settings"}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm px-4 py-2 rounded bg-[#0c1135] hover:bg-[#1c1f45] text-white transition"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="space-y-6">
          {/* Dashboard */}
          {activePage === "dashboard" && (
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Total Students" value={dummyStudents.length} />
              <Card title="Total Advisors" value={dummyAdvisors.length} />
              <Card title="Pending Feedbacks" value={dummyFeedback.length} />
            </div>
          )}

          {/* Student Program Management */}
          {activePage === "students" && (
            <div className="grid md:grid-cols-2 gap-6">
              {dummyStudents.map((s) => (
                <div key={s.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
                  <h3 className="font-bold text-lg">
                    {s.name} ({s.id})
                  </h3>
                  <p className="mt-2 text-[#0c1135]">Semester: {s.semester}</p>
                  <p className="mt-1 text-[#0c1135]">Courses: {s.courses.join(", ")}</p>
                </div>
              ))}
            </div>
          )}

          {/* Course & Semester Planning */}
          {activePage === "courses" && (
            <div className="space-y-4">
              {dummyStudents.map((s) => (
                <div
                  key={s.id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:shadow-2xl transition"
                >
                  <span>
                    {s.name} - Courses: {s.courses.join(", ")}
                  </span>
                  <button className="px-3 py-1 bg-[#114936] hover:bg-[#239f72] text-white rounded-md transition">
                    Update Courses
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Advisor Oversight */}
          {activePage === "advisors" && (
            <div className="space-y-4">
              {dummyAdvisors.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:shadow-2xl transition"
                >
                  <span>
                    {a.name} - Approvals: {a.approvals}, Rejections: {a.rejections}
                  </span>
                  <button className="px-3 py-1 bg-[#114936] hover:bg-[#239f72] text-white rounded-md transition">
                    View Report
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Program Analytics */}
          {activePage === "analytics" && (
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Total Students" value={dummyStudents.length} />
              <Card title="Total Advisors" value={dummyAdvisors.length} />
              <Card title="Pending Feedbacks" value={dummyFeedback.length} />
            </div>
          )}

          {/* Communication & Announcements */}
          {activePage === "feedback" && (
            <div className="space-y-4">
              {dummyFeedback.map((f, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-2xl transition text-[#0c1135]">
                  <strong>{f.student}:</strong> {f.message}
                </div>
              ))}
              {dummyAnnouncements.map((a, idx) => (
                <div key={idx} className="bg-green-50 p-3 rounded-lg text-black font-medium">
                  Announcement: {a}
                </div>
              ))}
              <button className="px-3 py-1 bg-[#114936] hover:bg-[#239f72] text-white rounded-md transition mt-4">
                Send Announcement
              </button>
            </div>
          )}

          {/* Settings */}
          {activePage === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-3 text-[#0c1135]">Settings</h2>
              <button className="px-3 py-1 bg-[#114936] hover:bg-[#239f72] text-white rounded-md transition mt-4">
                Change Password / Profile
              </button>
            </div>
          )}
        </div>
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
      {icon} <span>{label}</span>
    </button>
  );
}

// Card Component
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center hover:shadow-2xl transition">
      <h3 className="text-lg font-semibold text-[#0c1135]">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-[#0c1135]">{value}</p>
    </div>
  );
}
