import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseRegistrationRequest() {
  const navigate = useNavigate();

  const allCourses = [
    { title: "Machine Learning", code: "CS410", credits: 3, schedule: "Fall 2024" },
    { title: "Advanced Web Development", code: "CS305", credits: 4, schedule: "Fall 2024" },
    { title: "Database Systems II", code: "CS340", credits: 3, schedule: "Fall 2024" },
    { title: "Cybersecurity", code: "CS470", credits: 3, schedule: "Spring 2025" },
  ];

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");

  const handleSubmit = () => {
    if (selectedCourses.length === 0) {
      alert("⚠️ Please add at least one course.");
      return;
    }

    alert("✅ Registration request submitted for:\n" + selectedCourses.map((c) => c.code).join(", "));
    setSelectedCourses([]);
  };

  return (
    <div className="flex h-screen bg-[#d2d4d4] text-[#333333]"> {/* ✅ CHANGED ONLY THIS COLOR */}
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c1135] text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">SMART ADVISOR</h2>
        <nav className="space-y-3 text-sm">
          <a href="/dashboard" className="block hover:text-[#28B485]">Dashboard</a>
          <a href="/recommendations" className="block hover:text-[#28B485]">AI Recommendations</a>
         
          <a href="/wishlist" className="block hover:text-[#28B485]">My Courses</a>
          <a href="/registration" className="block text-[#28B485] font-semibold">Registration Request</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Course Registration Request</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#0c1135] text-white px-4 py-2 rounded hover:bg-[#0c113]"
          >
            Logout
          </button>
        </div>

        {/* Course Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-[#333]">Choose a course to add:</label>
          <select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="p-2 border rounded w-1/2"
          >
            <option value="">-- Select Course --</option>
            {allCourses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.title} ({course.code})
              </option>
            ))}
          </select>
          <button
            className="ml-4 bg-[#114936] text-white px-4 py-2 rounded"
            onClick={() => {
              const course = allCourses.find((c) => c.code === selectedCode);
              if (!course) return;
              if (selectedCourses.some((c) => c.code === course.code)) {
                alert("⚠️ Already added!");
              } else {
                setSelectedCourses([...selectedCourses, course]);
              }
              setSelectedCode("");
            }}
          >
            ➕ Add
          </button>
        </div>

        {/* Table of Selected Courses */}
        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="text-[#0c1135] font-bold border-b">
                <th className="py-2">Course</th>
                <th className="py-2">Course Code</th>
                <th className="py-2">Credits</th>
                <th className="py-2">Schedule</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourses.map((course, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3">{course.title}</td>
                  <td className="py-3">{course.code}</td>
                  <td className="py-3">{course.credits}</td>
                  <td className="py-3">{course.schedule}</td>
                  <td className="py-3">
                    <button
                      className="text-red-500 text-sm underline"
                      onClick={() =>
                        setSelectedCourses(selectedCourses.filter((c) => c.code !== course.code))
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit Button */}
          <div className="text-right mt-6">
            <button
              onClick={handleSubmit}
              className="bg-[#114936] hover:bg-[#239f72] text-white px-6 py-2 rounded transition"
            >
              Submit Registration
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
