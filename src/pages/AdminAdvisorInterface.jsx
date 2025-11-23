import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import ViewRequests from "./ViewRequests";
import AdminAIRecommendations from "./AdminAIRecommendations";
import AdminStudentProfiles from "./AdminStudentProfiles";
import AnalyticsReports from "./AnalyticsReports";
import SettingsPage from "./SettingsPage";
import AdminFeedback from "./AdminFeedback";
import AdminCourseCatalogue from "./AdminCourseCatalogue";
import SemesterCourses from "./SemesterCourses";
import ManageCourseStatus from "./ManageCourseStatus";
import AdvisorRoadmapPage from "./AdvisorRoadmapPage";

import { 
  FaTachometerAlt,   // Dashboard
  FaClipboardList,   // Course Requests
  FaLightbulb,       // AI Recommendations
  FaUserGraduate,    // Student Profiles
  FaChartBar,        // Analytics & Reports
  FaBook,            // Course Catalogue
  FaCalendarAlt,     // Timetable
  FaTasks,           // Manage Course Status
  FaMapMarkedAlt,    // Advisor Roadmap
  FaHourglassHalf,   // Pending Requests
  FaCheckCircle,     // Whitelist
  FaBan,             // Blacklist
  FaComments,        // Feedback
  FaCog              // Settings
} from "react-icons/fa";

