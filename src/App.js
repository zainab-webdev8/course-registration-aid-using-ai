import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AIRecommendations from "./pages/AIRecommendations";
import Wishlist from "./pages/Wishlist";
import AdminLogin from "./pages/AdminLogin"; 
import SettingsPage from "./pages/SettingsPage";
import HODLogin from "./pages/HODLogin";     
import PICLogin from "./pages/PICLogin";     

// ✅ Use AdminAdvisorInterface instead of Dashboard here
import AdminAdvisorInterface from "./pages/AdminAdvisorInterface"; 

import FeedbackPage from "./pages/FeedbackPage";
import CourseRegistrationRequest from "./pages/CourseRegistrationRequest";
import SemesterRegistration from "./pages/SemesterRegistration";
import ManageCourseStatus from "./pages/ManageCourseStatus";
import RoadmapPage from "./pages/RoadmapPage";
import AdvisorRoadmapPage from "./pages/AdvisorRoadmapPage";
import Portal from "./pages/Portal";
import HODDashboard from "./pages/HODDashboard";
import PICDashboard from "./pages/PICDashboard";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default landing page */}
        <Route path="/" element={<Portal />} />

        {/* ---------------- STUDENT ---------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/recommendations" element={<AIRecommendations />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/registration" element={<CourseRegistrationRequest />} />
        <Route path="/semester-registration" element={<SemesterRegistration />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/settings" element={<SettingsPage />} />


        {/* ---------------- ADMIN/ADVISOR ---------------- */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminAdvisorInterface />} /> {/* ✅ FIXED */}
        <Route path="/advisor-roadmap" element={<AdvisorRoadmapPage />} />

        {/* ---------------- FEEDBACK & STATUS ---------------- */}
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/manage-status" element={<ManageCourseStatus />} />

        {/* ---------------- HOD ---------------- */}
        <Route path="/hod-login" element={<HODLogin />} />
        <Route path="/hod-dashboard" element={<HODDashboard />} />

        {/* ---------------- PIC ---------------- */}
        <Route path="/pic-login" element={<PICLogin />} />
        <Route path="/pic-dashboard" element={<PICDashboard />} />
      </Routes>
    </Router>
  );
}
