import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Example data – later load dynamically from backend
const offeredCourses = [
  {
    title: "Data Structures",
    code: "CS201",
    credits: 3,
    instructor: "Dr. Ahmed Khan",
    description: "Study of data structures such as lists, stacks, queues, trees, and graphs.",
    semester: 3,
  },
  {
    title: "Operating Systems",
    code: "CS450",
    credits: 3,
    instructor: "Prof. Sara Malik",
    description: "Covers processes, memory management, file systems, and concurrency.",
    semester: 5,
  },
];

export default function SemesterRegistration() {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleCourse = (course) => {
    if (selectedCourses.find((c) => c.code === course.code)) {
      setSelectedCourses(selectedCourses.filter((c) => c.code !== course.code));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c1135] text-white p-6 space-y-4">
        <h1 className="text-xl font-bold">Student Panel</h1>
        <nav className="space-y-2 text-sm">
          <Link to="/dashboard" className="block">Dashboard</Link>
          <Link to="/recommendations" className="block">AI Recommendations</Link>
          <Link to="/registration" className="block font-semibold text-[#E6F0FF]">Registration</Link>
          <Link to="/wishlist" className="block">My Courses</Link>
          <Link to="/feedback" className="block">Feedback</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#d2d4d4] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0c1135]">Semester Registration</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-[#0c1135] text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offeredCourses.map((course, index) => (
            <div
              key={index}
              className={`shadow rounded-xl p-4 ${
                selectedCourses.find((c) => c.code === course.code)
                  ? "bg-green-100"
                  : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold text-[#333333] mb-1">{course.title}</h3>
              <div className="flex gap-2 text-sm text-gray-600 mb-2">
                <span className="bg-[#E6F0FF] px-2 py-1 rounded">{course.code}</span>
                <span className="bg-[#E6F0FF] px-2 py-1 rounded">{course.credits} Credits</span>
                <span className="bg-[#E6F0FF] px-2 py-1 rounded">Instructor: {course.instructor}</span>
              </div>
              <p className="text-sm text-[#333333] mb-4">{course.description}</p>
              <button
                onClick={() => toggleCourse(course)}
                className={`px-4 py-2 rounded ${
                  selectedCourses.find((c) => c.code === course.code)
                    ? "bg-red-500 text-white"
                    : "bg-[#114936] text-white hover:bg-[#23996e]"
                }`}
              >
                {selectedCourses.find((c) => c.code === course.code) ? "Drop" : "Register"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