export default function AdminAdvisorInterface() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  // ✅ Student registration workflow states
  const [studentRequests, setStudentRequests] = useState([
    {
      name: "John Doe",
      id: "2021001",
      course: "Data Structures (CS201)",
      aiRecommended: true,
      status: "Pending",
    },
    {
      name: "Jane Smith",
      id: "2021002",
      course: "Operating Systems (CS301)",
      aiRecommended: false,
      status: "Pending",
    },
  ]);

  const [whitelist, setWhitelist] = useState([]);
  const [blacklist, setBlacklist] = useState([]);

  // ✅ Approve / Reject Functions
  const handleApprove = (student) => {
    setWhitelist([...whitelist, { ...student, status: "Approved" }]);
    setStudentRequests(studentRequests.filter((s) => s.id !== student.id));
  };

  const handleReject = (student) => {
    setBlacklist([...blacklist, { ...student, status: "Rejected" }]);
    setStudentRequests(studentRequests.filter((s) => s.id !== student.id));
  };

  const restoreToWhitelist = (student) => {
    setWhitelist([...whitelist, { ...student, status: "Approved" }]);
    setBlacklist(blacklist.filter((s) => s.id !== student.id));
  };

  return (
    <div className="flex min-h-screen bg-[#d2d4d4] text-[#333333] font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#0c1135] text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Advisor Panel</h2>
        <nav className="space-y-2 text-sm">
          <SidebarButton icon={<FaTachometerAlt />} label="Dashboard" active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")} />
          <SidebarButton icon={<FaClipboardList />} label="Course Requests" active={activePage === "requests"} onClick={() => setActivePage("requests")} />
          <SidebarButton icon={<FaLightbulb />} label="AI Recommendations" active={activePage === "recommendations"} onClick={() => setActivePage("recommendations")} />
          <SidebarButton icon={<FaUserGraduate />} label="Student Profiles" active={activePage === "students"} onClick={() => setActivePage("students")} />
          <SidebarButton icon={<FaChartBar />} label="Analytics & Reports" active={activePage === "analytics"} onClick={() => setActivePage("analytics")} />
          <SidebarButton icon={<FaBook />} label="Course Catalogue" active={activePage === "catalogue"} onClick={() => setActivePage("catalogue")} />
          <SidebarButton icon={<FaCalendarAlt />} label="Timetable" active={activePage === "timetable"} onClick={() => setActivePage("timetable")} />
          <SidebarButton icon={<FaTasks />} label="Manage Course Status" active={activePage === "manageStatus"} onClick={() => setActivePage("manageStatus")} />
          <SidebarButton icon={<FaMapMarkedAlt />} label="Advisor Roadmap" active={activePage === "advisorRoadmap"} onClick={() => setActivePage("advisorRoadmap")} />
          <SidebarButton icon={<FaHourglassHalf />} label="Pending Requests" active={activePage === "pending"} onClick={() => setActivePage("pending")} />
          <SidebarButton icon={<FaCheckCircle />} label="Whitelist" active={activePage === "whitelist"} onClick={() => setActivePage("whitelist")} />
          <SidebarButton icon={<FaBan />} label="Blacklist" active={activePage === "blacklist"} onClick={() => setActivePage("blacklist")} />
          <SidebarButton icon={<FaComments />} label="Feedback" active={activePage === "feedback"} onClick={() => setActivePage("feedback")} />
          <SidebarButton icon={<FaCog />} label="Settings" active={activePage === "settings"} onClick={() => setActivePage("settings")} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <div className="sticky top-0 z-10 flex justify-between items-center bg-white p-4 shadow">
          <h1 className="text-xl font-semibold text-[#1E2A78] capitalize">
            {activePage.replace(/([A-Z])/g, " $1")}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm px-4 py-2 rounded bg-[#0c1135] hover:bg-[#1c1f45] text-white"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activePage === "dashboard" && (
            <Dashboard studentRequests={studentRequests} setActivePage={setActivePage} />
          )}
          {activePage === "requests" && (
            <ViewRequests studentRequests={studentRequests} setStudentRequests={setStudentRequests} />
          )}
          {activePage === "recommendations" && <AdminAIRecommendations />}
          {activePage === "students" && <AdminStudentProfiles />}
          {activePage === "analytics" && <AnalyticsReports />}
          {activePage === "catalogue" && <AdminCourseCatalogue />}
          {activePage === "timetable" && (
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <SemesterCourses key={`CS-${sem}`} degree="CS" semester={sem} mode="admin" />
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <SemesterCourses key={`AI-${sem}`} degree="AI" semester={sem} mode="admin" />
              ))}
            </div>
          )}
          {activePage === "manageStatus" && <ManageCourseStatus />}
          {activePage === "advisorRoadmap" && <AdvisorRoadmapPage />}
          {activePage === "feedback" && <AdminFeedback />}
          {activePage === "settings" && <SettingsPage onLogout={() => navigate("/")} />}

          {/* ✅ Extra Tabs */}
          {activePage === "pending" && (
            <div>
              <h2 className="text-lg font-bold mb-4">⏳ Pending Student Requests</h2>
              {studentRequests.length === 0 ? (
                <p>No pending requests.</p>
              ) : (
                studentRequests.map((s) => (
                  <div key={s.id} className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow">
                    <span>{s.name} ({s.id}) - {s.course}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(s)} className="px-3 py-1 bg-[#114936] hover:bg-[#239f72] text-white rounded-md transition">
                        Approve
                      </button>
                      <button onClick={() => handleReject(s)} className="px-3 py-1 bg-[#bd0812] hover:bg-[#8b0e15] text-white rounded-md transition">
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activePage === "whitelist" && (
            <div>
              <h2 className="text-lg font-bold mb-4">✅ Whitelisted Students</h2>
              {whitelist.length === 0 ? (
                <p>No students approved yet.</p>
              ) : (
                whitelist.map((s) => (
                  <div key={s.id} className="bg-green-100 p-3 rounded mb-2 shadow">
                    {s.name} ({s.id}) - {s.course}
                  </div>
                ))
              )}
            </div>
          )}

          {activePage === "blacklist" && (
            <div>
              <h2 className="text-lg font-bold mb-4">🚫 Blacklisted Students</h2>
              {blacklist.length === 0 ? (
                <p>No students rejected.</p>
              ) : (
                blacklist.map((s) => (
                  <div key={s.id} className="flex justify-between items-center bg-red-100 p-3 rounded mb-2 shadow">
                    <span>{s.name} ({s.id}) - {s.course}</span>
                    <button onClick={() => restoreToWhitelist(s)} className="px-3 py-1 bg-[#1c1f45] text-white rounded">
                      Restore
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ✅ SidebarButton Component (fixed missing definition)
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
