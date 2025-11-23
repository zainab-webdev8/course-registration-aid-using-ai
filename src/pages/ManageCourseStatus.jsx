// src/pages/ManageCourseStatus.jsx
import React, { useEffect, useState } from "react";
import { getCurrentUser, getStudent, markCourseStatus } from "../utils/studentUtils";

export default function ManageCourseStatus() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const cur = getCurrentUser();
    if (!cur) return;
    const s = getStudent(cur);
    setStudent(s);
  }, []);

  if (!student) return <div className="p-6">⚠️ No student loaded. Please login first.</div>;

  const registered = student.registered || [];
  const history = student.history || [];

  const handleMark = (courseCode, semester, status) => {
    markCourseStatus(student.id, courseCode, semester, status);
    const s = getStudent(student.id);
    setStudent(s);
    alert(`${courseCode} marked ${status}.`);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1E2A78] mb-6">
          Manage Course Status
        </h2>

        {/* Registered Courses */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2">Currently Registered</h3>
          {registered.length === 0 && (
            <p className="text-sm text-gray-500">No courses registered.</p>
          )}
          {registered.map((r, i) => (
            <div
              key={i}
              className="p-3 bg-[#F9FAFB] rounded mb-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{r.course_code}</p>
                <p className="text-sm text-gray-600">
                  {r.teacher} — Sem {r.semester}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMark(r.course_code, r.semester, "passed")}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Pass
                </button>
                <button
                  onClick={() => handleMark(r.course_code, r.semester, "failed")}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Fail
                </button>
                <button
                  onClick={() => handleMark(r.course_code, r.semester, "dropped")}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Drop
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* History */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Course History</h3>
          {history.length === 0 && (
            <p className="text-sm text-gray-500">No history available.</p>
          )}
          {history.map((h, i) => (
            <div key={i} className="p-2 bg-gray-100 rounded mb-2">
              <p className="text-sm">
                {h.course_code} —{" "}
                <span className="font-semibold capitalize">{h.status}</span> — Sem{" "}
                {h.semester}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
